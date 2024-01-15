import { ISelectOption } from '@/ui/SSelect/types';

export const PAGE_QUERY_KEY = 'page';
export const PAGE_SIZE_QUERY_KEY = 'page_size';

export enum EPageSize {
    SIZE_8 = '8',
    SIZE_16 = '16',
    SIZE_ALL = 'all'
}

export const DEFAULT_PAGE_SIZE = EPageSize.SIZE_8;

export const PAGINATION_PAGE_SIZE_OPTIONS: Array<ISelectOption<EPageSize>> = [
    {
        title: '8',
        value: EPageSize.SIZE_8
    },
    {
        title: '16',
        value: EPageSize.SIZE_16
    },
    {
        title: 'Все',
        value: EPageSize.SIZE_ALL
    }
];
