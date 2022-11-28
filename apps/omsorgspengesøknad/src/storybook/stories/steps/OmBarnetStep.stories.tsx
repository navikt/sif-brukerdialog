import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import OmBarnetStep from '../../../app/søknad/steps/om-barnet/OmBarnetStep';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
// import { OmBarnetSøknadsdata } from '../../../app/types/søknadsdata/OmBarnetSøknadsdata';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';

export default {
    title: 'Steps/OmBarnetStep',
    component: OmBarnetStep,
    decorators: [withIntl, withRouterProvider, withFormikWrapper, withStepFormValuesContext],
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
export const SomeOther = Template.bind({});

const annetBarnState: Søknadsdata = {
    omBarnet: { søknadenGjelderEtAnnetBarn: true },
};
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata: annetBarnState },
};
Default.parameters = {};
