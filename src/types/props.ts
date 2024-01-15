import React from 'react';

export type TWithDisabled<T = unknown> = T & {
    disabled?: boolean;
};

export type TWithLoading<T = unknown> = T & {
    isLoading?: boolean;
};

export type TReactDispatch<T = unknown> = React.Dispatch<React.SetStateAction<T>>;
