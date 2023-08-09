import React from 'react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { DateRange } from '@navikt/sif-common-utils/lib';
import FormSection from '../../../components/form-section/FormSection';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
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
    arbeiderIPeriodenAlternativer,
}) => {
    return (
        <FormSection title={tittel}>
            <ArbeidIPeriodeSpørsmål
                intlValues={intlValues}
                arbeidsforholdType={arbeidsforholdType}
                periode={periode}
                formValues={arbeidIPeriode}
                parentFieldName={parentFieldName}
                normalarbeidstid={normalarbeidstid}
                arbeiderIPeriodenAlternativer={arbeiderIPeriodenAlternativer}
                info={info}
            />
        </FormSection>
    );
};

export default ArbeidstidArbeidsaktivitet;
