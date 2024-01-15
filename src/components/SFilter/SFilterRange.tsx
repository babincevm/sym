import React, { useCallback, useMemo } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { IRangeFilter } from '@/components/SFilter/types';
import { TWithDisabled } from '@/types/props';

import { useBounding } from '@/hooks/useBounding';

interface IProps extends Omit<IRangeFilter, 'type'> {}

type TProps = TWithDisabled<IProps>;

const SFilterRange: React.FC<TProps> = (props: TProps) => {
    const { disabled, value: initialValue, title, name } = props;

    const {
        value: valueFrom,
        handleChange: handleChangeFrom,
        clear: clearFrom
    } = useBounding({ value: (initialValue?.[0] ?? null) === null ? undefined : String(initialValue?.[0]) });

    const {
        value: valueTo,
        handleChange: handleChangeTo,
        clear: clearTo
    } = useBounding({ value: (initialValue?.[1] ?? null) === null ? undefined : String(initialValue?.[1]) });

    const hasValue = useMemo(() => valueTo !== '' || valueFrom !== '', [valueTo, valueFrom]);

    const handleClear = useCallback(() => {
        clearTo();
        clearFrom();
    }, [clearFrom, clearTo]);

    return (
        <Grid
            container
            columns={hasValue === null ? 3 : 4}
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 30px 1fr auto',
                gap: '10px',
                alignItems: 'center'
            }}
        >
            <Grid item>
                <TextField
                    size="small"
                    label={`${title} от`}
                    value={valueFrom}
                    onChange={handleChangeFrom}
                    disabled={disabled}
                    variant="outlined"
                    fullWidth
                    name={`${name}-from`}
                />
            </Grid>

            <Grid item justifyContent="center" alignItems="center" display="flex">
                &#8212;
            </Grid>
            <Grid item>
                <TextField
                    size="small"
                    label={`${title} до`}
                    value={valueTo}
                    onChange={handleChangeTo}
                    disabled={disabled}
                    variant="outlined"
                    fullWidth
                    name={`${name}-to`}
                />
            </Grid>

            <Grid item>
                <IconButton
                    aria-label="clear"
                    size="small"
                    onClick={handleClear}
                    disabled={!hasValue}
                    sx={{
                        opacity: Number(hasValue),
                        transition: 'opacity .2s'
                    }}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
};
export default SFilterRange;
