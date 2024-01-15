import { createHashRouter } from 'react-router-dom';
import Index from '@/pages';
import React from 'react';
import Products from '@/pages/products';
import ProductDetail from '@/pages/productDetail';
import ProductCreate from '@/pages/productCreate';

import { ROUTES } from '@/router/routes';

const router = createHashRouter([
    {
        path: ROUTES.ROOT.path,
        element: <Index />
    },
    {
        path: ROUTES.PRODUCTS.path,
        element: <Products />
    },
    {
        path: ROUTES.PRODUCT_DETAIL.path,
        element: <ProductDetail />
    },
    {
        path: ROUTES.PRODUCT_CREATE.path,
        element: <ProductCreate />
    }
]);

export default router;
