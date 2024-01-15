import React, { PropsWithChildren } from 'react';
import { AppBar, Box, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

interface IProps {
    onBack?: () => void;
    actions?: PropsWithChildren['children'];
}

type TProps = PropsWithChildren<IProps>;

const BaseLayout: React.FC<TProps> = (props: TProps) => {
    const { children, onBack, actions } = props;

    return (
        <>
            <CssBaseline />
            <AppBar position="sticky" component="header">
                <Toolbar>
                    {onBack && (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={onBack}
                        >
                            <ArrowBack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                        </IconButton>
                    )}
                    <Typography variant="h6" color="inherit" noWrap>
                        Symtech
                    </Typography>
                    {actions && <Box sx={{ marginLeft: 'auto' }}>{actions}</Box>}
                </Toolbar>
            </AppBar>
            <Container sx={{ py: 8 }} maxWidth="xl" component="main">
                {children}
            </Container>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
        </>
    );
};

export default BaseLayout;
