import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { firebase } from '../../utils/firebase';
import 'firebase/firestore';

const CascaderUF = ({ onSelect }) => {
  const [options, setOptions] = useState([]);

  const fetchDataFromFirestore = async () => {
    try {
      const firestore = firebase.firestore();
      const querySnapshot = await firestore.collection('icms').get();

      const data = querySnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.id,
      }));

      setOptions(data);
      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar dados do Firestore:', error);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const onChange = async (value) => {
    if(value != undefined){
    const selectedUF = value[0]; // Assume-se que estamos selecionando apenas um UF
    
    // Recupere o valor do ICMS associado ao UF selecionado
    const firestore = firebase.firestore();
    const icmsDoc = await firestore.collection('icms').doc(selectedUF).get();
    const valorIcms = icmsDoc.data().valor_icms;

    // Passe o valor do ICMS selecionado para o componente pai através da função onSelect
    onSelect(selectedUF, valorIcms);
  }
  };

  return (
    <Cascader options={options} onChange={onChange} placeholder="Please select" />
  );
};

export default CascaderUF;
