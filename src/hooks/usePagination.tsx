import { useSearchParams } from 'react-router-dom';
import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { IFetchConnector } from '@/classes/FetchConnector';

import { DEFAULT_PAGE_SIZE, EPageSize, PAGE_QUERY_KEY, PAGE_SIZE_QUERY_KEY } from '@/components/SPagination/types';
import { TListRequestArgs } from '@/types/types';

import SPagination from '@/components/SPagination/SPagination';

interface IProps {
    paginationCount: number;
    connector: IFetchConnector;
}

interface IUsePagination {
    page: number;
    pageSize: EPageSize;
    renderPagination: () => ReactNode;
}

export const usePagination = (props: IProps): IUsePagination => {
    const { paginationCount, connector } = props ?? {};

    const [searchParams, setSearchParams] = useSearchParams();
    const page = useMemo(() => parseInt(searchParams.get(PAGE_QUERY_KEY) || '1', 10), [searchParams]);
    const pageSize = useMemo<EPageSize>(
        () => (searchParams.get(PAGE_SIZE_QUERY_KEY) as EPageSize) || DEFAULT_PAGE_SIZE,
        [searchParams]
    );

    const handlePageSizeChange = useCallback(
        (v: EPageSize | null) =>
            setSearchParams((prevSearchParams: URLSearchParams): URLSearchParams => {
                prevSearchParams.delete(PAGE_QUERY_KEY);

                if (!v || v === DEFAULT_PAGE_SIZE) {
                    prevSearchParams.delete(PAGE_SIZE_QUERY_KEY);
                } else {
                    prevSearchParams.set(PAGE_SIZE_QUERY_KEY, v);
                }
                return prevSearchParams;
            }),
        [setSearchParams]
    );

    const pageCount = useMemo(() => Math.ceil(paginationCount / Number(pageSize)), [pageSize, paginationCount]);

    const renderPagination = useCallback(
        () => (
            <SPagination
                count={pageCount}
                disabled={pageSize === EPageSize.SIZE_ALL}
                onPageSizeChange={handlePageSizeChange}
                page={page}
                pageSize={pageSize}
            />
        ),
        [pageCount, handlePageSizeChange, page, pageSize]
    );

    /**
     * Получение данных при изменении page или pageSize
     */
    useEffect(
        () => {
            const fetchArgs: TListRequestArgs = {
                page: null,
                limit: null
            };

            if (pageSize !== EPageSize.SIZE_ALL) {
                fetchArgs.page = page;
                fetchArgs.limit = pageSize;
            }
            connector.updateField('page', fetchArgs.page).updateField('limit', fetchArgs.limit).commit();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, pageSize]
    );

    return {
        page,
        pageSize,
        renderPagination
    };
};
