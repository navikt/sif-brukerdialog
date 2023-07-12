import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-utils/lib';
import FormSection from '../../../components/form-section/FormSection';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsforholdFormValues } from '../../../types/ArbeidsforholdFormValues';
import { SøknadFormField } from '../../../types/SøknadFormValues';
import { getPeriodeSomAnsattInnenforPeriode } from '../../../utils/ansattUtils';
import { søkerNoeFremtid } from '../../../utils/søknadsperiodeUtils';
import ArbeiderIPeriodenSpørsmål from './spørsmål/ArbeiderIPeriodenSpørsmål';
import ArbeidRedusertPart, { RedusertArbeidAktivitetType } from './ArbeidRedusertPart';
import { getArbeidstidSpørsmål } from './arbeidIPeriodeTekstUtils';

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    normalarbeidstid: number;
    søknadsperiode: DateRange;
    index: number;
}

const ArbeidstidAnsatt: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    søknadsperiode,
    index,
    normalarbeidstid,
}) => {
    const intl = useIntl();
    const periode = getPeriodeSomAnsattInnenforPeriode(søknadsperiode, arbeidsforhold.arbeidsgiver);
    const ansattParentFieldName = `${SøknadFormField.ansatt_arbeidsforhold}.${index}.arbeidIPeriode` as SøknadFormField;
    const { arbeidsgiver } = arbeidsforhold;

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode,
        jobberNormaltTimer: normalarbeidstid,
        arbeidsgiverNavn: arbeidsgiver.navn,
    });

    return (
        <FormSection title={arbeidsgiver.navn} key={arbeidsgiver.id}>
            <div>
                <ArbeiderIPeriodenSpørsmål
                    fieldName={`${ansattParentFieldName}.${ArbeidIPeriodeFormField.arbeiderIPerioden}` as any}
                    intlValues={intlValues}
                    validationIntlKey={'todo'}
                    spørsmål={
                        getArbeidstidSpørsmål(intl, RedusertArbeidAktivitetType.ARBEIDSTAKER, {
                            arbeidsgiverNavn: arbeidsgiver.navn,
                        }).arbeiderIPerioden
                    }
                />
                {arbeidsforhold?.arbeidIPeriode?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                    <FormBlock>
                        <ArbeidRedusertPart
                            aktivitetType={RedusertArbeidAktivitetType.ARBEIDSTAKER}
                            intlValues={intlValues}
                            arbeidIPeriodenValues={arbeidsforhold.arbeidIPeriode}
                            søkerNoeFremtid={søkerNoeFremtid(søknadsperiode)}
                            parentFieldName={`${SøknadFormField.ansatt_arbeidsforhold}.${index}`}
                            normalarbeidstid={normalarbeidstid}
                        />
                    </FormBlock>
                )}

                {/* <ArbeidIPeriodeSpørsmål
            aktivitetType="arbeidstaker"
            normalarbeidstid={arbeidsgiver.arbeidsforhold.normalarbeidstid}
            arbeidsstedNavn={arbeidsforhold.arbeidsgiver.navn}
            arbeidsforholdType={ArbeidsforholdType.ANSATT}
            arbeidsforhold={arbeidsforhold}
            arbeidsperiode={periode}
            søknadsperiode={søknadsperiode}
            parentFieldName={`${SøknadFormField.ansatt_arbeidsforhold}.${index}`}
            onArbeidstidVariertChange={handleArbeidstidChanged}
        /> */}
            </div>
        </FormSection>
    );
};

export default ArbeidstidAnsatt;
