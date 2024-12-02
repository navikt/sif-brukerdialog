import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';
import PleiepengerSVG from '../../../svg/pleiepenger';
import Head from 'next/head';

interface Props {
    title?: string;
    titleTag?: React.ReactNode;
    byline?: React.ReactNode;
    documentTitle?: string;
}

const PageHeader: React.FunctionComponent<Props> = ({
    title = 'Dine pleiepenger for sykt barn',
    titleTag,
    byline,
    documentTitle,
}) => {
    return (
        <div className="bg-[--a-deepblue-50]">
            {documentTitle ? (
                <Head>
                    <title>{documentTitle}</title>
                </Head>
            ) : null}
            <div className="text-left">
                <Heading size="large" level="1">
                    <HStack gap={'6'} align={'center'}>
                        <div className="hidden md:block">
                            <PleiepengerSVG />
                        </div>
                        <VStack gap="2">
                            {titleTag ? (
                                <HStack align={'center'}>
                                    <Box className="text-deepblue-800 mr-4">{title}</Box>
                                    <BodyShort as="div">{titleTag}</BodyShort>
                                </HStack>
                            ) : (
                                <Box className="text-deepblue-800">{title}</Box>
                            )}
                            {byline}
                        </VStack>
                    </HStack>
                </Heading>
            </div>
        </div>
    );
};

export default PageHeader;
