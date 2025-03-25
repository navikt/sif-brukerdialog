import { ReactElement } from 'react';
import { DecoratorComponentsReact, DecoratorEnvProps, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import 'node-fetch';

const decoratorEnv = (process.env.NEXT_PUBLIC_DEKORATOR_ENV ?? 'prod') as Exclude<
    DecoratorEnvProps['env'],
    'localhost'
>;

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content;
};

interface Props {
    Decorator: DecoratorComponentsReact;
    language: string;
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx);
        const Decorator = await fetchDecoratorReact({
            env: decoratorEnv,
            params: {
                simple: false,
                chatbot: true,
                feedback: true,
                context: 'privatperson',
            },
        });

        const language = getDocumentParameter(initialProps, 'lang');

        return { ...initialProps, Decorator, language };
    }

    render(): ReactElement {
        const { Decorator, language } = this.props;
        const showDecorator = true;
        return (
            <Html lang={language || 'no'}>
                <style>@layer base, dekorator-utilities, dekorator-base, components, utilities;</style>
                <Head>{showDecorator && <Decorator.HeadAssets />}</Head>
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
