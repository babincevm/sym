import React from 'react';
import { Card, CardActionArea, CardContent, Skeleton } from '@mui/material';

const SProductSkeleton: React.FC = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea
                disabled
                sx={{
                    height: '100%',
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Skeleton height="140px" width="100%" variant="rectangular" />
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        width: '100%',
                        gap: '20px'
                    }}
                >
                    <Skeleton height="64px" width="100%" variant="rectangular" />

                    <Skeleton height="72px" width="100%" variant="rectangular" />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SProductSkeleton;
