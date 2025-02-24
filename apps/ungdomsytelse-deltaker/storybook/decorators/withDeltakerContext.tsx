import { barnResponseSchema, søkerResponseSchema } from '@navikt/sif-common-api';
import { deltakelseSchema } from '@navikt/ung-common';
import { søker1Mock } from '../../mock/msw/mocks/soker1';
import { barnMock } from '../../mock/msw/mocks/soker1/barnMock';
import { deltakelserHarSøkt } from '../../mock/msw/mocks/soker1/deltakelser/harSøkt';
import { DeltakerContextProvider } from '../../src/context/DeltakerContext';

export const withDeltakerContext = (Story) => {
    const søker = søkerResponseSchema.parse(søker1Mock);
    const deltakelse = deltakelseSchema.parse(deltakelserHarSøkt[0]);
    const barn = barnResponseSchema.parse(barnMock).barn;
    return (
        <DeltakerContextProvider søker={søker} deltakelse={deltakelse} barn={barn}>
            <Story />
        </DeltakerContextProvider>
    );
};
