import { Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import React from 'react';
import { useIntl } from 'react-intl';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../../types/Sak';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import { ArbeidstidFormFields } from '../ArbeidstidStep';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import ArbeidIPeriodeForm from './ArbeidIPeriodeForm';

interface Props {
    values?: ArbeidIPeriodeFormValues;
    parentFieldName: ArbeidstidFormFields;
    arbeidAktivitet: ArbeidAktivitet;
}

const { DateRangePicker } = getTypedFormComponents<
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ValidationError
>();

export const getPeriode = (formValues: ArbeidIPeriodeFormValues): DateRange | undefined => {
    const from = datepickerUtils.getDateFromDateString(formValues.periodeFra);
    const to = datepickerUtils.getDateFromDateString(formValues.periodeTil);
    return from && to ? { from, to } : undefined;
};

const ArbeidAktivitetFormPart: React.FunctionComponent<Props> = ({ arbeidAktivitet, parentFieldName, values }) => {
    const intl = useIntl();

    const getFieldName = (field: ArbeidIPeriodeFormField): any => {
        return `${parentFieldName}.${field}`;
    };

    const getHeading = (): string => {
        switch (arbeidAktivitet.type) {
            case ArbeidAktivitetType.arbeidstaker:
                return arbeidAktivitet.arbeidsgiver.navn;
            case ArbeidAktivitetType.frilanser:
                return 'Frilanser';
            case ArbeidAktivitetType.selvstendigNæringsdrivende:
                return 'Selvstendig næringsdrivende';
        }
    };

    const arbeidsstedNavn = getHeading();
    const arbeidsperiode = getPeriode(values || {});

    return (
        <>
            <Heading level="3" size="medium">
                {arbeidsstedNavn}
            </Heading>
            <FormBlock margin="l">
                <DateRangePicker
                    legend={intlHelper(intl, 'arbeidIPeriode.periode.tittel')}
                    fromInputProps={{
                        label: intlHelper(intl, 'arbeidIPeriode.fraOgMed.label'),
                        name: getFieldName(ArbeidIPeriodeFormField.periodeFra),
                    }}
                    toInputProps={{
                        label: intlHelper(intl, 'arbeidIPeriode.tilOgMed.label'),
                        name: getFieldName(ArbeidIPeriodeFormField.periodeTil),
                        dayPickerProps: { defaultMonth: values?.periodeFra ? new Date(values?.periodeFra) : undefined },
                    }}
                    disableWeekend={false}
                    fullScreenOnMobile={true}
                />
            </FormBlock>

            {arbeidsperiode && (
                <ArbeidIPeriodeForm
                    arbeidAktivitet={arbeidAktivitet}
                    values={values}
                    arbeidsperiode={arbeidsperiode}
                    parentFieldName={parentFieldName}
                />
            )}
        </>
    );
};

export default ArbeidAktivitetFormPart;
