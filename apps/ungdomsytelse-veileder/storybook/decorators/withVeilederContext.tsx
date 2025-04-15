import { VeilederProvider } from '../../src/context/VeilederContext';

export const withVeilederContext = (Story) => {
    return (
        <VeilederProvider>
            <Story />
        </VeilederProvider>
    );
};
