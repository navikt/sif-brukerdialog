import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { http, HttpResponse } from 'msw';
import { registrertDeltakerScenario } from '../../../mock/scenarioer/registrertDeltaker';
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
            initialEntries={[`/deltaker/${registrertDeltakerScenario.deltakerPersonalia!.id}`]}>
            <AppRoutes />
        </MemoryRouter>
    ),
    parameters: {
        msw: {
            handlers: [
                http.get('http://localhost:6006/api/ung-deltakelse-opplyser/oppslag/deltaker/*', async () => {
                    await delay(5);
                    return HttpResponse.json(registrertDeltakerScenario.deltakerPersonalia);
                }),
                http.get(
                    `http://localhost:6006/api/ung-deltakelse-opplyser/veileder/register/deltaker/${registrertDeltakerScenario.deltakerPersonalia!.id}/deltakelser`,
                    async () => {
                        await delay(5);
                        return HttpResponse.json([registrertDeltakerScenario.deltakelse]);
                    },
                ),
                http.get(
                    `http://localhost:6006/api/ung-deltakelse-opplyser/veileder/register/deltakelse/${registrertDeltakerScenario.deltakelse!.id}/historikk`,
                    async () => {
                        await delay(5);
                        return HttpResponse.json(registrertDeltakerScenario.historikk);
                    },
                ),
            ],
        },
    },
};
