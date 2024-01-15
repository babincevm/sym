import { IProduct } from '@/store/products/types';

export const ROUTES = {
    ROOT: {
        path: '/'
    },
    PRODUCTS: {
        path: '/products'
    },
    PRODUCT_DETAIL: {
        path: '/products/:id',
        makeLink: (id: IProduct['id']): string => `/products/${id}`
    },
    PRODUCT_CREATE: {
        path: '/products/create'
    }
} as const;
