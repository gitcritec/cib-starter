import { getCookie } from '@/utils/crico';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

export interface MyDocumentProps extends DocumentInitialProps {
    lang: string;  // Definindo a propriedade 'lang' como uma parte das props de Document
}

class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
        const initialProps = await Document.getInitialProps(ctx);
        const lang = getCookie('lang', ctx.req?.headers.cookie) || 'pt';  // Pega o idioma do cookie ou usa 'pt' como padrão

        return { ...initialProps, lang };
    }

    render() {
        return (
            <Html lang={this.props.lang}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
