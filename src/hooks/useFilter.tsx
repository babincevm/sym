import React, { ReactNode, useCallback, useMemo } from 'react';
import { IFetchConnector } from '@/classes/FetchConnector';
import { useSearchParams } from 'react-router-dom';

import { IFilterShape, TFilter } from '@/components/SFilter/types';
import { TWithDisabled } from '@/types/props';
import { FILTER_QUERY_KEY } from '@/hooks/types/filter';
import { TSortShape } from '@/types/types';

import SFilter from '@/components/SFilter/SFilter';

interface IProps<TEntityFilter extends IFilterShape = IFilterShape> extends TWithDisabled {
    filters: TFilter[];
    connector: IFetchConnector<TSortShape, TEntityFilter>;
}

interface IUseFilter {
    render: () => ReactNode;
}

export const useFilter = <TEntityFilter extends IFilterShape = IFilterShape>(
    props: IProps<TEntityFilter>
): IUseFilter => {
    const { filters: filterInputs, connector } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const filters = useMemo(() => {
        return Array.from(searchParams.entries()).reduce(
            (acc: TEntityFilter, [key, val]: [string, string]): TEntityFilter => {
                const matcher = new RegExp(`^${FILTER_QUERY_KEY}\\[(.+)\\]$`);
                if (!matcher.test(key)) {
                    return acc;
                }

                const objKey = key.match(matcher)?.[1] ?? null;
                if (objKey === null) {
                    return acc;
                }

                let filterValue: string | number | boolean;
                try {
                    filterValue = JSON.parse(val);
                } catch (e) {
                    filterValue = val;
                }

                // @ts-ignore
                acc[objKey as keyof TEntityFilter] = filterValue;
                return acc;
            },
            {} as TEntityFilter
        );
    }, [searchParams]);

    const handleFilterApply = useCallback(
        (values: TEntityFilter) => {
            setSearchParams((prevSearchParams: URLSearchParams): URLSearchParams => {
                Object.keys(values).forEach((filterKey: string) => {
                    const key = `${FILTER_QUERY_KEY}[${filterKey}]`;
                    if (
                        values[filterKey] === '' ||
                        values[filterKey] === null ||
                        values[filterKey] === undefined ||
                        (Array.isArray(values[filterKey]) &&
                            // @ts-ignore
                            (values[filterKey]?.[0] ?? null) === null &&
                            // @ts-ignore
                            (values[filterKey]?.[1] ?? null) === null)
                    ) {
                        prevSearchParams.delete(key);
                        return;
                    }
                    prevSearchParams.set(key, JSON.stringify(values[filterKey]));
                });
                return prevSearchParams;
            });
            connector.updateField('filters', values).commit();
        },
        [connector, setSearchParams]
    );

    const render = useCallback(
        () => {
            return (
                <SFilter<TEntityFilter> filters={filterInputs} onSubmit={handleFilterApply} initialValues={filters} />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterInputs, handleFilterApply]
    );

    return {
        render
    };
};
