import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { arbeidsukerMockData } from '../../../mocks/data/app/arbeidsukerMockData';
import ArbeidsaktiviteterMedUkjentArbeidsgiver from '../../../app/søknad/steps/arbeidstid/ArbeidsaktiviteterMedUkjentArbeidsgiver';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

const { arbeidsuke, arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

export default {
    title: 'Components/ArbeidsaktiviteterMedUkjentArbeidsgiver',
    component: ArbeidsaktiviteterMedUkjentArbeidsgiver,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as Meta<typeof ArbeidsaktiviteterMedUkjentArbeidsgiver>;

const Template: StoryFn<typeof ArbeidsaktiviteterMedUkjentArbeidsgiver> = (props) => {
    return <ArbeidsaktiviteterMedUkjentArbeidsgiver {...props} onCancel={() => null} onSubmit={() => null} />;
};

export const EndreEnUke = Template.bind({});
EndreEnUke.args = {
    arbeidsuker: [arbeidsuke],
};

export const EndreFlereUkerSammeÅr = Template.bind({});
EndreFlereUkerSammeÅr.args = {
    arbeidsuker: arbeidsukerEttÅr,
};
export const EndreFlereUkerFlereÅr = Template.bind({});
EndreFlereUkerFlereÅr.args = {
    arbeidsuker: arbeidsukerFlereÅr,
};
