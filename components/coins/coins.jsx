import React, { useState, useEffect } from "react";
import Image from 'next/image';
import axios from 'axios';
import "./coins.css"


function Coins() {
    const [moedas, setMoedas] = useState({ USD: 0, EUR: 0, GBP: 0 });

    async function loadMoedas() {
        const api = axios.create({
            baseURL: 'https://economia.awesomeapi.com.br'
        });
        try {
            const responseUSD = await api.get('last/USD-BRL');
            const responseEUR = await api.get('last/EUR-BRL');
            const responseGBP = await api.get('last/GBP-BRL');
            
            setMoedas({
                USD: Number(responseUSD.data.USDBRL.high).toFixed(2),
                EUR: Number(responseEUR.data.EURBRL.high).toFixed(2),
                GBP: Number(responseGBP.data.GBPBRL.high).toFixed(2)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadMoedas();
        const interval = setInterval(loadMoedas, 10000);
        return () => clearInterval(interval);
    }, []);

   

    return (
        <div className="faixa">
        <ul>
            <li><Image src="/icons8-eua-48.png" alt='' width={50} height={50}/>: {moedas.USD}</li>
            <li><Image src="/icons8-emoji-da-união-europeia-48.png" alt='' width={50} height={50}/>: {moedas.EUR}</li>
            <li><Image src="/icons8-emoji-reino-unido-48.png" alt='' width={50} height={50}/>: {moedas.GBP}</li>           
        </ul>
        </div>
    )
}

export default Coins;
