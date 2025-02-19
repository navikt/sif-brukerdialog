import { barnResponseSchema, søkerResponseSchema } from '@navikt/sif-common-api';
import { DeltakerContextProvider } from '../../src/context/DeltakerContext';
import { søker1Mock } from '../../mock/msw/mocks/soker1';
import { deltakelseSchema } from '../../src/api/schemas/deltakelseSchema';
import { deltakelserHarSøkt } from '../../mock/msw/mocks/soker1/deltakelser/harSøkt';
import { barnMock } from '../../mock/msw/mocks/soker1/barnMock';

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
