import { ISODateToDate } from '@navikt/sif-common-utils';
import { Behandlingsstatus } from '../../../server/api-models/Behandlingsstatus';
import { withEmptyPage } from '../../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../../storybook/hooks/withIntl';
import StatusTag from '../../status-tag/StatusTag';
import SakPageHeader from './SakPageHeader';

import type { Meta, StoryObj } from '@storybook/react-vite';
const meta: Meta<typeof SakPageHeader> = {
    component: SakPageHeader,
    title: 'Components/SakPageHeader',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof SakPageHeader>;

export const Default: Story = {
    args: {
        saksnr: '123123',
        pleietrengende: {
            aktørId: '123123123',
            anonymisert: false,
            etternavn: 'Hansen',
            mellomnavn: 'Von',
            fornavn: 'Ola',
            identitetsnummer: '12345678910',
            fødselsdato: ISODateToDate('2022-01-01'),
        },
        titleTag: <StatusTag status={Behandlingsstatus.AVSLUTTET} />,
    },
};
