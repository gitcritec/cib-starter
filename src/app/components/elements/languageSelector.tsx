import { LanguageSelectorProps } from '@/types';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


const LanguageSelector = ({ allLangsActives, lang_id }: LanguageSelectorProps) => {
 
    const [selectedLanguage, setSelectedLanguage] = useState(lang_id);
    const router = useRouter();
    const pathname = usePathname();
    const parts = pathname ? pathname.split('/').filter(part => part !== '') : [];
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLangID = event.target.value;
        setSelectedLanguage(selectedLangID);
        
        // Encontra o idioma selecionado no array e redireciona para a URL correspondente
        const language = allLangsActives.find(lang => lang.LANGUAGE_ID === selectedLangID);
        if (language && language.URL) {
            const newPath = `/${language.URL}/${parts.slice(1).join('/')}`.replace(/\/$/, '');  // Remove a barra final se houver
            router.push(newPath);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">Select Language</label>
            <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {allLangsActives.map(lang => (
                    <option key={lang.LANGUAGE_ID} value={lang.LANGUAGE_ID}>
                        {lang.NAME}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
