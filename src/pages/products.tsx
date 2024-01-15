import React, { useCallback, useMemo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FetchConnector, IFetchConnector } from '@/classes/FetchConnector';

import { TListRequestArgs } from '@/types/types';
import { EProductSort, IProduct, IProductEntityFilters } from '@/store/products/types';
import { EFilterType } from '@/components/SFilter/types';

import { ROUTES } from '@/router/routes';

import { useProductStore } from '@/hooks/useProductStore';
import { usePagination } from '@/hooks/usePagination';
import { useIsLoading } from '@/hooks/useIsLoading';
import { useSort } from '@/hooks/useSort';
import { useFilter } from '@/hooks/useFilter';
import { TFetchArgs as TSortFetchArgs, useSearch } from '@/hooks/useSearch';

import BaseLayout from '@/layouts/BaseLayout';

import SProductsList from '@/components/SProducts/SProductsList/SProductsList';
import SInternalCreated from '@/components/SProducts/SInternalCreated/SInternalCreated';

import { fetchProducts, searchProducts } from '@/store/products';

const Products: React.FC = () => {
    const [productState, productDispatch] = useProductStore();
    const [isLoading, setIsLoading] = useIsLoading();
    const navigate = useNavigate();

    const connector = useMemo<IFetchConnector<EProductSort>>(
        () =>
            new FetchConnector<EProductSort, IProductEntityFilters>(
                (fetchArgs: TListRequestArgs<unknown, EProductSort, IProductEntityFilters>) => {
                    setIsLoading(true);
                    productDispatch(fetchProducts(fetchArgs)).then(() => setIsLoading(false));
                }
            ),
        [productDispatch, setIsLoading]
    );

    const { renderPagination } = usePagination({
        paginationCount: productState.paginationCount,
        connector
    });

    const { render: renderSort } = useSort<EProductSort>({
        sortOptions: [
            {
                title: 'В алфавитном порядке',
                value: EProductSort.SORT_TITLE
            },
            {
                title: 'Цена по убыванию',
                value: EProductSort.SORT_PRICE_DESC
            },
            {
                title: 'Цена по возрастанию',
                value: EProductSort.SORT_PRICE_ASC
            }
        ],
        defaultSort: EProductSort.SORT_DEFAULT,
        connector
    });

    const { render: renderFilters } = useFilter<IProductEntityFilters>({
        filters: [
            {
                type: EFilterType.TYPE_TEXT,
                title: 'Название',
                name: 'title'
            },
            {
                type: EFilterType.TYPE_BOOL,
                title: 'Опубликован',
                name: 'isPublished'
            },
            {
                type: EFilterType.TYPE_RANGE,
                title: 'Цена',
                name: 'price'
            }
        ],
        connector
    });

    const { render: renderSearch } = useSearch<IProduct, EProductSort>({
        fetcher: useCallback(
            async (fetchArgs: TSortFetchArgs<EProductSort>): Promise<IProduct[]> => {
                const items = await productDispatch(searchProducts(fetchArgs)).unwrap();
                return items.data;
            },
            [productDispatch]
        ),
        sort: EProductSort.SORT_DEFAULT,
        onSelect: useCallback(
            (item: IProduct | null) => {
                if (!item) {
                    return;
                }
                navigate(ROUTES.PRODUCT_DETAIL.makeLink(item.id));
            },
            [navigate]
        )
    });

    return (
        <BaseLayout
            actions={
                <Box display="flex" gap="20px">
                    <SInternalCreated />
                    <Button component={Link} to={ROUTES.PRODUCT_CREATE.path} color="inherit" variant="outlined">
                        Добавить товар
                    </Button>
                </Box>
            }
        >
            <Box gap="20px" alignItems="flex-end" display="flex" flexDirection="column">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} xl={3}>
                        {renderSearch()}
                    </Grid>
                    <Grid item xs={12} md={9} xl={9}>
                        {renderPagination()}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} xl={3}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            flexDirection="column"
                            gap="30px"
                        >
                            {renderSort()}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                width="100%"
                                flexDirection="column"
                                gap="10px"
                            >
                                <Typography variant="h4">Фильтры</Typography>
                                {renderFilters()}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9} xl={9}>
                        <SProductsList isLoading={isLoading} />
                    </Grid>
                </Grid>
                {renderPagination()}
            </Box>
        </BaseLayout>
    );
};

export default Products;
