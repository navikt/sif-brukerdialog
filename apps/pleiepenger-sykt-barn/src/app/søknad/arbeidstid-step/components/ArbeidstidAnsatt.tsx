import React from 'react';
import FormSection from '../../../components/form-section/FormSection';
import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
import { SøknadFormField } from '../../../types/SøknadFormValues';
import { ArbeidAnsattSøknadsdata } from '../../../types/søknadsdata/ArbeidAnsattSøknadsdata';
import ArbeiderIPeriodenSpørsmål from './arbeider-i-perioden-spørsmål/ArbeiderIPeriodenSpørsmål';

interface Props {
    arbeidAnsattSøknadsdata: ArbeidAnsattSøknadsdata;
    index: number;
}

const ArbeidstidAnsatt: React.FunctionComponent<Props> = ({
    arbeidAnsattSøknadsdata: arbeidAnsattSøknadsdata,
    index,
}) => {
    const ansattParentFieldName = `${SøknadFormField.ansatt_arbeidsforhold}.${index}.arbeidIPeriode` as SøknadFormField;

    const { arbeidsgiver } = arbeidAnsattSøknadsdata;

    return (
        <FormSection title={arbeidsgiver.navn} key={arbeidsgiver.id}>
            <div>
                <ArbeiderIPeriodenSpørsmål
                    fieldName={`${ansattParentFieldName}.${ArbeidIPeriodeFormField.arbeiderIPerioden}` as any}
                    hvor={`hos ${arbeidsgiver.navn}`}
                    validationKey="validation.arbeidIPeriode.ansatt"
                />

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
