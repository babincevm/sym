import React, { useCallback, useEffect } from 'react';
import { Button, Grid } from '@mui/material';

import { EFilterType, IFilterShape, TFilter, TFilterRangeUnit, TFilterRangeValue } from '@/components/SFilter/types';
import { TWithDisabled } from '@/types/props';

import SFilterRange from '@/components/SFilter/SFilterRange';
import SFilterBoolean from '@/components/SFilter/SFilterBoolean';
import SFilterText from '@/components/SFilter/SFilterText';

interface IProps<TEntityFilters extends IFilterShape = IFilterShape> extends TWithDisabled {
    filters: TFilter[];
    onSubmit?: (values: TEntityFilters) => void;
    initialValues?: TEntityFilters;
}

function SFilter<TEntityFilters extends IFilterShape = IFilterShape>(
    props: IProps<TEntityFilters>
): ReturnType<React.FC<IProps<TEntityFilters>>> {
    const { disabled, filters, onSubmit, initialValues } = props;

    useEffect(
        () => {
            if (!initialValues) {
                return;
            }
            onSubmit?.(initialValues);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const values: IFilterShape = {};
            const formData = new FormData(event.target as HTMLFormElement);

            const setRangeValue = (key: string, value: TFilterRangeUnit, index: 0 | 1): void => {
                const fieldKey: string = key.replace(/(-from)|(-to)/, '');
                if (!values[fieldKey]) {
                    values[fieldKey] = [null, null];
                }

                // @ts-ignore Выше проверка
                values[fieldKey][index] = value;
            };
            formData.forEach((fieldValue: FormDataEntryValue, fieldKey: string) => {
                if (/.*(-from)|(-to)$/.test(fieldKey)) {
                    let numValue: TFilterRangeUnit = Number(fieldValue === '' ? Number.NaN : fieldValue);
                    numValue = isNaN(numValue) ? null : numValue;
                    setRangeValue(fieldKey, numValue, Number(fieldKey.endsWith('-to')) as 0 | 1);
                    return;
                }

                const currentFilterType = filters.find((filter: TFilter) => filter.name === fieldKey);
                if (!currentFilterType) {
                    return;
                }

                let normalizedValue;

                switch (currentFilterType.type) {
                    case EFilterType.TYPE_BOOL: {
                        normalizedValue = {
                            true: true,
                            false: false,
                            unknown: null
                        }[(fieldValue as string) || 'unknown'];
                        break;
                    }
                    default: {
                        normalizedValue = fieldValue;
                    }
                }
                values[fieldKey] = normalizedValue as TFilter['value'];
            });

            onSubmit?.(values as TEntityFilters);
        },
        [filters, onSubmit]
    );

    return (
        <Grid container columns={1} spacing={2} component="form" onSubmit={handleSubmit}>
            {filters.map((filter: TFilter) => {
                const sharedProps = {
                    disabled
                };
                switch (filter.type) {
                    case EFilterType.TYPE_BOOL: {
                        return (
                            <Grid item xs={12} md={12} xl={12} key={filter.name}>
                                <SFilterBoolean
                                    {...filter}
                                    {...sharedProps}
                                    value={(initialValues?.[filter.name] as boolean) ?? undefined}
                                />
                            </Grid>
                        );
                    }
                    case EFilterType.TYPE_RANGE: {
                        return (
                            <Grid item xs={12} md={12} xl={12} key={filter.name}>
                                <SFilterRange
                                    {...filter}
                                    {...sharedProps}
                                    value={(initialValues?.[filter.name] as TFilterRangeValue) ?? undefined}
                                />
                            </Grid>
                        );
                    }
                    default: {
                        return (
                            <Grid item xs={12} md={12} xl={12} key={filter.name}>
                                <SFilterText
                                    {...filter}
                                    {...sharedProps}
                                    value={(initialValues?.[filter.name] as string) ?? undefined}
                                />
                            </Grid>
                        );
                    }
                }
            })}
            <Grid item xs={12} md={12} xl={12}>
                <Button variant="contained" type="submit">
                    Применить
                </Button>
            </Grid>
        </Grid>
    );
}

export default SFilter;
