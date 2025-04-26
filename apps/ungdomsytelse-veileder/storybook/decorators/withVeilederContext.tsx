import { VeilederProvider } from '../../src/context/VeilederContext';
import { DevProvider } from '../../src/dev-components/dev-context/DevContext';

export const withVeilederContext = (Story) => {
    return (
        <VeilederProvider>
            <DevProvider>
                <Story />
            </DevProvider>
        </VeilederProvider>
    );
};
