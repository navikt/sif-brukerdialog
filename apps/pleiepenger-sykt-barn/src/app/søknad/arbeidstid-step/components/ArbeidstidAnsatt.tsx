import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { Arbeidsgiver } from '../../../types';
import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { SøknadFormField } from '../../../types/SøknadFormValues';
import { getPeriodeSomAnsattInnenforPeriode } from '../../../utils/arbeidUtils';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    arbeidsgiver: Arbeidsgiver;
    normalarbeidstid: number;
    søknadsperiode: DateRange;
    index: number;
    søkerFremITid: boolean;
}

const ArbeidstidAnsatt: React.FunctionComponent<Props> = ({
    arbeidIPeriode,
    arbeidsgiver,
    søknadsperiode,
    normalarbeidstid,
    søkerFremITid,
    index,
}) => {
    const intl = useIntl();
    const periode = getPeriodeSomAnsattInnenforPeriode(søknadsperiode, arbeidsgiver);
    const ansattParentFieldName = `${SøknadFormField.ansatt_arbeidsforhold}.${index}` as SøknadFormField;

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode,
        jobberNormaltTimer: normalarbeidstid,
        arbeidsgiverNavn: arbeidsgiver.navn,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            arbeidsaktivitetType={ArbeidsaktivitetType.ANSATT}
            periode={periode}
            tittel={arbeidsgiver.navn}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={ansattParentFieldName}
            intlValues={intlValues}
            normalarbeidstid={normalarbeidstid}
            info={
                <ArbeidIPeriodeInfo
                    tittel={`Delvis jobb hos ${arbeidsgiver.navn} i perioden`}
                    arbeidsaktivitetType={ArbeidsaktivitetType.ANSATT}
                    søkerFremITid={søkerFremITid}
                />
            }
        />
    );
};

export default ArbeidstidAnsatt;
