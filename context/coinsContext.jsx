"use client"; // This is a client component 👈🏽


import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';



export const CoinsContext = createContext();

function CoinsProvider({ children }) {
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
        <CoinsContext.Provider value={moedas}> {/* Fornecendo os valores de moedas */}            
            {children}
        </CoinsContext.Provider>
    )
}

export default CoinsProvider;

