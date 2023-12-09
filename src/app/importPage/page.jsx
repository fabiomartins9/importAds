"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import "./page.css";

import { Col, Row, Form, Button, InputNumber, Input } from "antd";
import Cascader_uf from "../../../components/cascader/cascader_uf";
import Coins from "../../../components/coins/coins";
import TableResult from "../../../components/table/table";
import PDFContent from "../../../components/pdfContent/PdfContent";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
} from "@react-pdf/renderer";

const data = [
  {
    key: "1",
    name: "John Brown",
    date: "07/12/2023",
    custoTaxImport: "3845,00",
    custoTaxaIcms: "54,00",
    custoTaxaIof: "10,2",
    valorTotalTributos: "548,32",
    valorTotalCompra: "5682,00",
    valorTotalProduto: "987452,00",
  },
  {
    key: "2",
    name: "John Brown",
    date: "07/12/2023",
    custoTaxImport: "3845,00",
    custoTaxaIcms: "54,00",
    custoTaxaIof: "10,2",
    valorTotalTributos: "548,32",
    valorTotalCompra: "5682,00",
    valorTotalProduto: "987452,00",
  },
  {
    key: "3",
    name: "John Brown",
    date: "07/12/2023",
    custoTaxImport: "3845,00",
    custoTaxaIcms: "54,00",
    custoTaxaIof: "10,2",
    valorTotalTributos: "548,32",
    valorTotalCompra: "5682,00",
    valorTotalProduto: "987452,00",
  },
];


  

export default function ImpotPage() {
  const [pdfVisible, setPdfVisible] = useState(false);
  return (
    <div className="container">
      <div className="Col-form">
        <Col className="Col-form-ant" span={12}>
          <Row>
            <Coins />
          </Row>
          <Row>
            <Form>
              <Form.Item label="Nome:">
                <Input style={{ width: "80%" }} />
              </Form.Item>
              <Form.Item label="Data:">
                <Input style={{ width: "80%" }} />
              </Form.Item>
              <Form.Item label="UF:">
                <Cascader_uf />
              </Form.Item>
              <Form.Item label="Aliquota:">
                <span>Valor da aliquota</span>
              </Form.Item>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Item label="Valor Cheio:">
                <InputNumber
                  placeholder="Valor pago fornecedor"
                  style={{ width: "80%" }}
                />
              </Form.Item>
              <Form.Item label="Valor declarado:">
                <InputNumber
                  placeholder="Valor invoice"
                  style={{ width: "80%" }}
                />
              </Form.Item>
              <Form.Item label="Frete:">
                <InputNumber
                  placeholder="Valor frete pago"
                  style={{ width: "80%" }}
                />
                <br />
                <span>*Considerar o valor do frete cheio pago</span>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Calcular
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
        <Col className="Col-table-antd" span={12}>
          <Row id="table">
            <TableResult dataSource={data} />
            {/* Adicionar um botão para baixar a tabela em PDF */}
          <PDFDownloadLink document={<PDFContent data={data} />} fileName="documento.pdf">
            {({ blob, url, loading, error }) => (
              <Button
                type="primary"
                style={{ marginTop: '10px' }}
                disabled={loading}
              >
                {loading ? 'Gerando PDF...' : 'Baixar Tabela em PDF'}
              </Button>
            )}
          </PDFDownloadLink>
          </Row>
        </Col>
      </div>
    </div>
  );
}
