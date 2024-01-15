import React, { useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { ISelectOption } from '@/ui/SSelect/types';
import { TWithDisabled } from '@/types/props';

export interface IProps<TValue extends string | number = string> extends TWithDisabled {
    options: Array<ISelectOption<TValue>>;
    value: TValue | null;
    onChange: (v: TValue) => void;
    label?: string;
    fullWidth?: boolean;
    name?: string;
}

function SSelect<TValue extends string | number = string>(props: IProps<TValue>): ReturnType<React.FC<IProps<TValue>>> {
    const { options, value, label, onChange, fullWidth, name } = props;

    const handleChange = useCallback(
        (event: SelectChangeEvent<TValue>) => {
            onChange?.(event.target.value as TValue);
        },
        [onChange]
    );

    return (
        <FormControl sx={{ minWidth: 150 }} size="small" fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>
            <Select value={value ?? ''} label={label} onChange={handleChange} name={name}>
                {options.map((option: ISelectOption<TValue>) => (
                    <MenuItem value={option.value} key={option.value}>
                        {option.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SSelect;
