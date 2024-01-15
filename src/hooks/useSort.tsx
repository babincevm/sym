import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IFetchConnector } from '@/classes/FetchConnector';
import { Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { ISelectOption } from '@/ui/SSelect/types';
import { SORT_QUERY_KEY } from '@/hooks/types/sort';
import { TSortShape } from '@/types/types';

import { useSelect } from '@/hooks/useSelect';

interface IProps<TSortEnum extends TSortShape = TSortShape> {
    sortOptions: Array<ISelectOption<TSortEnum>>;
    defaultSort: TSortEnum;
    connector: IFetchConnector<TSortEnum>;
}

interface IUseSort<TSortEnum extends TSortShape = TSortShape> {
    render: () => ReactNode;
    sort: TSortEnum;
}

export const useSort = <TSortEnum extends TSortShape = TSortShape>(props: IProps<TSortEnum>): IUseSort<TSortEnum> => {
    const { sortOptions, defaultSort, connector } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    const currentSort = useMemo(
        () => (searchParams.get(SORT_QUERY_KEY) as TSortEnum) || defaultSort,
        [defaultSort, searchParams]
    );

    // const handleChange = useCallback(
    //     (itemSort: TSortEnum | null): void => {
    //         setSearchParams((prevSearchParams: URLSearchParams): URLSearchParams => {
    //             if (!itemSort || itemSort === defaultSort) {
    //                 prevSearchParams.delete(SORT_QUERY_KEY);
    //             } else {
    //                 prevSearchParams.set(SORT_QUERY_KEY, String(itemSort));
    //             }
    //
    //             return prevSearchParams;
    //         });
    //     },
    //     [defaultSort, setSearchParams]
    // );

    const {
        render: renderSelect,
        value,
        clear
    } = useSelect<TSortEnum>({
        options: sortOptions,
        label: 'Сортировка',
        fullWidth: true,
        initial: (searchParams.get(SORT_QUERY_KEY) as TSortEnum) ?? undefined
    });

    /**
     * Получение данных при изменении sort
     */
    useEffect(
        () => {
            setSearchParams((prevSearchParams: URLSearchParams): URLSearchParams => {
                if (!value || value === defaultSort) {
                    prevSearchParams.delete(SORT_QUERY_KEY);
                } else {
                    prevSearchParams.set(SORT_QUERY_KEY, String(value));
                }

                return prevSearchParams;
            });
            connector.updateField('sort', value).commit();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    const render = useCallback(() => {
        return (
            <Box display="flex" gap="10px" alignItems="center" width="100%">
                {renderSelect()}
                <IconButton
                    aria-label="clear"
                    size="small"
                    onClick={clear}
                    disabled={value === null}
                    sx={{
                        opacity: value === null ? 0 : 1,
                        transition: 'opacity .2s'
                    }}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            </Box>
        );
    }, [clear, renderSelect, value]);

    return {
        render,
        sort: currentSort
    };
};
