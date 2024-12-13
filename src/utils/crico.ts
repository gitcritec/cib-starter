import { MenuLang, TranslationItem } from "@/types";

// Função para buscar os filhos de um item de menu específico até um certo nível de profundidade
export function fetchMenuChildren(menus: MenuLang[], menuId: number): MenuLang[] {

    for (const menu of menus) {
        if (menu.MENU_ID === menuId) {
            // Retorna os filhos do menu se for o nível correto e tem filhos
            return menu.children;
        } 
    }
    return [];  // Retorna vazio se não encontrar nada
}

export function filterTranslateSystem(allTranslates: TranslationItem[], key: string): string {
    for (const translate of allTranslates) {
        if (translate.KEY === key) {
            return translate.TRANSLATION;  // Retorna a tradução diretamente quando encontra
        }
    }
    return '';  // Retorna vazio se não encontrar nada
}



export function getCookie(cookieName: string, cookieHeader: string | undefined): string | null {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=').map(part => part.trim());
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {} as Record<string, string>);

    return cookies[cookieName] || null;
}