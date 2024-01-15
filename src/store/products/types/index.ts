import { IFilterShape, TFilterRangeValue } from '@/components/SFilter/types';

export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string | null;
    isPublished: boolean;
    isExternalCreate: boolean;
    dateCreated: string;
}

export interface ICreateProduct extends Omit<IProduct, 'id' | 'isExternalCreate' | 'dateCreated'> {}

export enum EProductSort {
    SORT_TITLE = 'title.asc',
    SORT_PRICE_DESC = 'price.desc',
    SORT_PRICE_ASC = 'price.asc',
    SORT_DEFAULT = 'created_at.desc'
}

export interface IProductEntityFilters extends IFilterShape {
    price?: TFilterRangeValue | null;
    title?: string;
    isPublished: boolean | null;
    isExternalCreated: boolean | null;
}

export interface IProductSearch extends IFilterShape {
    title?: string;
}
