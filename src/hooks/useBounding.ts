import { useCallback, useEffect, useState } from 'react';

import { TReactDispatch } from '@/types/props';

interface IProps {
    value?: string;
}

interface IUseBounding {
    handleChange: (event: { target: { value: string } }) => void;
    value: string;
    setValue: TReactDispatch<string>;
    clear: () => void;
}

// TODO: Generic value type
export const useBounding = (props: IProps = {}): IUseBounding => {
    const { value: externalValue } = props;

    const [value, setValue] = useState<string>(externalValue ?? '');

    useEffect(() => {
        if (externalValue === undefined) {
            return;
        }
        setValue(externalValue);
    }, [externalValue]);

    const handleChange = useCallback((event: { target: { value: string } }) => {
        setValue(event.target.value);
    }, []);

    const clear = useCallback(() => {
        setValue('');
    }, []);

    return {
        value,
        handleChange,
        setValue,
        clear
    };
};
