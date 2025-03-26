import { BrowserRouter } from 'react-router-dom';
import { DeltakerProvider } from '../../src/context/DeltakerContext';

export const withDeltakerContext = (Story) => {
    return (
        <BrowserRouter>
            <DeltakerProvider deltakerId="213">
                <Story />
            </DeltakerProvider>
        </BrowserRouter>
    );
};
