"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import "./page.css";

import { Col, Row, Form, Button, InputNumber, Input, Card } from "antd";
import CascaderUF from "../../../components/cascader/cascader_uf";
import TableResult from "../../../components/table/table";
import PDFContent from "../../../components/pdfContent/PdfContent";
import { PDFDownloadLink } from "@react-pdf/renderer";

const currentDate = new Date();

// Criar o nome do arquivo com a data e hora atual
const fileName =
  currentDate
    .toLocaleString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/[/ :]/g, "") + ".pdf";

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
  const [icms, setIcms] = useState();

  // Função que será chamada quando um item for selecionado no CascaderUF
  const handleSelect = (value, selectedOptions) => {
    setIcms(selectedOptions);
    console.log("Valor selecionado:", value);
    console.log("Opções selecionadas:", selectedOptions);
    // Aqui você pode realizar as ações desejadas com o valor selecionado
  };

  return (
    <div className="container">
      <div className="Col-form">
        <Col className="Col-form-ant" span={8}>
          <Row className="row-import-pages">
            <Card className="card-form">
              <Form>
                <Form.Item label="Nome:">
                  <Input style={{ width: "80%" }} />
                </Form.Item>
                <Form.Item label="Data:">
                  <Input style={{ width: "80%" }} />
                </Form.Item>
                <Form.Item label="UF:">
                  <CascaderUF onSelect={handleSelect} />{" "}
                  {/* Passando a função handleSelect como onSelect */}
                </Form.Item>
                <Form.Item label="Aliquota:">
                  <span>Valor da aliquota: {icms}%</span>
                </Form.Item>
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
                  <div className="button-center">
                    <Button type="primary" htmlType="submit">
                      Calcular
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Row>
        </Col>
        <Col className="Col-table-antd" span={16}>
          <Row id="table">
            <TableResult dataSource={data} />
            {/* Adicionar um botão para baixar a tabela em PDF */}
            <PDFDownloadLink
              document={<PDFContent data={data} />}
              fileName={fileName}
            >
              {({ blob, url, loading, error }) => (
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  disabled={loading}
                >
                  {loading ? "Gerando PDF..." : "Baixar Tabela em PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </Row>
        </Col>
      </div>
    </div>
  );
}
