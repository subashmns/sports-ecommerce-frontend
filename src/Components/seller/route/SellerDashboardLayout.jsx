import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, PlusCircleOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Header from '../header/Header';
import ProductList from '../productList/ProductList';
import AddProduct from '../addEditProduct/AddEditProduct';
import './SellerDashbord.css';
import Typography from '@mui/material/Typography';

const { Sider, Content } = Layout;

const SellerDashboardLayout = () => {
    const menuItems = [
        {
            key: "1",
            icon: <DashboardOutlined />,
            label: <Link to="seller/dashboard" className="text-decoration-none">Dashboard</Link>
        },
        {
            key: "2",
            icon: <UnorderedListOutlined />,
            label: <Link to="seller/products" className="text-decoration-none">Products</Link>
        },
        {
            key: "3",
            icon: <PlusCircleOutlined />,
            label: <Link to="seller/add-product" className="text-decoration-none">Add Product</Link>
        },
        {
            key: "4",  // New menu item for Product Order
            icon: <ShoppingCartOutlined />,
            label: <Link to="seller/product-order" className="text-decoration-none">Product Orders</Link>
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={250}
                theme="dark"
                className="sidebar"
                collapsible
            >
                <div className="logo">
                    <Typography variant="h6" color="white">Seller</Typography>
                </div>
                <Menu theme="dark" mode="inline" items={menuItems} />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Header />
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    <div className="dashboard-content">
                        <Routes>
                            <Route path="seller/products" element={<ProductList />} />
                            <Route path="seller/add-product" element={<AddProduct />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SellerDashboardLayout;
