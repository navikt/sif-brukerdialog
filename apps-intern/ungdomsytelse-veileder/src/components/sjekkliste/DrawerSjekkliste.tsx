import { VStack } from '@navikt/ds-react';
import Sjekkliste from './Sjekkliste';

const SjekklisteDrawer = () => {
    return (
        <VStack paddingBlock="space-0 space-128" paddingInline="space-16 space-24">
            <Sjekkliste visResultat={true} />
        </VStack>
    );
};

export default SjekklisteDrawer;
