import { useCallback, useMemo, useState } from 'react';

export const useIsLoading = (initial: boolean = false): [boolean, (val: boolean) => void] => {
    const [loadAmount, setLoadAmount] = useState<number>(Number(initial));

    const isLoading = useMemo<boolean>(() => loadAmount > 0, [loadAmount]);

    const setIsLoading = useCallback((val: boolean) => {
        setLoadAmount((prevState: number): number => {
            if (val) {
                return prevState + 1;
            }
            prevState--;
            return prevState < 0 ? 0 : prevState;
        });
    }, []);

    return [isLoading, setIsLoading];
};
