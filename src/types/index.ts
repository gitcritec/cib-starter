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

export interface PageInfo {
    PAGE_ID: number;
    STATUS: number;
    HEADER: number;
    FOOTER: number;
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

export interface SectionData {
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
    ARTICLES: Article[] | [];
    FILES: FileType[] | [];
    CUSTOMCAMPS: Record<string, unknown> | null;  // Defina um tipo mais específico se conhecer a estrutura
    created_at: string;
    updated_at: string;
}

export interface Article {
    ARTICLE_ID: number;
    AUTHOR: string;
    CATEGORY: number;
    CUSTOMCAMPS: string;
    CUSTOMCAMPSLANGS: string;
    DATE: string;
    DESCRIPTION_SEO: string;
    DESTAQUE: string;
    ID: number;
    LANGUAGE_ID: number;
    NAME_SEO: string;
    ORDER: number;
    STATUS: number;
    TEAMPLATE: string;
    TEXT_2: string;
    TEXT_3: string;
    TEXT_4: string;
    TEXT_5: string;
    TEXT_SEO: string;
    FILES: FileType[] | [];
}

export interface FileType {
    ASSOCIATION: string;
    CODE: string;
    FILE: string;
    FILE_ID: number;
    IMAGENAME: string;
    ISIMAGE: string;
    TYPE: string;
    FULL_URL: string;
}

interface Page {
    pageinfo: PageInfo;
    pagelang: PageLang[];
    sections: SectionData[];
    id: string;
}