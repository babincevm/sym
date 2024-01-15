import React, { useCallback, useEffect, useState } from 'react';
import { Button, Drawer } from '@mui/material';

import { EProductSort, IProduct } from '@/store/products/types';

import { useProductStore } from '@/hooks/useProductStore';

import SList from '@/ui/SList/SList';

import SProduct from '@/components/SProducts/SProduct/SProduct';
import SProductSkeleton from '@/components/SProducts/SProduct/SProductSkeleton';

import { fetchInternalCreated } from '@/store/products';

const SInternalCreated: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [, productDispatch] = useProductStore();
    const [items, setItems] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(
        () => {
            const controller = new AbortController();
            if (!isOpen) {
                setTimeout(() => {
                    setItems([]);
                }, 400);
                return;
            }
            setIsLoading(true);
            productDispatch(
                fetchInternalCreated({
                    sort: EProductSort.SORT_DEFAULT,
                    signal: controller.signal
                })
            )
                .unwrap()
                .then(({ data }: { data: IProduct[] }) => {
                    setItems(data);
                })
                .catch(() => null)
                .finally(() => setIsLoading(false));
            return () => {
                controller.abort();
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isOpen]
    );

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleItemDeleted = useCallback((item: IProduct) => {
        setItems((prevState: IProduct[]): IProduct[] => prevState.filter(({ id }: IProduct) => id !== item.id));
    }, []);

    return (
        <>
            <Button color="inherit" variant="outlined" onClick={handleOpen}>
                Показать созданные
            </Button>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        p: 5
                    }
                }}
            >
                <SList<IProduct>
                    items={items}
                    component={SProduct}
                    skeleton={SProductSkeleton}
                    isLoading={isLoading}
                    skeletonsAmount={3}
                    minWidth="80dvw"
                    componentProps={{
                        onDeleted: handleItemDeleted
                    }}
                />
            </Drawer>
        </>
    );
};

export default SInternalCreated;
