export interface Metadata {
    title: string;
    description: string;
    favicon: string;
    url: string;
    keywords: string;
    icons: Array<{
        url: string;
        type: string;
    }>;
    openGraph: {
        title: string;
        siteName: string;
        description: string;
        type: string;
        url: string;
        images: Array<{
            url: string;
        }>;
    };
    twitter: {
        title: string;
        card: string;
        description: string;
        image: string;
        site: string;
    };
}

// export interface MenuItem {
//     MENU_ID: number;
//     PAGE_ID: number;
//     PARENT_ID: number;
//     M_NAME: string;
//     URL: string;
//     MENU_LANG_ID: number;
//     LANGUAGE_ID: number;
//     TITLE_SEO: string;
//     DESCRIPTION_SEO: string;
//     KEYWORDS_SEO: string;
//     STATUS: number;
//     ORDER: number;
// }

export interface PageProps {
    content: {
        title: string;
        description: string;
    };
};

export interface PageApiComplete {
    config: Record<string, string | null>;
    description: string;
    error: string;
    all_menus: MenuLang[];
    menu_lang: MenuLang;
    allLangsActives: Language[];
    lang_id: string;
    lang_slug: string;
    page: Page;
}
export interface ConfigItem {
    COMPANY_ID: string;
    KEY: string;
    VALUE: string | null;  // Assumindo que VALUE pode ser null baseado no seu JSON
}
export interface HeaderProps {
    logo: string;
    menus: MenuLang[];  // Garantindo que o tipo correto seja usado
    allLangsActives: Language[];  // Garantindo que o tipo correto seja usado
    lang_id: string;
}
export interface LanguageSelectorProps {
    allLangsActives: Language[];  // Garantindo que o tipo correto seja usado
    lang_id: string;
}

export interface MenuLang {
    MENU_LANG_ID: string;
    MENU_ID: string;
    LANGUAGE_ID: string;
    M_NAME: string;
    URL: string;
    TITLE_SEO: null;
    DESCRIPTION_SEO: null;
    KEYWORDS_SEO: null;
    created_at: null;
    updated_at: null;
    PARENT_ID: string;
    PAGE_ID: string;
    STATUS: string;
    ORDER: string;
    children: MenuLang[];  // Assuming recursive structure
}

interface Language {
    LANGUAGE_ID: string;
    NAME: string;
    SLUG: string;
    ICON: null;
    URL: string;
    STATUS: string;
}

interface PageInfo {
    PAGE_ID: string;
    STATUS: string;
    HEADER: string;
    FOOTER: string;
    created_at: string;
    updated_at: string;
}

interface PageLang {
    ID: string;
    PAGE_ID: string;
    LANGUAGE_ID: string;
    NAME_SEO: string;
    created_at: string | null;
    updated_at: string | null;
}

interface Section {
    ID: string;
    SECTION_ID: string;
    LANGUAGE_ID: string;
    NAME_SEO: string;
    TEXT_SEO: string | null;
    CUSTOMCAMPSLANGS: Record<string, unknown> | null;  // Defina um tipo mais específico se conhecer a estrutura
    DESIGNATION: string;
    TEAMPLATE: string;
    ORDERBY: string;
    LIMIT: string;
    STATUS: string;
    DESTAQUE: string;
    TYPE: string;
    ITEMID: string | null;
    CUSTOMCAMPS: Record<string, unknown> | null;  // Defina um tipo mais específico se conhecer a estrutura
    created_at: string;
    updated_at: string;
}

interface Page {
    pageinfo: PageInfo;
    pagelang: PageLang[];
    sections: Section[];
    id: string;
}