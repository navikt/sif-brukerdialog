import { VeilederProvider } from '../../src/context/VeilederContext';
import { parsedVeilederMock } from '../../mock/msw/mocks/mockUtils';

export const withVeilederContext = (Story) => {
    return (
        <VeilederProvider veileder={parsedVeilederMock}>
            <Story />
        </VeilederProvider>
    );
};
