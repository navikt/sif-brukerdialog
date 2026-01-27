import { Heading, HStack, Show, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import PleiepengerSVG from '../../../svg/PleiepengerSVG';

interface Props {
    title?: string;
    byline?: React.ReactNode;
    documentTitle?: string;
    hidePleiepengerIcon?: boolean;
}

const PageHeader = ({
    title = 'Dine pleiepenger for sykt barn',
    byline,
    documentTitle,
    hidePleiepengerIcon,
}: Props) => {
    return (
        <div>
            {documentTitle ? (
                <Head>
                    <title>{documentTitle}</title>
                </Head>
            ) : null}
            <div>
                <HStack gap="space-24" align="center">
                    {hidePleiepengerIcon ? null : (
                        <Show above="md">
                            <PleiepengerSVG />
                        </Show>
                    )}
                    <VStack gap="space-8">
                        <Heading size="large" level="1">
                            {title}
                        </Heading>
                        {byline}
                    </VStack>
                </HStack>
            </div>
        </div>
    );
};

export default PageHeader;
