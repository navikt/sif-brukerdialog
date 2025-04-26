import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import StartPage from './StartPage';
import { BrowserRouter } from 'react-router-dom';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { http, HttpResponse } from 'msw';
import { nyDeltakerMock } from '../../../mock/msw/mocks/mockUtils';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { DevProvider } from '../../dev-components/dev-context/DevContext';

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
            <DevProvider>
                <Story />
            </DevProvider>
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
                    return HttpResponse.json(nyDeltakerMock);
                }),
            ],
        },
    },
};
