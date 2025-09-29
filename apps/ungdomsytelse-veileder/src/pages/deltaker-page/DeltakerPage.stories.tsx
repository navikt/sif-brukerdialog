import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { http, HttpResponse } from 'msw';
import { registrertDeltakerMock } from '../../../mock/data/registrertDeltakerMock';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import AppRoutes from '../../AppRoutes';
import { ThemeProvider } from '../../context/ThemeContext';
import DeltakerPage from './DeltakerPage';

const meta: Meta<typeof DeltakerPage> = {
    component: DeltakerPage,
    title: 'Sider/Deltakerside',
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

type Story = StoryObj<typeof DeltakerPage>;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const RegistrertDeltaker: Story = {
    name: 'Registrert deltaker',
    render: () => (
        <MemoryRouter
            basename={getRequiredEnv('PUBLIC_PATH')}
            initialEntries={['/deltaker/6369f9a3-5a38-4b90-b93a-695fabe8c6f9']}>
            <AppRoutes />
        </MemoryRouter>
    ),
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:6006/api/ung-deltakelse-opplyser/oppslag/deltaker/*', async () => {
                    await delay(5);
                    return HttpResponse.json(registrertDeltakerMock.deltakerPersonalia);
                }),
                http.get(
                    'http://localhost:6006/api/ung-deltakelse-opplyser/veileder/register/deltaker/699b9f97-b0d7-4b78-9b8e-8758feb9e0fd/deltakelser',
                    async () => {
                        await delay(5);
                        return HttpResponse.json([registrertDeltakerMock.deltakelse]);
                    },
                ),
                http.get(
                    'http://localhost:6006/api/ung-deltakelse-opplyser/veileder/register/deltakelse/5e8d1e4c-801c-4d13-8987-abfae3eaaa00/historikk',
                    async () => {
                        await delay(5);
                        return HttpResponse.json(registrertDeltakerMock.deltakelseHistorikk);
                    },
                ),
            ],
        },
    },
};
