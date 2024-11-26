import { VStack } from '@navikt/ds-react';
import HentDeltakerForm from '../forms/HentDeltakerForm';
import { Deltaker, NyDeltaker } from '../../../api/types';

interface Props {
    onDeltakerFetched: (deltaker: Deltaker) => void;
    onNyDeltaker: (deltaker: NyDeltaker) => void;
}
const HentDeltakerDialog = ({ onDeltakerFetched, onNyDeltaker }: Props) => {
    return (
        <VStack className="rounded-md bg-gray-100 p-8 pt-8 pb-8 items-center w-full" maxWidth={'30rem'}>
            <VStack gap="8" className="w-full">
                <HentDeltakerForm onDeltakerFetched={onDeltakerFetched} onNyDeltaker={onNyDeltaker} />
            </VStack>
        </VStack>
    );
};

export default HentDeltakerDialog;
