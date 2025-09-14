import { useAppIntl } from '@i18n/index';
import { DateRange } from '@navikt/sif-common-utils';

import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { Arbeidsgiver } from '../../../types';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { SøknadFormField } from '../../../types/søknad-form-values/SøknadFormValues';
import { getPeriodeSomAnsattInnenforPeriode } from '../../../utils/arbeidUtils';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    arbeidsgiver: Arbeidsgiver;
    normalarbeidstid: number;
    søknadsperiode: DateRange;
    index: number;
    søkerFremITid: boolean;
}

const ArbeidstidAnsatt = ({
    arbeidIPeriode,
    arbeidsgiver,
    søknadsperiode,
    normalarbeidstid,
    søkerFremITid,
    index,
}: Props) => {
    const appIntl = useAppIntl();
    const periode = getPeriodeSomAnsattInnenforPeriode(søknadsperiode, arbeidsgiver);
    const ansattParentFieldName = `${SøknadFormField.ansatt_arbeidsforhold}.${index}` as SøknadFormField;

    const intlValues = getArbeidstidIPeriodeIntlValues(appIntl, {
        periode,
        jobberNormaltTimer: normalarbeidstid,
        arbeidsgiverNavn: arbeidsgiver.navn,
        arbeidsforholdType: ArbeidsforholdType.ANSATT,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            arbeidsforholdType={ArbeidsforholdType.ANSATT}
            periode={periode}
            tittel={arbeidsgiver.navn}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={ansattParentFieldName}
            intlValues={intlValues}
            normalarbeidstid={normalarbeidstid}
            info={
                <ArbeidIPeriodeInfo
                    tittel={`Delvis jobb hos ${arbeidsgiver.navn} i perioden`}
                    arbeidsforholdType={ArbeidsforholdType.ANSATT}
                    søkerFremITid={søkerFremITid}
                />
            }
        />
    );
};

export default ArbeidstidAnsatt;
