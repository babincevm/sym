import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { TWithLoading } from '@/types/props';

export interface IBaseItem {
    id: number | string;
}

interface IProps<TItem extends IBaseItem = IBaseItem> extends TWithLoading {
    items: TItem[];
    componentProps?: object;
    component: React.ElementType<{ item: TItem }>;
    skeleton?: React.ElementType;
    skeletonsAmount?: number;
    minWidth?: string;
}

function SList<TItem extends IBaseItem = IBaseItem>(props: IProps<TItem>): ReturnType<React.FC<IProps<TItem>>> {
    const {
        items,
        component: Component,
        isLoading,
        skeleton: SkeletonComponent,
        minWidth,
        skeletonsAmount = 8,
        componentProps = {}
    } = props;

    if (isLoading === true) {
        if (!SkeletonComponent) {
            return;
        }
        return (
            <Grid container spacing={4} sx={{ minWidth }}>
                {Array(skeletonsAmount)
                    .fill(undefined)
                    .map((val: undefined, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <SkeletonComponent />
                        </Grid>
                    ))}
            </Grid>
        );
    }

    if (items.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="70dvh">
                <Typography variant="h3">Текст пустого списка</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4} sx={{ minWidth }}>
            {items.map((item: TItem) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Component item={item} {...componentProps} />
                </Grid>
            ))}
        </Grid>
    );
}

export default SList;
