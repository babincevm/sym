import { AppDispatch, RootState } from '@/store';

export type TUseStore<TState extends RootState[keyof RootState]> = [TState, AppDispatch];
