import { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import MedlemskapStep from './MedlemskapStep';

const meta: Meta<typeof MedlemskapStep> = {
    title: 'Steps/Medlemskap',
    component: MedlemskapStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof MedlemskapStep>;

export const Default: Story = {
    args: {},
};
