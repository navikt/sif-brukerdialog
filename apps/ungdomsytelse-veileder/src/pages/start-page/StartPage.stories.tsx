import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { nyDeltakerMock } from '../../../mock/msw/mocks/data/nyDeltakerMock';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { ThemeProvider } from '../../context/ThemeContext';
import StartPage from './StartPage';

const meta: Meta<typeof StartPage> = {
    component: StartPage,
    title: 'Pages/Startside',
    parameters: {},
    decorators: [
        withPageWidth,
        withDarkBg,
        withIntl,
        withVeilederContext,
        withQueryClientProvider,
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof StartPage>;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const UregistrertDeltaker: Story = {
    render: () => (
        <BrowserRouter>
            <StartPage />
        </BrowserRouter>
    ),
    parameters: {
        msw: {
            handlers: [
                http.post('http://localhost:6006/api/ung-deltakelse-opplyser/oppslag/deltaker', async () => {
                    await delay(200);
                    return HttpResponse.json(nyDeltakerMock.deltakerPersonalia);
                }),
            ],
        },
    },
};
