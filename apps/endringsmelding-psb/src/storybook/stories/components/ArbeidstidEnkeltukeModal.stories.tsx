import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import EndreArbeidstidModal from '../../../app/components/arbeidstid-enkeltuke-modal/EndreArbeidstidModal';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../app/types/Sak';
import { Arbeidsuke } from '../../../app/types/K9Sak';
import { DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Components/EndreArbeidstidModal',
    component: EndreArbeidstidModal,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as ComponentMeta<typeof EndreArbeidstidModal>;

const arbeidsaktivitet: ArbeidAktivitet = {
    type: ArbeidAktivitetType.frilanser,
    id: ArbeidAktivitetType.frilanser,
    arbeidsuker: {},
};

const isoDateRange = '2022-11-14/2022-11-18';
const periode: DateRange = ISODateRangeToDateRange(isoDateRange);

const arbeidsuke: Arbeidsuke = {
    dagerMap: {},
    faktisk: { hours: '5', minutes: '0' },
    normalt: { hours: '7', minutes: '30' },
    isoDateRange,
    periode,
};

const Template: ComponentStory<typeof EndreArbeidstidModal> = () => (
    <EndreArbeidstidModal
        isVisible={true}
        arbeidAktivitet={arbeidsaktivitet}
        arbeidsuke={arbeidsuke}
        onClose={() => null}
        onSubmit={() => null}
    />
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
