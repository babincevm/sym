import React from 'react';
import { Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { IBooleanFilter } from '@/components/SFilter/types';
import { TWithDisabled } from '@/types/props';

import { useSelect } from '@/hooks/useSelect';

interface IProps extends Omit<IBooleanFilter, 'type'> {}

type TProps = TWithDisabled<IProps>;

const SFilterBoolean: React.FC<TProps> = (props: TProps) => {
    const { disabled, value: initialValue, title, name } = props;

    const {
        render: renderSelect,
        clear,
        value
    } = useSelect<string>({
        disabled,
        initial: initialValue !== null && initialValue !== undefined ? String(initialValue) : undefined,
        label: title,
        fullWidth: true,
        name,
        options: [
            {
                title: 'Да',
                value: 'true'
            },
            {
                title: 'Нет',
                value: 'false'
            }
        ]
    });

    return (
        <Box display="flex" gap="10px" alignItems="center">
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
};

export default SFilterBoolean;
