import { TranslationItem } from '@/types';
import React, { createContext, useContext, useState } from 'react';

// Define um valor padrão para o contexto
const defaultValue = {
    translate: [] as TranslationItem[], // Suponha um valor inicial vazio para 'translate'
    // setTranslate: () => { } // Uma função noop para 'setTranslate'
};

// Criação do Contexto com um valor padrão
const TranslateContext = createContext(defaultValue);

// Provider que será usado para envolver o aplicativo
export const TranslateProvider = ({ children, initialTranslate }) => {
    const [translate] = useState(initialTranslate);

    return (
        <TranslateContext.Provider value={{ translate }}>
            {children}
        </TranslateContext.Provider>
    );
};

// Hook personalizado para facilitar o acesso ao contexto
export const useTranslate = () => useContext(TranslateContext);
