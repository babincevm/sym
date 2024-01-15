import React from 'react';

import { TWithLoading } from '@/types/props';
import { IProduct } from '@/store/products/types';

import { useProductStore } from '@/hooks/useProductStore';

import SList from '@/ui/SList/SList';

import SProduct from '@/components/SProducts/SProduct/SProduct';
import SProductSkeleton from '@/components/SProducts/SProduct/SProductSkeleton';

const SProductsList: React.FC<TWithLoading> = (props: TWithLoading) => {
    const { isLoading } = props;
    const [productStore] = useProductStore();

    return (
        <SList<IProduct>
            items={productStore.products}
            component={SProduct}
            skeleton={SProductSkeleton}
            isLoading={isLoading}
        />
    );
};

export default SProductsList;
