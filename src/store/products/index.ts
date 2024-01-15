import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    TItemRequestArgs,
    TListRequestArgs,
    TNullish,
    TWithPagination,
    TWithSearch,
    TWithSignal,
    TWithSort
} from '@/types/types';
import { EProductSort, ICreateProduct, IProduct, IProductEntityFilters } from '@/store/products/types';
import { IPaginated } from '@/api/types';
import { IProductsFilters } from '@/api/types/products';

import productsAPI from '@/api/productsAPI';

export interface IProductState {
    products: IProduct[];
    paginationCount: number;
    productDetail: IProduct | null;
}

const initialState: IProductState = {
    products: [],
    paginationCount: 1,
    productDetail: null
};

const getFilterObject = (filters: TNullish<IProductEntityFilters>): IProductsFilters | undefined => {
    if (!filters) {
        return undefined;
    }
    const productFilters: IProductsFilters = {};
    productFilters.title = filters.title ?? undefined;
    productFilters.isExternalCreated = filters.isExternalCreated ?? undefined;
    productFilters.isPublished = filters.isPublished ?? undefined;
    if (filters.price) {
        productFilters.price = {};
        if (filters.price[0] !== null) {
            productFilters.price.min = filters.price[0];
        }
        if (filters.price[1] !== null) {
            productFilters.price.max = filters.price[1];
        }
    }
    return productFilters;
};

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (args: TListRequestArgs<unknown, EProductSort, IProductEntityFilters>): Promise<IPaginated<IProduct[]>> => {
        try {
            const pageSize = Number(args.limit);
            return await productsAPI.fetchProducts({
                pageSize: isNaN(pageSize) ? undefined : pageSize,
                page: args.page ?? undefined,
                signal: args.signal,
                sort: args.sort ?? undefined,
                filter: getFilterObject(args.filters)
            });
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const searchProducts = createAsyncThunk(
    'products/search',
    async (
        args: TWithSort<TWithPagination<TWithSearch<TWithSignal>, number>, EProductSort>
    ): Promise<IPaginated<IProduct[]>> => {
        try {
            return await productsAPI.fetchProducts(
                {
                    pageSize: args.limit ?? undefined,
                    page: args.page ?? 1,
                    signal: args.signal,
                    sort: args.sort ?? undefined,
                    search: args.search ?? undefined
                },
                true
            );
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const fetchInternalCreated = createAsyncThunk(
    'products/fetchInternalCreated',
    async (args: TWithSort<TWithSignal, EProductSort>): Promise<IPaginated<IProduct[]>> => {
        try {
            return await productsAPI.fetchProducts(
                {
                    signal: args.signal,
                    sort: args.sort ?? undefined,
                    filter: {
                        isExternalCreated: true
                    }
                },
                true
            );
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (args: TItemRequestArgs<IProduct['id']>): Promise<IProduct | undefined> => {
        try {
            return await productsAPI.fetchProduct(Number(args.id));
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (args: {
        id: IProduct['id'];
        item: Partial<Omit<IProduct, 'id' | 'isExternalCreate' | 'dateCreated'>>;
    }): Promise<IProduct> => {
        try {
            return await productsAPI.updateProduct(Number(args.id), args.item);
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (args: { item: ICreateProduct }): Promise<IProduct> => {
        try {
            return await productsAPI.createProduct(args.item);
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (args: TItemRequestArgs<IProduct['id']>): Promise<IProduct['id']> => {
        try {
            if (!(await productsAPI.deleteProduct(Number(args.id)))) {
                throw new Error('Error');
            }

            return args.id;
        } catch (err) {
            return Promise.reject({
                reason: 'Error'
            });
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    // eslint-disable-next-line @typescript-eslint/typedef
    extraReducers: (builder) => {
        /** LIST **/
        // eslint-disable-next-line @typescript-eslint/typedef
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.paginationCount = payload.meta?.count ?? 1;
            state.products = payload.data ?? [];
        });

        /** ITEM GET **/
        // eslint-disable-next-line @typescript-eslint/typedef
        builder.addCase(fetchProductById.fulfilled, (state, { payload }) => {
            state.productDetail = payload ?? null;
        });

        /** ITEM PATCH **/
        // eslint-disable-next-line @typescript-eslint/typedef
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.productDetail = payload;
        });

        /** ITEM DELETE **/
        // eslint-disable-next-line @typescript-eslint/typedef
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.products = state.products.filter(({ id }: IProduct) => id !== payload);
        });
    }
});

export default productsSlice.reducer;
