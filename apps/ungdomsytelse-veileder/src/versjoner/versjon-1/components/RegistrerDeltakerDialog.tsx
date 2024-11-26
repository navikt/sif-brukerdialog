import { Heading, VStack } from '@navikt/ds-react';
import { NyDeltaker } from '../../../api/types';

interface Props {
    nyDeltaker: NyDeltaker;
}

const RegistrerDeltakerDialog = ({ nyDeltaker }: Props) => {
    return (
        <VStack
            className="rounded-md bg-gray-100 p-8 pt-8 pb-8 items-center w-3/4"
            maxWidth={'30rem'}
            style={{ outlineColor: '#AAB0BA' }}>
            <VStack gap="8" className="w-full">
                <Heading level="1" size="medium">
                    Registrer deltaker
                </Heading>
                <>{nyDeltaker.navn.fornavn}</>
            </VStack>
        </VStack>
    );
};

export default RegistrerDeltakerDialog;
