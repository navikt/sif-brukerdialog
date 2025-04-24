import { VeilederProvider } from '../../src/context/VeilederContext';
import { ToDoProvider } from '../../src/dev-components/ToDo/ToDoContext';

export const withVeilederContext = (Story) => {
    return (
        <VeilederProvider>
            <ToDoProvider>
                <Story />
            </ToDoProvider>
        </VeilederProvider>
    );
};
