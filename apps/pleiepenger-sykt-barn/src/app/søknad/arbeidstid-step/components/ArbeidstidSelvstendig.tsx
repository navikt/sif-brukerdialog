import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormSection from '../../../components/form-section/FormSection';
// import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
// import { SelvstendigFormField } from '../../../types/SelvstendigFormData';
// import ArbeiderIPeriodenSpørsmål from './spørsmål/ArbeiderIPeriodenSpørsmål';
// import { RedusertArbeidAktivitetType } from './ArbeidRedusertPart';

interface Props {
    todo?: string;
}

const ArbeidstidSelvstendig: React.FunctionComponent<Props> = ({}) => {
    const intl = useIntl();
    return (
        <FormSection title={intlHelper(intl, 'arbeidIPeriode.SNLabel')}>
            <div data-testid="arbeidIPerioden_selvstendig">
                {/* <ArbeiderIPeriodenSpørsmål
                    fieldName={
                        `${SelvstendigFormField.arbeidsforhold}.${ArbeidIPeriodeFormField.arbeiderIPerioden}` as any
                    }
                    aktivitetType={RedusertArbeidAktivitetType.SN}
                    // validationKey="validation.arbeidIPeriode.selvstendig"
                /> */}

                {/* <ArbeidIPeriodeSpørsmål
            aktivitetType="sn"
            normalarbeidstid={arbeid.selvstendig.arbeidsforhold.normalarbeidstid}
            arbeidsstedNavn="Selvstendig næringsdrivende"
            arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
            arbeidsforhold={selvstendig.arbeidsforhold}
            arbeidsperiode={periodeSomSelvstendigISøknadsperiode}
            søknadsperiode={søknadsperiode}
            parentFieldName={SelvstendigFormField.arbeidsforhold}
            onArbeidstidVariertChange={handleArbeidstidChanged}
        /> */}
            </div>
        </FormSection>
    );
};

export default ArbeidstidSelvstendig;
