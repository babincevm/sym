import { EPageSize } from '@/components/SPagination/types';
import { IFilterShape } from '@/components/SFilter/types';

export type TNullish<T = unknown> = T | undefined | null;

export type TWithSignal<T = unknown> = T & { signal?: AbortSignal };

export type TWithPagination<T = unknown, TLimitType extends number | string = EPageSize> = T & {
    page?: TNullish<number>;
    limit?: TNullish<TLimitType>;
};

export type TWithSearch<T = unknown> = T & {
    search?: TNullish<string>;
};

type TSortOrder = 'asc' | 'desc';
export type TSortShape<TSortField extends string = string> = `${TSortField}.${TSortOrder}`;

export type TWithSort<T = unknown, TSort extends TSortShape = TSortShape> = T & {
    sort?: TNullish<TSort>;
};

export type TWithFilter<T = unknown, TEntityFilters extends IFilterShape = IFilterShape> = T & {
    filters?: TNullish<TEntityFilters>;
};

export type TListRequestArgs<
    T = unknown,
    TSort extends TSortShape = TSortShape,
    TFilter extends IFilterShape = IFilterShape
> = TWithSignal<TWithPagination<TWithSearch<TWithSort<TWithFilter<T, TFilter>, TSort>>>>;

export type TItemRequestArgs<TID = string> = TWithSignal<{ id: TID }>;
