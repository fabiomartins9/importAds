"use client"; // This is a client component 👈🏽

import React, { useState, useEffect, useContext, useRef } from "react";
import "./page.css";

import { Col, Row, Form, Button, InputNumber, Input, Card } from "antd";
import CascaderUF from "../../../components/cascader/cascader_uf";
import TableResult from "../../../components/table/table";
import { CoinsContext } from "../../../context/coinsContext";
import { firebase } from "../../../utils/firebase";
import "firebase/firestore";

export default function ImpotPage() {
  const [icms, setIcms] = useState(0);
  const [precoReal, setPrecoReal] = useState(0);
  const [precoInvoice, setPrecoInvoice] = useState(0);
  const [frete, setFrete] = useState(0);

  const [configTaxBd, setConfigTaxBd] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Hook Obj resultados dos calculos
  const [custosImportacao, setCustosImportacao] = useState([]);

  const coins = useContext(CoinsContext);
  const [defaultValueSet, setDefaultValueSet] = useState(false);

  const [cotacao, setCotacao] = useState(coins.USD || "");
  const formRef = useRef(); // Crie uma referência para o formulário

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

        let taxValues = []; // Objeto para armazenar os valores

        snapshot.forEach((doc) => {
          const taxData = {
            importFee: doc.data().importFee,
            iof: doc.data().iof,
            currierFee: doc.data().currierFee,
          };

          taxValues.push(taxData);
        });

        setConfigTaxBd(taxValues);
        // Atualiza cotacao com o valor mais recente de coins.USD
        if (coins.USD !== 0 && !defaultValueSet) {
          formRef.current.setFieldsValue({ cotacao: coins.USD });
          setDefaultValueSet(true); // Define que o defaultValue foi configurado
        }
      });
    }

    getTax();

    const interval = setInterval(getTax, 60000);

    return () => clearInterval(interval);
  }, [coins.USD, defaultValueSet]);

  const handleFormChange = () => {
    const values = formRef.current.getFieldsValue(); // Obtenha os valores dos campos do formulário
    setPrecoReal(values.valorCheio);
    setPrecoInvoice(values.valorDeclarado);
    setFrete(values.frete);
    setCotacao(parseFloat(values.cotacao));
    setName(values.name);
    setDate(values.date);
    console.log("values: ", values)
  };

  function calcular(precoReal, precoInvoice, freteUsd) {
    try{
    // Verifica se as variáveis são números e existem
    if (
      typeof precoReal === "number" &&
      typeof precoInvoice === "number" &&
      typeof freteUsd === "number" &&
      typeof cotacao === "number" &&
      !isNaN(precoReal) &&
      !isNaN(precoInvoice) &&
      !isNaN(freteUsd) &&
      !isNaN(cotacao) &&
      configTaxBd.length > 0 // Verifica se configTaxBd possui pelo menos um elemento
    ) {
      const taxaImportacao = configTaxBd[0].importFee;
      const taxaIof = configTaxBd[0].iof;
      const taxaIcms = icms;
      const currierFee = configTaxBd[0].currierFee;

      // convertendo valores prod e ship em real
      const valorProdutoInvoiceBrl = precoInvoice * cotacao;
      const valorFreteBrl = freteUsd * cotacao;

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
        valorProdutoInvoiceMaisFreteBrl + valorTotalTributos;

      const valorTotalProduto =
      valorProdutoInvoiceMaisFreteBrl + (precoReal * cotacao);

      // Obj que será add no Hook custosImportacao []
      const costValue = [
        {
          name: name,
          date: date,
          custoTaxImport: custoTaxaImportacao && custoTaxaImportacao.toFixed(2),
          custoTaxaIcms: custoTaxaIcms && custoTaxaIcms.toFixed(2),
          custoTaxaIof: custoTaxaIof && custoTaxaIof.toFixed(2),
          valorTotalTributos:
            valorTotalTributos && valorTotalTributos.toFixed(2),
          valorTotalCompra: valorTotalCompra && valorTotalCompra.toFixed(2),
          valorTotalProduto: valorTotalProduto && valorTotalProduto.toFixed(2),
          cotacao:cotacao,
          
        },
      ];
        
      setCustosImportacao((prevCustosImportacao) =>
        prevCustosImportacao.concat(costValue)
      );
    }
  else{
    console.log("Erro! importPage")
  }} catch(e){
        console.log("Error: ", e)
    } 
  }

  // Função que será chamada quando um item for selecionado no CascaderUF
  const handleSelect = (value, selectedOptions) => {
    setIcms(selectedOptions);
  };

  return (
    <div className="container">
      <div className="Col-form">
        <Col className="Col-form-ant" span={8}>
          <Row className="row-import-pages">
            <Card className="card-form">
              <Form ref={formRef} onValuesChange={handleFormChange}>
                {/* ref para referenciar o formulário */}
                <Form.Item label="Nome:" name="name">
                  <Input style={{ width: "80%" }} />
                </Form.Item>
                <Form.Item label="Data:" name="date">
                  <Input style={{ width: "80%" }} />
                </Form.Item>
                <Form.Item label="UF:">
                  <CascaderUF onSelect={handleSelect} />
                  {/* Passando a função handleSelect como onSelect */}
                  <br />
                  <span>Valor da aliquota: {icms}%</span>
                </Form.Item>
                <Form.Item label="Cotação: " name="cotacao">
                  <InputNumber placeholder="Cotação" min={1} />
                </Form.Item>
                <Form.Item label="Valor Cheio:" name="valorCheio">
                  <InputNumber
                    placeholder="Valor pago fornecedor"
                    style={{ width: "80%" }}
                    min={1}
                  />
                </Form.Item>
                <Form.Item label="Valor declarado:" name="valorDeclarado">
                  <InputNumber
                    placeholder="Valor invoice"
                    style={{ width: "80%" }}
                    min={1}
                  />
                </Form.Item>
                <Form.Item label="Frete:" name="frete">
                  <InputNumber
                    placeholder="Valor frete pago"
                    style={{ width: "80%" }}
                    min={1}
                  />
                </Form.Item>
                <span>*Considerar o valor do frete cheio pago</span>
                <Form.Item>
                  <br />
                  <div className="button-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        calcular(precoReal, precoInvoice, frete);
                      }}
                    >
                      Calcular
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setCustosImportacao([])}
                    >
                      Limpar
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Row>
        </Col>
        <Col className="Col-table-antd" span={16}>
          <Row id="table">
            
            <TableResult dataSource={[...custosImportacao]} />
            
          </Row>
        </Col>
       
      </div>
    </div>
  );
}
