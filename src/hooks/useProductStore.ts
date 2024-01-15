import { useSelector } from 'react-redux';

import { TUseStore } from '@/hooks/types/store';

import { RootState, useAppDispatch } from '@/store';
import { IProductState } from '@/store/products';

export const useProductStore = (): TUseStore<IProductState> => [
    useSelector((state: RootState) => state.products),
    useAppDispatch()
];
