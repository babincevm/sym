import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICreateProduct } from '@/store/products/types';

import { ROUTES } from '@/router/routes';

import { useProductStore } from '@/hooks/useProductStore';

import BaseLayout from '@/layouts/BaseLayout';

import SProductDetail, { TFormikValues } from '@/components/SProductDetail/SProductDetail';

import { createProduct } from '@/store/products';

const ProductCreate: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, dispatch] = useProductStore();
    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSave = useCallback(
        async (event: TFormikValues) => {
            setIsLoading(true);
            await dispatch(
                createProduct({
                    item: event as ICreateProduct
                })
            );
            navigate(ROUTES.PRODUCTS.path);
        },
        [dispatch, navigate]
    );

    return (
        <BaseLayout onBack={handleBack}>
            <SProductDetail isLoading={isLoading} onSave={handleSave} />
        </BaseLayout>
    );
};

export default ProductCreate;
