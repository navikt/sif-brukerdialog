import { BodyShort, Heading, Hide, HStack, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import PleiepengerSVG from '../../../svg/pleiepenger';

interface Props {
    title?: string;
    titleTag?: React.ReactNode;
    byline?: React.ReactNode;
    documentTitle?: string;
    hidePleiepengerIcon?: boolean;
}

const PageHeader = ({
    title = 'Dine pleiepenger for sykt barn',
    titleTag,
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
            <div className="text-left">
                <HStack gap="6" align="center">
                    <Hide hidden={hidePleiepengerIcon}>
                        <div className="hidden md:block">
                            <PleiepengerSVG />
                        </div>
                    </Hide>
                    <VStack gap="2">
                        {titleTag ? (
                            <HStack gap="4" align="center">
                                <Heading size="large" level="1" className=" mr-4">
                                    {title}
                                </Heading>
                                <BodyShort as="div">{titleTag}</BodyShort>
                            </HStack>
                        ) : (
                            <Heading size="large" level="1">
                                {title}
                            </Heading>
                        )}
                        {byline}
                    </VStack>
                </HStack>
            </div>
        </div>
    );
};

export default PageHeader;
