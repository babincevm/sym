import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';

import SSelect, { IProps as SelectProps } from '@/ui/SSelect/SSelect';

export interface IProps<TValue extends string | number = string>
    extends Omit<SelectProps<TValue>, 'onChange' | 'value'> {
    initial?: TValue;
    changeCallback?: (v: TValue | null) => void;
}

interface IUseSelect<TValue extends string | number = string> {
    value: TValue | null;
    dispatch: Dispatch<SetStateAction<TValue | null>>;
    render: () => ReactNode;
    clear: () => void;
}

export const useSelect = <TValue extends string | number = string>(props: IProps<TValue>): IUseSelect<TValue> => {
    const { initial, changeCallback, ...rest } = props;

    const [value, setValue] = useState<TValue | null>(initial ?? null);

    const handleChange = useCallback(
        (v: TValue | null) => {
            setValue(v);
            changeCallback?.(v);
        },
        [changeCallback]
    );

    /**
     * Обновление value при внешнем изменении
     */
    useEffect(() => {
        if (initial === undefined) {
            return;
        }

        setValue(initial);
    }, [initial]);

    const clear = useCallback(() => {
        setValue(null);
    }, []);

    const renderSelect = useCallback(() => {
        return <SSelect<TValue> {...rest} onChange={handleChange} value={value} />;
    }, [handleChange, rest, value]);

    return {
        value,
        dispatch: setValue,
        render: renderSelect,
        clear
    };
};
