import '../app/globals.css'

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { fetchPageData } from '@/utils/api';
import { Metadata, PageApiComplete, PageInfo, SectionData } from "@/types";
import Header from '@/app/components/layouts/header';
import Footer from '@/app/components/layouts/footer';
import Section from '@/app/components/layouts/section';

interface DynamicPageProps {
    content: PageApiComplete;
    metadata: Metadata;
}

export default function DynamicPage({ content, metadata }: DynamicPageProps) {
    const pageInfo: PageInfo = content.page.pageinfo;
    const page = content.page;

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href={metadata.favicon} type="image/x-icon" />
                <meta name="keywords" content={metadata.keywords} />
                <link rel="canonical" href={metadata.url} />
                {/* Open Graph tags */}
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
                <meta property="og:type" content={metadata.openGraph.type} />
                <meta property="og:url" content={metadata.openGraph.url} />
                <meta property="og:site_name" content={metadata.openGraph.siteName} />
                <meta property="og:image" content={metadata.openGraph.images[0].url} />
                {/* Twitter Card tags */}
                <meta name="twitter:card" content={metadata.twitter.card} />
                <meta name="twitter:title" content={metadata.twitter.title} />
                <meta name="twitter:description" content={metadata.twitter.description} />
                <meta name="twitter:image" content={metadata.twitter.image} />
                <meta name="twitter:site" content={metadata.twitter.site} />
            </Head>
            {pageInfo.HEADER == 1 &&
                <Header
                    logo={content.config.LOGO || 'defaultLogo.png'}
                    menus={content.all_menus || {}}
                    allLangsActives={content.allLangsActives || {}}
                    lang_id={content.lang_id}
                />
            }

            {
                page.sections &&
                page.sections.map((section: SectionData) => (
                    <Section
                        key={section.SECTION_ID}
                        sectionData={section}
                    />
                ))
            }

            {pageInfo.FOOTER == 1 && <Footer />}
        </>
    );
}

// Função para gerar metadados baseados nos dados da página
async function generateMetadata(pageData: PageApiComplete) {

    const companyConfig = pageData.config;

    const title = !companyConfig.NAME
        ? "Change Title Name"
        : pageData.menu_lang.TITLE_SEO
            ? `${pageData.menu_lang.TITLE_SEO} - ${companyConfig.NAME}`
            : companyConfig.NAME;

    const description = pageData.menu_lang.DESCRIPTION_SEO || "Default Description";
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${pageData.menu_lang.URL}`;

    // URL padrão para favicon, com fallback para um favicon local se não estiver disponível
    const faviconUrl = companyConfig.FAVICON ? `${companyConfig.FAVICON}` : "../favicon.ico";

    // Montando a base dos metadados
    const metadata = {
        title: title,
        description: description,
        favicon: faviconUrl,
        url: url,
        keywords: pageData.menu_lang.KEYWORDS_SEO || "default, keywords",
        icons: [
            {
                url: faviconUrl,
                type: "image/x-icon"
            }
        ],
        openGraph: {
            title: title,
            siteName: title,
            description: description,
            type: "website",
            url: url,
            images: [
                {
                    url: 'path/to/default/og-image.jpg'
                }
            ]
        },
        twitter: {
            title: title,
            card: 'summary_large_image',
            description: description,
            image: 'path/to/default/twitter-image.jpg',
            site: url
        }
    };

    return metadata;

}

// Utilizando SSR com getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, res } = context;

    if (!params || !params.slug || !(params.slug instanceof Array)) {
        return { notFound: true };
    }

    const slugArray = params.slug;
    const pageSlug = slugArray[0];  // 'inicio'
    const idElement = slugArray[1]; // '5'
    const name = slugArray.length > 2 ? slugArray[2] : undefined; // '5'

    const content = await fetchPageData(pageSlug, idElement, name);

    // Verifica se há um erro e retorna um status 404
    if (!content || Number(content.error) === 1) {
        return { notFound: true };
    }
    // Configura um cookie com o idioma
    res.setHeader('Set-Cookie', `lang=${content.lang_slug}; path=/; max-age=86400; SameSite=Lax`);

    // Usa os dados da página para gerar os metadados
    const metadata = await generateMetadata(content);
    console.log(content.page.sections);
    return {
        props: {
            content: content,
            metadata: metadata,
        },
    };

};