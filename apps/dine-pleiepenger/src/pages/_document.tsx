import { Components, Env, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import 'node-fetch';

const decoratorEnv = (process.env.NEXT_PUBLIC_DEKORATOR_ENV ?? 'prod') as Exclude<Env, 'localhost'>;

const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content;
};

interface Props {
    Decorator: Components;
    language: string;
}

class Doc extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx);

        const Decorator = await fetchDecoratorReact({
            env: decoratorEnv,
            simple: false,
            chatbot: false,
            feedback: false,
            urlLookupTable: false,
            breadcrumbs: [
                { url: '/minside', title: 'Min side' },
                { url: '/dine-pleiepenger', title: 'Dine pleiepenger' },
            ],
        });

        const language = getDocumentParameter(initialProps, 'lang');

        return { ...initialProps, Decorator, language };
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props;
        const showDecorator = true;
        return (
            <Html lang={language || 'no'}>
                <Head>{showDecorator && <Decorator.Styles />}</Head>
                <body>
                    <div className="bg-[--a-deepblue-50]">
                        {showDecorator && <Decorator.Header />}
                        <Main />
                        {showDecorator && (
                            <>
                                <Decorator.Footer />
                                <Decorator.Scripts />
                            </>
                        )}
                    </div>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Doc;
