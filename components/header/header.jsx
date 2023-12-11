import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import "./header.css"
import Coins from "../coins/coins";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "max-content" }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Services</Menu.Item>
            {/* Adicione mais itens do menu conforme necessário */}
          </Menu>
        </Col>
        <Col>
        <div className="coin-content"></div>
          <Coins />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
