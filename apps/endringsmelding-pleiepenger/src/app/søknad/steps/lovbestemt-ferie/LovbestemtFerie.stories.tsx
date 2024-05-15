import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import LovbestemtFerieStep from './LovbestemtFerieStep';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';

const meta: Meta<typeof LovbestemtFerieStep> = {
    title: 'Step/LovbestemtFerie',
    component: LovbestemtFerieStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof LovbestemtFerieStep>;

export const Default: Story = {
    args: {},
};
