import { DecoratorComponents, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import 'node-fetch';

function createDecoratorEnv(ctx: DocumentContext): 'dev' | 'prod' {
    if (ctx.pathname === '/500' || ctx.pathname === '/404' || process.env.NODE_ENV === 'development') {
        // Blir statisk kompilert i GHA så må hentes defra
        return 'prod';
    }

    switch (process.env.NEXT_PUBLIC_DEKORATOR_ENV) {
        case 'local':
        case 'test':
        case 'dev':
            return 'dev';
        case 'production':
            return 'prod';
        default:
            throw new Error(
                `Unknown runtime environment: ${process.env.NEXT_PUBLIC_DEKORATOR_ENV} - ${process.env.NEXT_PUBLIC_DEKORATOR_ENV}`,
            );
    }
}
// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content;
};

interface Props {
    Decorator: DecoratorComponents;
    language: string;
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx);
        const Decorator = await fetchDecoratorReact({
            env: createDecoratorEnv(ctx),
            params: {
                chatbot: true,
                context: 'privatperson',
                breadcrumbs: [
                    { url: '/minside', title: 'Min side' },
                    { url: '/dine-pleiepenger', title: 'Dine pleiepenger' },
                ],
            },
        });

        const language = getDocumentParameter(initialProps, 'lang');

        return { ...initialProps, Decorator, language };

        // const initialProps = await Document.getInitialProps(ctx);

        // const Decorator = await fetchDecoratorReact({
        //     env: decoratorEnv,
        //     simple: false,
        //     chatbot: false,
        //     feedback: false,
        //     urlLookupTable: false,
        // });

        // const language = getDocumentParameter(initialProps, 'lang');

        // return { ...initialProps, Decorator, language };
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props;
        const showDecorator = true;
        return (
            <Html lang={language || 'no'}>
                <Head>{showDecorator && <Decorator.Styles />}</Head>
                <body>
                    {showDecorator && <Decorator.Header />}
                    <Main />
                    {showDecorator && (
                        <>
                            <Decorator.Footer />
                            <Decorator.Scripts />
                        </>
                    )}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
