import * as React from 'react';
import { useCallback } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Box } from '@mui/material';

import {
    DEFAULT_PAGE_SIZE,
    EPageSize,
    PAGE_QUERY_KEY,
    PAGE_SIZE_QUERY_KEY,
    PAGINATION_PAGE_SIZE_OPTIONS
} from './types';
import { TWithDisabled } from '@/types/props';

import { useSelect } from '@/hooks/useSelect';

interface IProps {
    count: number;
    onPageSizeChange?: (v: EPageSize | null) => void;
    page: number;
    pageSize: EPageSize;
}

type TProps = TWithDisabled<IProps>;

const SPagination: React.FC<TProps> = (props: TProps) => {
    const { count, disabled, onPageSizeChange, pageSize, page } = props;
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const getUrl = useCallback(
        (itemPage: number | null): string => {
            if (!itemPage || itemPage === 1) {
                searchParams.delete(PAGE_QUERY_KEY);
            } else {
                searchParams.set(PAGE_QUERY_KEY, String(itemPage));
            }

            if (pageSize === DEFAULT_PAGE_SIZE) {
                searchParams.delete(PAGE_SIZE_QUERY_KEY);
            } else {
                searchParams.set(PAGE_SIZE_QUERY_KEY, String(pageSize));
            }

            return `${location.pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`;
        },
        [location.pathname, pageSize, searchParams]
    );

    const renderItem = useCallback(
        (item: PaginationRenderItemParams) => {
            return <PaginationItem component={Link} to={getUrl(item.page)} {...item} />;
        },
        [getUrl]
    );

    const { render: renderSelect } = useSelect<EPageSize>({
        options: PAGINATION_PAGE_SIZE_OPTIONS,
        label: 'На странице',
        initial: searchParams.has(PAGE_SIZE_QUERY_KEY)
            ? (searchParams.get(PAGE_SIZE_QUERY_KEY) as EPageSize) || DEFAULT_PAGE_SIZE
            : DEFAULT_PAGE_SIZE,
        changeCallback: onPageSizeChange
    });

    return (
        <Box display="flex" gap="20px" alignItems="center" justifyContent="flex-end">
            {renderSelect()}
            <Pagination page={page} count={count} renderItem={renderItem} disabled={disabled} />
        </Box>
    );
};

export default SPagination;
