/*
   Copyright 2025 Docker Hub MCP Server authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { createClient, GenqlError, Client, FieldsSelection } from './genql';
import type { Mutation, MutationGenqlSelection, Query, QueryGenqlSelection } from './genql/schema';

/**
 * @see https://spec.graphql.org/October2021/#example-8b658
 */
interface GraphqlError {
    message: string;
    path?: string[];
    locations?: Array<{ line: number; column: number }>;
    extensions?: KnownErrorExtensions & Record<string, unknown>;
}

/**
 * @see https://spec.graphql.org/October2021/#sec-Errors
 *
 * According to the GraphQL specification, when a request errors out the server
 * can send, along with the error, some additional information in the `extensions` field.
 * This is a completely arbitrary object, and its structure is completely up to each
 * individual GraphQL implementation.
 *
 * For Scout these are the currently known extensions properties:
 * - `code`: An enum of possible error codes e.g. "DOWNSTREAM_SERVICE_ERROR".
 * - `status`: The HTTP status code of the error.
 * - `arguments`: The arguments passed to the query / mutation.
 */
interface KnownErrorExtensions {
    code?: string;
    status?: number;
    arguments?: Record<string, unknown>;
}

type GraphQLSuccessfulResponse<
    OperationType extends Query | Mutation,
    OperationSelection extends QueryGenqlSelection | MutationGenqlSelection,
> = {
    data: FieldsSelection<OperationType, OperationSelection>;
    errors: null;
};

type GraphQLErrorResponse<
    OperationType extends Query | Mutation,
    OperationSelection extends QueryGenqlSelection | MutationGenqlSelection,
> = {
    data: Partial<FieldsSelection<OperationType, OperationSelection>>;
    errors: GraphqlError[];
};

type GraphQLResponse<
    OperationType extends Query | Mutation,
    OperationSelection extends QueryGenqlSelection | MutationGenqlSelection,
> =
    | GraphQLErrorResponse<OperationType, OperationSelection>
    | GraphQLSuccessfulResponse<OperationType, OperationSelection>;

export class ScoutClient {
    #genqlClient: Client;
    #reportErrorFn: (error: Error, onErrorCallback?: () => void) => void;

    constructor(options: {
        url: string;
        headers?: HeadersInit;
        fetchFn: (input: Request | URL, init?: RequestInit) => Promise<Response>;
        reportErrorFn: (error: Error, onErrorCallback?: () => void) => void;
    }) {
        const { url, headers, fetchFn, reportErrorFn } = options;

        this.#genqlClient = createClient({ url, headers, fetch: fetchFn });
        this.#reportErrorFn = reportErrorFn;
    }

    //   static fromLoader(request: Request, context: DockerAppLoadContext) {
    //     let scoutEndpoint = '';

    //     if (context.config.DOCKER_RELEASE_STAGE === 'production') {
    //       scoutEndpoint = 'https://api.scout.docker.com/v1/graphql';
    //     } else {
    //       scoutEndpoint = 'https://api.scout-stage.docker.com/v1/graphql';
    //     }

    //     const correlationId = request.headers.get(DOCKER_CORRELATION_ID_HEADER);

    //     return new ScoutClient({
    //       url: scoutEndpoint,
    //       fetchFn: context.fetch,
    //       reportErrorFn: (error: Error, onErrorCallback?: OnErrorCallback) => {
    //         context.reportError(error, onErrorCallback);
    //       },
    //       headers: {
    //         ...(correlationId
    //           ? { [SCOUT_CORRELATION_ID_HEADER]: correlationId }
    //           : undefined),
    //       },
    //     });
    //   }

    async queryIf<Q extends QueryGenqlSelection>(
        condition: boolean,
        query: Q
    ): Promise<GraphQLResponse<Query, Q>> {
        if (!condition) {
            return {
                data: {},
                errors: null,
            } as GraphQLSuccessfulResponse<Query, Q>;
        }

        return this.query(query);
    }

    async query<Q extends QueryGenqlSelection>(query: Q): Promise<GraphQLResponse<Query, Q>> {
        try {
            const graphqlResponse = await this.#genqlClient.query(query);

            return {
                data: graphqlResponse,
                errors: null,
            };
        } catch (exception: unknown) {
            // If the GenQL client detects that the response contains at least one error,
            // it will throw a GenqlError.
            if (exception instanceof GenqlError) {
                const exc = exception as GenqlError;
                const exceptionData = (exc.data ?? {}) as Partial<FieldsSelection<Query, Q>>;

                if (this.#shouldReportError(exc.errors)) {
                    this.#reportErrorFn(
                        new Error(
                            `Scout API error - ${Object.keys(query).join('_')} - ${exc.message}`
                        )
                    );
                }

                return {
                    data: exceptionData,
                    errors: exc.errors,
                } as GraphQLErrorResponse<Query, Q>;
            }

            // This is an unknown error so let's report it and return an empty response.
            this.#reportErrorFn(
                new Error(
                    `Scout API unknown error - ${
                        exception instanceof Error
                            ? exception.message
                            : JSON.stringify(exception, null, 2)
                    }`
                )
            );

            return {
                data: {},
                errors: [],
            } as GraphQLErrorResponse<Query, Q>;
        }
    }

    async mutation<M extends MutationGenqlSelection>(
        mutation: M
    ): Promise<GraphQLResponse<Mutation, M>> {
        try {
            const result = await this.#genqlClient.mutation(mutation);

            return {
                data: result,
                errors: null,
            };
        } catch (exception: unknown) {
            // If the GenQL client detects that the response contains at least one error,
            // it will throw a GenqlError.
            if (exception instanceof GenqlError) {
                const exc = exception as GenqlError;
                const exceptionData = (exc.data ?? {}) as Partial<FieldsSelection<Mutation, M>>;

                if (this.#shouldReportError(exc.errors)) {
                    this.#reportErrorFn(
                        new Error(
                            `Scout API error - ${Object.keys(mutation).join('_')} - ${exc.message}`
                        )
                    );
                }

                return {
                    data: exceptionData,
                    errors: exc.errors,
                } as GraphQLErrorResponse<Mutation, M>;
            }

            // This is an unknown error so let's report it and return an empty response.
            this.#reportErrorFn(
                new Error(
                    `Scout API unknown error - ${
                        exception instanceof Error
                            ? exception.message
                            : JSON.stringify(exception, null, 2)
                    }`
                )
            );

            return {
                data: {},
                errors: [],
            } as GraphQLErrorResponse<Mutation, M>;
        }
    }

    #shouldReportError(graphQLErrors: GraphqlError[]) {
        // 402 - Scout APIs will return a 402 if the entitlements have been exceeded.
        // 403 - Scout APIs will return a 403 if the user doesn't have permission to access / update a resource.
        const ignoreStatusCodes = [402, 403];

        return graphQLErrors.some(({ extensions }) => {
            return (
                typeof extensions?.status === 'number' &&
                !ignoreStatusCodes.includes(extensions.status)
            );
        });
    }
}

export enum ScoutEndpoint {
    DHI_REPOSITORIES = 'dhiRepositories',
    DHI_REPOSITORY_CATEGORIES = 'dhiRepositoryCategories',
    DHI_REPOSITORY_ITEMS = 'dhiRepositoryItems',
}
