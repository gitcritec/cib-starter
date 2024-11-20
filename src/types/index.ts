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
export interface FooterProps {
    menus: MenuLang[];  // Garantindo que o tipo correto seja usado
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
    FORM: FormDataInputs | null;
    CUSTOMCAMPS: Record<string, unknown> | null;  // Defina um tipo mais específico se conhecer a estrutura
    created_at: string;
    updated_at: string;
}

export interface SectionDataObject {
    sectionData: SectionData;
}

export interface SendFormData {
    [key: string]: string | number | boolean | undefined; // Adapte conforme necessário
    recaptchaToken?: string;
}
interface FormDataInputs {
    FORM_ID: number;
    NAME: string;
    SUBJECT: string;
    CLASSES: string;
    EMAILS: string;
    STATUS: number;
    created_at: null;
    updated_at: null;
    BUTTON: string;
    FORM_FIELDS: FormField[];
}

export interface FormField {
    FORM_ITEM_ID: number;
    FORM_ID: number;
    CAMP: string;
    TYPE: string;
    ROWS: null;
    WEB_KEY: null;
    SECRET_KEY: null;
    CUSTOM_CLASS: null;
    FILE_LIMIT: null;
    FILE_EXT: null;
    IS_SUBJECT: number;
    IS_EMAIL: number;
    REQUIRED: number;
    STATUS: number;
    EMAIL_TEMPLATE: number;
    ORDER: number;
    created_at: null;
    updated_at: null;
    FORM_ITEM_LANG_ID: number;
    LANGUAGE_ID: number;
    LABEL: string;
    PLACEHOLDER: null;
    CAMPS_VALUES: null;
    CAMPS_VALUE: CampsValue[];
}

export interface CampsValue {
    CAMPS_VALUES_ID: number;
    FORM_ITEM_LANG_ID: number;
    LABEL: string;
    VALUE: string;
    created_at: null;
    updated_at: null;
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

export interface Article {
    ARTICLE_ID: number;
    CATEGORY: number;
    TEAMPLATE: string;
    STATUS: number;
    DATE: string;
    AUTHOR: string;
    DESTAQUE: string;
    ORDER: number;
    CUSTOMCAMPS: string;
    created_at: string;
    updated_at: string;
    ID: number;
    LANGUAGE_ID: number;
    NAME_SEO: string;
    TEXT_SEO: string;
    TEXT_2: string;
    TEXT_3: string;
    TEXT_4: string;
    TEXT_5: string;
    DESCRIPTION_SEO: string;
    CUSTOMCAMPSLANGS: string;
    FILES: FileType[] | [];
}
