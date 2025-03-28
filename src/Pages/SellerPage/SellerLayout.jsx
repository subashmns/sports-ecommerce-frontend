import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import ProductList from '../../Components/seller/productList/ProductList';
import AddProduct from '../../Components/seller/addEditProduct/AddEditProduct';
import { Route, Routes } from 'react-router-dom';



const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>  <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                {/* <Route path="/seller/edit-product/:productId" component={AddEditProduct} /> */}
            </Routes>
            </Typography>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;

    const NAVIGATION = [
        {
            segment: 'dashboard',
            title: 'Dashboard',
            router: useDemoRouter('/dashboard'),
            icon: <DashboardIcon />,
        },
        {
            segment: 'Add Product',
            title: 'Add product',
            router: useDemoRouter('/seller/add-product'),
            icon: <DashboardIcon />,
        },
        {
            segment: 'My Product',
            title: 'My Product',
            router: useDemoRouter('/seller/products'),
            icon: <ShoppingCartIcon />,
        },
    ];

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'MUI',
            }}
            router={NAVIGATION.map(Item => Item.router)}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={NAVIGATION.map(Item => Item.router)} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DashboardLayoutBranding.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutBranding;
