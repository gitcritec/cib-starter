import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const path = url.pathname.split('/')[1];  // Pega a primeira parte do path

    const localeMap: { [key: string]: string | undefined } = {
        home: 'en',
        inicio: 'pt'
    };

    // Verifica se o path é um dos específicos e ajusta o locale
    const locale = localeMap[path];
    if (locale) {
        // Em vez de modificar o `request.nextUrl.locale`, vamos usar headers
        const response = NextResponse.next();
        response.headers.set('x-locale', locale); // Define o locale no header
        return response;
    }

    // Redirecionamento para /home ou /inicio da raiz (/) baseado no idioma do navegador
    if (url.pathname === '/') {
        const defaultLocale = 'en';  // Define inglês como idioma padrão
        const browserLocale = request.headers.get('accept-language')?.startsWith('pt') ? 'pt' : defaultLocale;
        url.pathname = browserLocale === 'pt' ? '/inicio' : '/home';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}