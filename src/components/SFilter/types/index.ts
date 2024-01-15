export enum EFilterType {
    TYPE_TEXT,
    TYPE_RANGE,
    TYPE_BOOL
}

export type TFilterRangeUnit = number | null;
export type TFilterRangeValue = [TFilterRangeUnit, TFilterRangeUnit];

interface IBaseFilter {
    title: string;
    name: string;
}

export interface ITextFilter extends IBaseFilter {
    type: EFilterType.TYPE_TEXT;
    value?: string;
}

export interface IBooleanFilter extends IBaseFilter {
    type: EFilterType.TYPE_BOOL;
    value?: boolean | null;
}

export interface IRangeFilter extends IBaseFilter {
    type: EFilterType.TYPE_RANGE;
    value?: TFilterRangeValue | null;
}

export type TFilter = ITextFilter | IBooleanFilter | IRangeFilter;

export type IFilterShape = Partial<Record<string, TFilter['value']>>;
