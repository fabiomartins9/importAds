// Header.js
'use client'

import React from 'react';
import { Layout, Menu } from 'antd';
// import 'antd/dist/antd.css'; // Certifique-se de importar o estilo Ant Design

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Services</Menu.Item>
        {/* Adicione mais itens do menu conforme necessário */}
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
