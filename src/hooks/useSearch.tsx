import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material/utils';
import { Autocomplete, TextField } from '@mui/material';

import { TSortShape, TWithPagination, TWithSearch, TWithSignal, TWithSort } from '@/types/types';

import { useBounding } from '@/hooks/useBounding';

interface IBaseItem {
    id: number | string;
    title: string;
}

export type TFetchArgs<TSort extends TSortShape = TSortShape> = TWithSort<
    TWithPagination<TWithSearch<TWithSignal>, number>,
    TSort
>;

interface IProps<TItem extends IBaseItem = IBaseItem, TSort extends TSortShape = TSortShape> {
    sort?: TSort;
    fetcher?: (args: TFetchArgs<TSort>) => Promise<TItem[]>;
    label?: string;
    itemsCount?: number;
    onSelect?: (item: TItem | null) => void;
}

interface IUseSearch {
    render: () => ReactNode;
}

export const useSearch = <TItem extends IBaseItem = IBaseItem, TSort extends TSortShape = TSortShape>(
    props: IProps<TItem, TSort>
): IUseSearch => {
    const { fetcher, label = 'Поиск', sort, itemsCount, onSelect } = props ?? {};
    const [options, setOptions] = useState<TItem[]>([]);

    const debouncedFetch = useMemo(
        () =>
            debounce((args: TFetchArgs<TSort>, callback: (results?: readonly TItem[]) => void) => {
                fetcher?.(args)
                    .then(callback)
                    .catch(() => null);
            }, 400),
        [fetcher]
    );

    const { value: searchValue, setValue: setSearchValue } = useBounding();

    const handleInputChange = useCallback(
        (event: any, newValue: string) => {
            setSearchValue(newValue);
        },
        [setSearchValue]
    );

    useEffect(
        () => {
            if (searchValue === '') {
                setOptions([]);
                return;
            }

            const controller = new AbortController();
            const searchArgs: TFetchArgs<TSort> = {
                signal: controller.signal,
                search: searchValue,
                sort,
                limit: itemsCount
            };
            debouncedFetch.clear();
            debouncedFetch(searchArgs, (items?: readonly TItem[]) => {
                if (!items) {
                    setOptions([]);
                    return;
                }

                setOptions(items.map((item: TItem): TItem => item));
            });

            return () => {
                controller.abort();
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchValue]
    );
    const filterOptions = useCallback((x: any) => x, []);
    const renderInput = useCallback((params: any) => <TextField {...params} size="small" label={label} />, [label]);
    const getOptionLabel = useCallback((item: TItem): string => item.title, []);
    const getOptionKey = useCallback((item: TItem): TItem['id'] => item.id, []);
    const getIsOptionEqualToValue = useCallback(
        (option: TItem, currentValue: TItem): boolean => option.id === currentValue?.id,
        []
    );
    const handleSearchSelect = useCallback(
        (event: any, selectedValue: TItem | null) => {
            onSelect?.(selectedValue);
        },
        [onSelect]
    );

    const render = useCallback(() => {
        return (
            <Autocomplete
                disablePortal
                fullWidth
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionKey={getOptionKey}
                isOptionEqualToValue={getIsOptionEqualToValue}
                autoComplete
                includeInputInList
                onInputChange={handleInputChange}
                filterOptions={filterOptions}
                renderInput={renderInput}
                onChange={handleSearchSelect}
            />
        );
    }, [
        options,
        getOptionLabel,
        getOptionKey,
        handleInputChange,
        filterOptions,
        renderInput,
        handleSearchSelect,
        getIsOptionEqualToValue
    ]);

    return {
        render
    };
};
