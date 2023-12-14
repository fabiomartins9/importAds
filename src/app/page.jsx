'use client'

import React from 'react';
import HeaderComponent from '../../components/header/header';
import FooterComponent from '../../components/footer/footer'
import ImpotPage from './importPage/page';
import CoinsProvider from '../../context/coinsContext';

const Home = () => {
  
  return (
   <div>
      <CoinsProvider>
      <HeaderComponent/>
        <ImpotPage/>
      <FooterComponent/>
      </CoinsProvider>
      
    </div>
  );
};
export default Home;