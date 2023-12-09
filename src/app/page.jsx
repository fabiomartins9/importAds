'use client'

import React from 'react';
import HeaderComponent from '../../components/header/header';
import FooterComponent from '../../components/footer/footer'
import ImpotPage from './importPage/page';

const Home = () => {
  
  return (
   <div>
      <HeaderComponent/>
        <ImpotPage/>
      <FooterComponent/>
      
    </div>
  );
};
export default Home;