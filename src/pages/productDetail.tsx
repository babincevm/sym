import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '@/store/products/types';

import { ROUTES } from '@/router/routes';

import { useProductStore } from '@/hooks/useProductStore';

import BaseLayout from '@/layouts/BaseLayout';

import SProductDetail, { TFormikValues } from '@/components/SProductDetail/SProductDetail';

import { deleteProduct, fetchProductById, updateProduct } from '@/store/products';

interface IProps {}

type TProps = PropsWithChildren<IProps>;

const ProductDetail: React.FC<TProps> = () => {
    const { id: productId } = useParams<{ id: string }>();
    const [, dispatch] = useProductStore();
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productLoading, setProductLoading] = useState<boolean>(false);

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(
        () => {
            if (!productId) {
                return;
            }
            setProductLoading(true);
            dispatch(fetchProductById({ id: Number(productId) }))
                .unwrap()
                .then((response: IProduct | undefined) => {
                    setProductLoading(false);
                    if (!response) {
                        return;
                    }
                    setProduct(response);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch, productId]
    );

    const handleSave = useCallback(
        async (event: TFormikValues) => {
            if (!product) {
                return;
            }
            setIsLoading(true);
            const updatedFields: Record<string, unknown> = {};

            Object.keys(product).forEach((value: string) => {
                if (!event[value as keyof TFormikValues]) {
                    updatedFields[value] = product[value as keyof IProduct];
                    return;
                }
                updatedFields[value] = event[value as keyof TFormikValues];
            });
            await dispatch(
                updateProduct({
                    id: product?.id ?? 0,
                    item: updatedFields
                })
            );
            setIsLoading(false);
        },
        [dispatch, product]
    );

    const handleDeleteConfirm = useCallback(async () => {
        if (!product?.id) {
            return;
        }
        setIsLoading(true);
        await dispatch(deleteProduct({ id: product.id }));
        navigate(ROUTES.PRODUCTS.path);
    }, [dispatch, product?.id, navigate]);

    if (productLoading) {
        return 'Loading';
    }

    if (!product) {
        return 'Error';
    }

    return (
        <BaseLayout onBack={handleBack}>
            <SProductDetail
                initialProduct={product}
                onSave={handleSave}
                isLoading={isLoading}
                onDelete={handleDeleteConfirm}
            />
        </BaseLayout>
    );
};

export default ProductDetail;
