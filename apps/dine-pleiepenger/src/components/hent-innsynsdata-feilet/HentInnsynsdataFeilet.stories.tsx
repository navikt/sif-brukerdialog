import { AxiosError } from 'axios';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import HentInnsynsdataFeilet from './HentInnsynsdataFeilet';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof HentInnsynsdataFeilet> = {
    component: HentInnsynsdataFeilet,
    title: 'Components/HentInnsynsdataFeilet',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof HentInnsynsdataFeilet>;

export const Default: Story = {
    name: 'Bruker har ikke tilgang',
    args: {
        error: { response: { status: 403 } } as AxiosError,
    },
};

export const OtherError: Story = {
    name: 'Alle andre feil',
    args: {
        error: { response: { status: 500 } } as AxiosError,
    },
};
