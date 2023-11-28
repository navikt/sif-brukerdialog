import { HStack, Heading } from '@navikt/ds-react';
import PleiepengerSVG from '../../../svg/pleiepenger';

const PageHeader = () => {
    return (
        <div className="bg-[--a-deepblue-50]">
            <div className="text-left">
                <Heading size="large" level="1">
                    <HStack gap={'6'} align={'center'}>
                        <PleiepengerSVG />
                        <span className="text-deepblue-800">Dine Pleiepenger</span>
                    </HStack>
                </Heading>
            </div>
        </div>
    );
};

export default PageHeader;
