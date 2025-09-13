import { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import LovbestemtFerieStep from './LovbestemtFerieStep';

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
