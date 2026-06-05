import assert from 'node:assert/strict';
import fc from 'fast-check';
import {
    buildNamespaceRepositoriesUrl,
    buildRepositoryTagsUrl,
    buildSearchQueryParams,
    buildSearchUrl,
} from '../src/query-builders';

const arrayValueArb = fc.string({ minLength: 1, maxLength: 16 }).filter((value) => {
    return !value.includes(',');
});
const optionalStringArb = fc.option(fc.string({ minLength: 1, maxLength: 24 }), {
    nil: undefined,
});
const optionalArrayArb = fc.option(fc.array(arrayValueArb, { maxLength: 4 }), {
    nil: undefined,
});

fc.assert(
    fc.property(
        fc.record({
            query: fc.string({ minLength: 1, maxLength: 24 }),
            badges: optionalArrayArb,
            type: optionalStringArb,
            categories: optionalArrayArb,
            architectures: optionalArrayArb,
            operating_systems: optionalArrayArb,
            extension_reviewed: fc.option(fc.boolean(), { nil: undefined }),
            from: fc.option(fc.integer({ min: 0, max: 500 }), { nil: undefined }),
            size: fc.option(fc.integer({ min: 0, max: 500 }), { nil: undefined }),
            sort: fc.option(fc.constantFrom('pull_count', 'updated_at'), { nil: null }),
            order: fc.option(fc.constantFrom('asc', 'desc'), { nil: null }),
            images: optionalArrayArb,
        }),
        (request) => {
            const params = buildSearchQueryParams(request);

            assert.equal(params.get('query'), request.query);
            assert.equal(params.get('type'), request.type ?? null);
            assert.equal(params.get('sort'), request.sort ?? null);
            assert.equal(params.get('order'), request.order ?? null);
            assert.equal(
                params.get('from'),
                request.from === undefined ? null : request.from.toString()
            );
            assert.equal(
                params.get('size'),
                request.size === undefined ? null : request.size.toString()
            );
            assert.equal(
                params.get('extension_reviewed'),
                request.extension_reviewed ? 'true' : null
            );

            for (const key of [
                'badges',
                'categories',
                'architectures',
                'operating_systems',
                'images',
            ] as const) {
                const expected = request[key]?.length ? request[key]!.join(',') : null;
                assert.equal(params.get(key), expected);
            }

            const builtUrl = new URL(buildSearchUrl('https://hub.docker.com/api/search', request));
            assert.equal(builtUrl.searchParams.get('custom_boosted_results'), 'true');
            assert.equal(builtUrl.searchParams.get('query'), request.query);
        }
    )
);

fc.assert(
    fc.property(
        fc.record({
            namespace: fc.string({ minLength: 1, maxLength: 20 }),
            page: fc.option(fc.integer({ min: 1, max: 50 }), { nil: undefined }),
            page_size: fc.option(fc.integer({ min: 1, max: 100 }), { nil: undefined }),
            ordering: optionalStringArb,
            media_types: optionalStringArb,
            content_types: optionalStringArb,
        }),
        (request) => {
            const url = new URL(
                buildNamespaceRepositoriesUrl('https://hub.docker.com/v2', request)
            );

            assert.equal(url.searchParams.get('page'), (request.page ?? 1).toString());
            assert.equal(url.searchParams.get('page_size'), (request.page_size ?? 10).toString());
            assert.equal(url.searchParams.get('ordering'), request.ordering ?? null);
            assert.equal(url.searchParams.get('media_types'), request.media_types ?? null);
            assert.equal(url.searchParams.get('content_types'), request.content_types ?? null);
        }
    )
);

fc.assert(
    fc.property(
        fc.record({
            namespace: fc.option(fc.string({ minLength: 1, maxLength: 20 }), {
                nil: undefined,
            }),
            repository: fc.string({ minLength: 1, maxLength: 20 }),
            page: fc.option(fc.integer({ min: 1, max: 50 }), { nil: undefined }),
            page_size: fc.option(fc.integer({ min: 1, max: 100 }), { nil: undefined }),
            architecture: optionalStringArb,
            os: optionalStringArb,
        }),
        (request) => {
            const url = new URL(buildRepositoryTagsUrl('https://hub.docker.com/v2', request));

            assert.equal(url.searchParams.get('page'), (request.page ?? 1).toString());
            assert.equal(url.searchParams.get('page_size'), (request.page_size ?? 10).toString());
            assert.equal(url.searchParams.get('architecture'), request.architecture ?? null);
            assert.equal(url.searchParams.get('os'), request.os ?? null);
            assert.ok(url.pathname.includes(`/${encodeURIComponent(request.repository)}/tags`));
        }
    )
);

console.log('Property-based checks passed.');
