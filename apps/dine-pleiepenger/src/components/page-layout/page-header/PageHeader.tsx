import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';
import PleiepengerSVG from '../../../svg/pleiepenger';

interface Props {
    title?: string;
    titleTag?: React.ReactNode;
    byline?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<Props> = ({ title = 'Dine pleiepenger', titleTag, byline }) => {
    return (
        <div className="bg-[--a-deepblue-50]">
            <div className="text-left">
                <Heading size="large" level="1">
                    <HStack gap={'6'} align={'center'}>
                        <PleiepengerSVG />
                        <VStack gap="1">
                            {titleTag ? (
                                <HStack align={'center'} gap="4">
                                    <Box className="text-deepblue-800">{title}</Box>
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
