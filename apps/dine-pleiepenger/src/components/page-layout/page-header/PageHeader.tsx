import { HStack, Heading, VStack } from '@navikt/ds-react';
import PleiepengerSVG from '../../../svg/pleiepenger';

interface Props {
    title?: string;
    byline?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<Props> = ({ title = 'Dine pleiepenger', byline }) => {
    return (
        <div className="bg-[--a-deepblue-50]">
            <div className="text-left">
                <Heading size="large" level="1">
                    <HStack gap={'6'} align={'center'}>
                        <PleiepengerSVG />
                        <VStack gap="1">
                            <span className="text-deepblue-800">{title}</span>
                            {byline}
                        </VStack>
                    </HStack>
                </Heading>
            </div>
        </div>
    );
};

export default PageHeader;
