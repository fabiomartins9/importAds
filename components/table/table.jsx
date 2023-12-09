"use client";

import React from "react";
import { Table } from "antd";

import "./table.css";

export default function TableResult({ dataSource }) {
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "1",
      width: 200,
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "2",
      width: 200,
    },

    {
      title: "CUST. TAXA IMPORT. (R$)",
      dataIndex: "custoTaxImport",
      key: "4",
      width: 200,
    },
    {
      title: "ICMS (R$)",
      dataIndex: "custoTaxaIcms",
      key: "icms",
      width: 200,
    },
    {
      title: "IOF (R$)",
      dataIndex: "custoTaxaIof",
      key: "5",
      width: 200,
    },
    {
      title: "TOTAL IMPOSTOS (R$)",
      dataIndex: "valorTotalTributos",
      key: "6",
      width: 200,
    },
    {
      title: "CUSTO FINAL PRODUTO (R$)",
      dataIndex: "valorTotalCompra",
      key: "7",
      width: 200,
    },
    {
      title: "CUSTO FINAL PRODUTO + IMPOSTOS",
      dataIndex: "valorTotalProduto",
      key: "8",
      width: 200,
    },
  ];

  return (
    <div className="table-component">
      <Table
        scroll={true}
        id="table"
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        size="small"
      />
    </div>
  );
}
