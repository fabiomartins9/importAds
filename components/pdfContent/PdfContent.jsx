'use client'

import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const PDFContent = ({ data }) => {
  
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ marginLeft: 10 }}>
        <Image
          src="https://i.imgur.com/7BSgHtq.jpeg"
          alt=""
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />

        {/* Adicionar um cabeçalho com os nomes das colunas */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            fontWeight: "bold",
            marginTop: 40,
          }}
        >
          <Text style={{ width: "20%", fontSize: 8 }}>Nome</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Data</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Custo Tax Import</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Custo Taxa ICMS</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Custo Taxa IOF</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>
            Valor Total Tributos
          </Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Valor Total Compra</Text>
          <Text style={{ width: "10%", fontSize: 8 }}>Valor Total Produto</Text>
          {/* Adicione mais Text para outros nomes de colunas conforme necessário */}
        </View>

        {/* Renderizar os dados da tabela aqui */}
        {data.map((item) => (
          <View
            key={item.key}
            style={{ flexDirection: "row", marginBottom: 5 }}
          >
            <Text style={{ width: "20%", fontSize: 8 }}>{item.name}</Text>
            <Text style={{ width: "10%", fontSize: 8 }}>{item.date}</Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.custoTaxImport}
            </Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.custoTaxaIcms}
            </Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.custoTaxaIof}
            </Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.valorTotalTributos}
            </Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.valorTotalCompra}
            </Text>
            <Text style={{ width: "10%", fontSize: 8 }}>
              {item.valorTotalProduto}
            </Text>
            {/* Adicione mais Text para outros dados conforme necessário */}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PDFContent;
