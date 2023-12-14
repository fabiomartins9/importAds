"use client"; // This is a client component 👈🏽

import React, {useContext } from "react";
import Image from 'next/image';
import {CoinsContext}  from "../../context/coinsContext";
import "./coins.css"


function Coins() {
    const coins =useContext(CoinsContext )

    return (
            <div className="faixa"> {/* Ou substitua para CoinsContext.Provider se desejar aplicar a classe diretamente ao contexto */}
                <ul>
                    <li><Image src="/icons8-eua-48.png" alt='' width={50} height={50} />: {coins.USD}</li>
                    <li><Image src="/icons8-emoji-da-união-europeia-48.png" alt='' width={50} height={50} />: {coins.EUR}</li>
                    <li><Image src="/icons8-emoji-reino-unido-48.png" alt='' width={50} height={50} />: {coins.GBP}</li>
                </ul>
            </div>
           
    )
}

export default Coins;

