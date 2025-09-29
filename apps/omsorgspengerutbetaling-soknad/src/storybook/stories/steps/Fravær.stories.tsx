import { Meta, StoryFn } from '@storybook/react-vite';

import FraværStep from '../../../app/søknad/steps/fravær/FraværStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/FraværStep',
    component: FraværStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof FraværStep>;

const Template: StoryFn<typeof FraværStep> = () => <FraværStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
