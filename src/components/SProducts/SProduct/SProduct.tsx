import React, { useCallback, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { IProduct } from '@/store/products/types';

import { ROUTES } from '@/router/routes';

import { useProductStore } from '@/hooks/useProductStore';

import SDelete from '@/components/SDelete/SDelete';

import { deleteProduct } from '@/store/products';

interface IProps {
    item: IProduct;
    onDeleted?: (item: IProduct) => void;
}

const SProduct: React.FC<IProps> = (props: IProps) => {
    const { item: product, onDeleted } = props;
    const [, dispatch] = useProductStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeleteConfirm = useCallback(async () => {
        setIsLoading(true);
        await dispatch(deleteProduct({ id: product.id }));
        onDeleted?.(product);
        setIsLoading(false);
    }, [dispatch, product, onDeleted]);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    height: '100%',
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <CardMedia component="img" height="140" image={product.image ?? undefined} alt={product.title} />
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1
                    }}
                >
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            marginTop: 'auto'
                        }}
                    >
                        {product.description}
                    </Typography>

                    <Stack sx={{ marginTop: '20px' }}>
                        <Typography gutterBottom>Опубликован: {product.isPublished ? 'Да' : 'Нет'}</Typography>
                        <Typography gutterBottom>
                            Создан через интерфейс: {product.isExternalCreate ? 'Да' : 'Нет'}
                        </Typography>
                        <Typography gutterBottom>Цена: &#x24;{product.price}</Typography>
                    </Stack>
                </CardContent>

                <CardActions sx={{ width: '100%' }}>
                    <Button
                        size="medium"
                        fullWidth
                        variant="contained"
                        component={Link}
                        to={ROUTES.PRODUCT_DETAIL.makeLink(product.id)}
                    >
                        Редактировать
                    </Button>
                    <SDelete onConfirm={handleDeleteConfirm} disabled={isLoading} />
                </CardActions>
            </Box>
        </Card>
    );
};

export default SProduct;
