import type { Preview } from '@storybook/react-vite';
import '../src/app.css';

import { getDevAppSettings } from '../mock/devAppSettings';

if (typeof window !== 'undefined') {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/json';
    scriptElement.id = 'nav:appSettings';
    scriptElement.textContent = JSON.stringify(getDevAppSettings());
    document.head.appendChild(scriptElement);
}

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        options: {
            storySort: {
                method: 'alphabetical',
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
