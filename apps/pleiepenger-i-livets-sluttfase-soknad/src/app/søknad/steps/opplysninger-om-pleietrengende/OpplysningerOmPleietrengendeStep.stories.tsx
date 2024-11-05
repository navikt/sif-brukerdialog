import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OpplysningerOmPleietrengendeStep from './OpplysningerOmPleietrengendeStep';

const meta: Meta<typeof OpplysningerOmPleietrengendeStep> = {
    title: 'Steps/Opplysninger om pleietrengende',
    component: OpplysningerOmPleietrengendeStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OpplysningerOmPleietrengendeStep>;

export const Default: Story = {
    args: {},
};
