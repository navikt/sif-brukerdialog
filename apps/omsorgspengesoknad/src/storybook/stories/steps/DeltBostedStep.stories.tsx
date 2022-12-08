import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import DeltBostedStep from '../../../app/søknad/steps/delt-bosted/DeltBostedStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { søknadsdataMocks } from '../../mock-data/søknadsdataMocks';

export default {
    title: 'Steps/DeltBostedStep',
    component: DeltBostedStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings],
} as ComponentMeta<typeof DeltBostedStep>;

interface Props {
    context: SøknadContextState;
}

const Template: Story<Props> = ({ context }: Props) => (
    <SøknadContextProvider initialData={context}>
        <DeltBostedStep />;
    </SøknadContextProvider>
);

export const Default = Template.bind({});

const søknadsdata: Søknadsdata = { ...søknadsdataMocks.komplett_annetBarnFarDeltBosted, deltBosted: { vedlegg: [] } };
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata },
};
Default.parameters = {};
