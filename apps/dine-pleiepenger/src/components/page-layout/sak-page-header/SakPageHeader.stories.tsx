import { ISODateToDate } from '@navikt/sif-common-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withEmptyPage } from '../../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../../storybook/hooks/withIntl';
import SakPageHeader from './SakPageHeader';
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
            fødselsdato: ISODateToDate('2022-01-01'),
        },
    },
};
