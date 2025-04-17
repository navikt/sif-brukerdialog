import { BrowserRouter } from 'react-router-dom';
import { DeltakerProvider } from '../../src/context/DeltakerContext';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../mock/msw/mocks/mockUtils';

export const withDeltakerContext = (Story) => {
    return (
        <BrowserRouter>
            <DeltakerProvider deltaker={parsedMockDeltaker} deltakelser={[parsedMockDeltakelse]}>
                <Story />
            </DeltakerProvider>
        </BrowserRouter>
    );
};
