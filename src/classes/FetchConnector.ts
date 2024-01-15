import { TSortShape, TWithFilter, TWithPagination, TWithSignal, TWithSort } from '@/types/types';
import { IFilterShape } from '@/components/SFilter/types';

interface IRequestParams<TSort extends TSortShape = TSortShape, TFilter extends IFilterShape = IFilterShape> {
    page: TWithPagination['page'];
    limit: TWithPagination['limit'];
    sort: TWithSort<unknown, TSort>['sort'];
    filters: TWithFilter<unknown, TFilter>['filters'];
}

export interface IFetchConnector<TSort extends TSortShape = TSortShape, TFilter extends IFilterShape = IFilterShape> {
    // registerField(
    //     fieldName: keyof IRequestParams<TSort, TFilter>,
    //     initialValue: IRequestParams<TSort, TFilter>[typeof fieldName]
    // ): IFetchConnector<TSort, TFilter>;

    updateField(
        fieldName: keyof IRequestParams<TSort, TFilter>,
        fieldValue: IRequestParams<TSort, TFilter>[typeof fieldName]
    ): IFetchConnector<TSort, TFilter>;

    commit: (signal?: AbortSignal) => void;
}

export class FetchConnector<TSort extends TSortShape = TSortShape, TFilter extends IFilterShape = IFilterShape>
    implements IFetchConnector<TSort, TFilter>
{
    private readonly fetcher: (args: TWithSignal<IRequestParams<TSort, TFilter>>) => void;
    private prevController: AbortController | null = null;

    private savedArgs: IRequestParams<TSort, TFilter> = {
        page: null,
        sort: null,
        limit: null,
        filters: null
    };
    private updatedFieldsCount: number = 0;

    public constructor(fetcher: (args: TWithSignal<IRequestParams<TSort, TFilter>>) => void) {
        this.fetcher = fetcher;
    }

    // public registerField(
    //     fieldName: keyof IRequestParams<TSort, TFilter>,
    //     initialValue: IRequestParams<TSort, TFilter>[typeof fieldName]
    // ): this {
    //     // @ts-ignore
    //     this.savedArgs[fieldName] = initialValue;
    //     return this;
    // }

    public updateField(
        fieldName: keyof IRequestParams<TSort, TFilter>,
        fieldValue: IRequestParams<TSort, TFilter>[typeof fieldName]
    ): this {
        if (!(fieldName in this.savedArgs)) {
            return this;
        }
        if (this.savedArgs[fieldName] === fieldValue) {
            return this;
        }

        // @ts-ignore
        this.savedArgs[fieldName] = fieldValue;
        this.updatedFieldsCount++;
        return this;
    }

    public commit(): void {
        if (this.updatedFieldsCount === 0) {
            return;
        }

        if (this.prevController !== null) {
            this.prevController.abort();
        }

        this.prevController = new AbortController();
        const args: TWithSignal<IRequestParams<TSort, TFilter>> = this.savedArgs;
        args.signal = this.prevController.signal;

        Object.keys(this.savedArgs).forEach((paramKey: string): void => {
            const key = paramKey as keyof IRequestParams<TSort, TFilter>;
            if (this.savedArgs[key] === null || this.savedArgs[key] === undefined) {
                return;
            }

            // @ts-ignore
            args[key] = this.savedArgs[key];
        });

        this.fetcher(args);
        this.updatedFieldsCount = 0;
    }
}
