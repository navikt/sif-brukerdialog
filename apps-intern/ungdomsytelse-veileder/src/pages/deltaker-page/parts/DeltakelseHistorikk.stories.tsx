import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@navikt/ds-react';
import { http, HttpResponse } from 'msw';
import { registrertDeltakerMock } from '../../../../mock/data/registrertDeltakerMock';
import { mockUtils } from '../../../../mock/msw/mockUtils';
import { withDarkBg } from '../../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';
import DeltakelseHistorikk from './DeltakelseHistorikk';

const meta: Meta<typeof DeltakelseHistorikk> = {
    component: DeltakelseHistorikk,
    title: 'Components/Deltakelsehistorikk',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof DeltakelseHistorikk>;

export const Varianter: Story = {
    name: 'Deltakelse historikk',
    render: () => (
        <VStack gap="space-16">
            <DeltakelseHistorikk deltakelseId={registrertDeltakerMock.deltakelse.id} />
        </VStack>
    ),
    parameters: {
        msw: {
            handlers: [
                http.get('**/veileder/register/deltakelse/:deltakelseId/historikk', async ({ params }) => {
                    const { deltakelseId } = params;
                    const data = mockUtils.getDeltakelseHistorikk(deltakelseId as string);
                    return data ? HttpResponse.json(data) : HttpResponse.error();
                }),
            ],
        },
    },
};
