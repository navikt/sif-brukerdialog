import type { Meta, StoryObj } from '@storybook/react-vite';

import OppsummeringSteg from './OppsummeringSteg';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

const meta: Meta = {
    title: 'Søknad/Steg/Oppsummering',
    parameters: {},
    decorators: [
        withIntl,
        (Story) =>
            withSøknadContext(Story, {
                svar: {
                    harForståttRettigheterOgPlikter: true,
                    barn: YesOrNo.YES,
                    kontonummer: YesOrNo.YES,
                },
            }),
        withRouter,
        withQueryClient,
    ],
};

export default meta;

type Story = StoryObj;

export const Oppsummering: Story = {
    render: () => <OppsummeringSteg />,
};
