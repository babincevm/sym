import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { ITextFilter } from '@/components/SFilter/types';
import { TWithDisabled } from '@/types/props';

import { useBounding } from '@/hooks/useBounding';

interface IProps extends Omit<ITextFilter, 'type'> {}

type TProps = TWithDisabled<IProps>;

const SFilterText: React.FC<TProps> = (props: TProps) => {
    const { disabled, value: initialValue, title, name } = props;

    const { value, handleChange, clear } = useBounding({ value: initialValue });

    return (
        <Box display="flex" gap="10px" alignItems="center">
            <TextField
                size="small"
                label={title}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                variant="outlined"
                fullWidth
                name={name}
            />
            <IconButton
                aria-label="clear"
                size="small"
                disabled={value === ''}
                onClick={clear}
                sx={{
                    opacity: value === '' ? 0 : 1,
                    transition: 'opacity .2s'
                }}
            >
                <ClearIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default SFilterText;
