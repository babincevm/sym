import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/router/routes';

import BaseLayout from '@/layouts/BaseLayout';

const Index: React.FC = () => {
    return (
        <BaseLayout>
            TODO: Auth
            <Link to={ROUTES.PRODUCTS.path}>Список</Link>
        </BaseLayout>
    );
};

export default Index;
