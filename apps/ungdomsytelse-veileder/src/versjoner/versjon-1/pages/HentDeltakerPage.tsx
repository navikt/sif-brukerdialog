import { Button, HStack, Page, VStack } from '@navikt/ds-react';
import HentDeltakerForm from '../components/HentDeltakelserForm';
import { veilederService } from '../../../api/services/veilederService';
import { Deltaker } from '../types/Deltaker';

interface Props {
    onDeltakerHentet: (deltaker: Deltaker) => void;
}

const HentDeltakerPage = ({ onDeltakerHentet }: Props) => {
    const onHentDeltaker = async (fnr) => {
        const deltaker = await veilederService.getDeltaker(fnr);
        if (deltaker) {
            onDeltakerHentet(deltaker);
        }
    };
    return (
        <Page className="bg-gray-300">
            <HStack align={'center'} justify={'center'} paddingBlock="20">
                <VStack
                    className="rounded-md bg-gray-100 p-16 pt-8 pb-8 items-center"
                    style={{ outlineColor: '#AAB0BA' }}>
                    <VStack gap="8">
                        <HentDeltakerForm onHentDeltaker={onHentDeltaker} />
                        <HStack gap="2">
                            For test:
                            <HStack gap="2">
                                <Button variant="secondary" size="xsmall" onClick={() => onHentDeltaker('03867198392')}>
                                    03867198392
                                </Button>
                                <Button variant="secondary" size="xsmall" onClick={() => onHentDeltaker('56857102105')}>
                                    56857102105 (ny)
                                </Button>
                            </HStack>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </Page>
    );
};

export default HentDeltakerPage;
