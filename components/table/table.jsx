"use client";

import React, {useState, useEffect} from "react";
import { Table } from "antd";
import { firebase } from '../../utils/firebase';
import 'firebase/firestore';

import "./table.css";

export default function TableResult({ dataSource }) {

  const [precoReal, setPrecoReal] = useState();
  const [precoInvoice, setPrecoInvoice] = useState();
  const [frete, setFrete] = useState();
  const [venda, setVenda] = useState(0);
  const [compra, setCompra] = useState(0);
  const [showModalSetTax, setShowModalSetTax] = useState(false);
  const [configTaxBd, setConfigTaxBd] = useState([]);

  // Hook Obj resultados dos calculos
  const [custosImportacao, setCustosImportacao] = useState([]);

  const db = firebase.firestore();

  // carrega as taxas do banco de dados
  useEffect(() => {
    async function getTax() {
      const taxa = await db.collection("tax");
      taxa.get().then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            importFee: doc.data().importFee,
            iof: doc.data().iof,
            currierFee: doc.data().currierFee,
            
          });
        });

        
        setConfigTaxBd(lista);
      });
    }

    getTax();
    
  }, []);


  const initialValues = {
    importFee: configTaxBd[0] && configTaxBd[0].importFee,
    icms: configTaxBd[0] && configTaxBd[0].icms,
    iof: configTaxBd[0] && configTaxBd[0].iof,
    // Adicione mais campos e valores iniciais conforme necessário
  };


  function calcular(precoReal, precoInvoice, freteUsd) {
    
    const taxaImportacao = initialValues.importFee;
    const taxaIof = initialValues.iof;
    const taxaIcms = initialValues.icms;
    const currierFee = initialValues.currierFee;
    const moedaValue = moeda.ask; //moeda.ask

    // convertendo valores prod e ship em real
    const valorProdutoInvoiceBrl = precoInvoice * moedaValue;
    const valorFreteBrl = freteUsd * moedaValue;

    const valorProdutoInvoiceMaisFreteBrl =
      valorProdutoInvoiceBrl + valorFreteBrl;

    const custoTaxaImportacao =
      valorProdutoInvoiceMaisFreteBrl * (taxaImportacao / 100);

    const custoTaxaIof = valorProdutoInvoiceMaisFreteBrl * (taxaIof / 100);

    const custoTaxaIcms =
      ((valorProdutoInvoiceMaisFreteBrl + custoTaxaImportacao) /
        (1 - taxaIcms / 100)) *
      (taxaIcms / 100);

    const valorTotalTributos =
      custoTaxaImportacao + custoTaxaIcms + custoTaxaIof + currierFee;

    const valorTotalCompra =
      valorProdutoInvoiceMaisFreteBrl  + valorTotalTributos;

    const valorTotalProduto = valorProdutoInvoiceMaisFreteBrl + (precoReal * moedaValue);

    // Obj que será add no Hook custosImportacao []

    const costValue = [
      {
        custoTaxImport: custoTaxaImportacao && custoTaxaImportacao.toFixed(2),
        custoTaxaIcms: custoTaxaIcms && custoTaxaIcms.toFixed(2),
        custoTaxaIof: custoTaxaIof && custoTaxaIof.toFixed(2),
        valorTotalTributos: valorTotalTributos && valorTotalTributos.toFixed(2),
        valorTotalCompra: valorTotalCompra && valorTotalCompra.toFixed(2),
        valorTotalProduto: valorTotalProduto && valorTotalProduto.toFixed(2),
        taxAlibaba: taxAlibaba && taxAlibaba.toFixed(2),
      },
    ];

    setCustosImportacao((prevCustosImportacao) =>
      prevCustosImportacao.concat(costValue)
    );
  }

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

      {console.log("configTaxBd",configTaxBd)}
    </div>
  );
}
