export type SearchRequest = {
    query: string;
    badges?: string[];
    type?: string;
    categories?: string[];
    architectures?: string[];
    operating_systems?: string[];
    extension_reviewed?: boolean;
    from?: number;
    size?: number;
    sort?: 'pull_count' | 'updated_at' | null;
    order?: 'asc' | 'desc' | null;
    images?: string[];
};

export function buildSearchQueryParams(request: SearchRequest): URLSearchParams {
    const params = new URLSearchParams();

    params.set('query', request.query);

    if (request.badges?.length) {
        params.set('badges', request.badges.join(','));
    }
    if (request.type) {
        params.set('type', request.type);
    }
    if (request.categories?.length) {
        params.set('categories', request.categories.join(','));
    }
    if (request.architectures?.length) {
        params.set('architectures', request.architectures.join(','));
    }
    if (request.operating_systems?.length) {
        params.set('operating_systems', request.operating_systems.join(','));
    }
    if (request.extension_reviewed) {
        params.set('extension_reviewed', 'true');
    }
    if (request.from !== undefined && request.from !== null) {
        params.set('from', request.from.toString());
    }
    if (request.size !== undefined && request.size !== null) {
        params.set('size', request.size.toString());
    }
    if (request.sort) {
        params.set('sort', request.sort);
    }
    if (request.order) {
        params.set('order', request.order);
    }
    if (request.images?.length) {
        params.set('images', request.images.join(','));
    }

    return params;
}

export function buildSearchUrl(host: string, request: SearchRequest): string {
    const url = new URL(`${host}/v4?custom_boosted_results=true`);
    const params = buildSearchQueryParams(request);

    for (const [key, value] of params.entries()) {
        url.searchParams.set(key, value);
    }

    return url.toString();
}

export function buildNamespaceRepositoriesUrl(
    host: string,
    {
        namespace,
        page,
        page_size,
        ordering,
        media_types,
        content_types,
    }: {
        namespace: string;
        page?: number;
        page_size?: number;
        ordering?: string;
        media_types?: string;
        content_types?: string;
    }
): string {
    const url = new URL(`${host}/namespaces/${encodeURIComponent(namespace)}/repositories`);

    url.searchParams.set('page', (page ?? 1).toString());
    url.searchParams.set('page_size', (page_size ?? 10).toString());

    if (ordering) {
        url.searchParams.set('ordering', ordering);
    }
    if (media_types) {
        url.searchParams.set('media_types', media_types);
    }
    if (content_types) {
        url.searchParams.set('content_types', content_types);
    }

    return url.toString();
}

export function buildRepositoryTagsUrl(
    host: string,
    {
        namespace,
        repository,
        page,
        page_size,
        architecture,
        os,
    }: {
        namespace?: string;
        repository: string;
        page?: number;
        page_size?: number;
        architecture?: string;
        os?: string;
    }
): string {
    const resolvedNamespace = namespace || 'library';
    const url = new URL(
        `${host}/namespaces/${encodeURIComponent(resolvedNamespace)}/repositories/${encodeURIComponent(repository)}/tags`
    );

    url.searchParams.set('page', (page ?? 1).toString());
    url.searchParams.set('page_size', (page_size ?? 10).toString());

    if (architecture) {
        url.searchParams.set('architecture', architecture);
    }
    if (os) {
        url.searchParams.set('os', os);
    }

    return url.toString();
}
