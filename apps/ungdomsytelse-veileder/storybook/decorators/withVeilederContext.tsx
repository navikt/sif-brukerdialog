import { ThemeProvider } from '../../src/context/ThemeContext';
import { VeilederProvider } from '../../src/context/VeilederContext';

export const withVeilederContext = (Story) => {
    return (
        <VeilederProvider>
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        </VeilederProvider>
    );
};
