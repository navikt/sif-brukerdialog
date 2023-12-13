import React from 'react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { DateRange } from '@navikt/sif-common-utils/lib';
import FormSection from '../../../components/form-section/FormSection';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import ArbeidIPeriodeSpørsmål from './ArbeidIPeriodeSpørsmål';

interface Props {
    tittel: string;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    periode: DateRange;
    normalarbeidstid: number;
    parentFieldName: string;
    intlValues: ArbeidIPeriodeIntlValues;
    info?: React.ReactNode;
    arbeiderIPeriodenDescription?: React.ReactNode;
    arbeiderIPeriodenAlternativer?: FormikRadioProp[];
}

const ArbeidstidArbeidsaktivitet: React.FunctionComponent<Props> = ({
    tittel,
    arbeidsforholdType,
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    parentFieldName,
    intlValues,
    info,
    arbeiderIPeriodenDescription,
    arbeiderIPeriodenAlternativer,
}) => {
    return (
        <FormSection title={tittel} titleLevel="2">
            <ArbeidIPeriodeSpørsmål
                intlValues={intlValues}
                arbeidsforholdType={arbeidsforholdType}
                periode={periode}
                formValues={arbeidIPeriode}
                parentFieldName={parentFieldName}
                normalarbeidstid={normalarbeidstid}
                arbeiderIPeriodenAlternativer={arbeiderIPeriodenAlternativer}
                info={info}
                arbeiderIPeriodenDescription={arbeiderIPeriodenDescription}
            />
        </FormSection>
    );
};

export default ArbeidstidArbeidsaktivitet;
