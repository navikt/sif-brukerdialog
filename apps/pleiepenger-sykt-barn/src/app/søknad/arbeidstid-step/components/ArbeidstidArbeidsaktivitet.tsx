import React from 'react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
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

const ArbeidstidArbeidsaktivitet = ({
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
}: Props) => {
    return (
        <FormLayout.Section title={tittel}>
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
        </FormLayout.Section>
    );
};

export default ArbeidstidArbeidsaktivitet;
