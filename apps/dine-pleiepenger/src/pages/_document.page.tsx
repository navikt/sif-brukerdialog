import { ReactElement } from 'react';
import { DecoratorComponents, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
// This is imported to allow the Output File Tracing feature of Next.js to work correctly with the log patcher
import 'next-logger';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { browserEnv, getServerEnv } from '../utils/env';

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string): string => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content;
};

function createDecoratorEnv(ctx: DocumentContext): 'dev' | 'prod' {
    if (ctx.pathname === '/500' || ctx.pathname === '/404' || process.env.NODE_ENV === 'development') {
        // Blir statisk kompilert i GHA så må hentes defra
        return 'prod';
    }

    switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'local':
        case 'test':
        case 'dev':
            return 'dev';
        case 'production':
            return 'prod';
        default:
            throw new Error(
                `Unknown runtime environment: ${browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT} - ${JSON.stringify(
                    browserEnv,
                )} - ${process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT}`,
            );
    }
}

interface Props {
    Decorator: DecoratorComponents;
    language: string;
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx);
        const serverEnv = getServerEnv();
        const Decorator = await fetchDecoratorReact({
            env: createDecoratorEnv(ctx),
            params: {
                chatbot: true,
                context: 'privatperson',
                breadcrumbs: [
                    { url: serverEnv.NEXT_PUBLIC_MIN_SIDE_URL, title: 'Min side' },
                    { url: serverEnv.NEXT_PUBLIC_BASE_PATH, title: 'Dine pleiepenger' },
                ],
            },
        });

        const language = getDocumentParameter(initialProps, 'lang');

        return { ...initialProps, Decorator, language };
    }

    render(): ReactElement {
        const { Decorator, language } = this.props;

        return (
            <Html lang={language || 'no'}>
                <Head>
                    <Decorator.Styles />
                    <link
                        rel="preload"
                        href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body className="bg-[--a-deepblue-50]">
                    <Decorator.Header />
                    <Main />
                    <Decorator.Footer />
                    <Decorator.Scripts />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
