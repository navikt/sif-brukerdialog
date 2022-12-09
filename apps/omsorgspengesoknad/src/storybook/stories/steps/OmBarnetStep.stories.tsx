import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import OmBarnetStep from '../../../app/søknad/steps/om-barnet/OmBarnetStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/OmBarnetStep',
    component: OmBarnetStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings],
} as ComponentMeta<typeof OmBarnetStep>;

interface Props {
    context: SøknadContextState;
}

const Template: Story<Props> = ({ context }: Props) => (
    <SøknadContextProvider initialData={context}>
        <OmBarnetStep />;
    </SøknadContextProvider>
);

export const Default = Template.bind({});

const annetBarnState: Søknadsdata = {};
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata: annetBarnState },
};
Default.parameters = {};
