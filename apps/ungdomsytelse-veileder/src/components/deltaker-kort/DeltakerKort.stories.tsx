import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import DeltakerKort from './DeltakerKort';
import { BrowserRouter } from 'react-router-dom';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { http, HttpResponse } from 'msw';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { nyDeltakerMock } from '../../../mock/msw/mocks/ny-deltaker-mock/data';

const meta: Meta<typeof DeltakerKort> = {
    component: DeltakerKort,
    title: 'Components/Deltakerkort',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof DeltakerKort>;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const UregistrertDeltaker: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort
                deltaker={{
                    deltakerIdent: '56857102105',
                    fødselsdato: ISODateToDate('2000-01-01'),
                    registrert: false,
                    navn: {
                        fornavn: 'Ola',
                        mellomnavn: 'Nordmann',
                        etternavn: 'Nordmann',
                    },
                    førsteMuligeInnmeldingsdato: ISODateToDate('2023-01-01'),
                    sisteMuligeInnmeldingsdato: ISODateToDate('2023-12-31'),
                }}
            />
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
