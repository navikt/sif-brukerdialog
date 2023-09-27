import { useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import { ArbeidIPeriode, ArbeidIPeriodeField, JobberIPeriodeSvar } from '../../ArbeidstidTypes';
import { Alert } from '@navikt/ds-react';
import { DateRange, ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ArbeidstidVariert from '../arbeidstid-variert/ArbeidstidVariert';
import { getJobberIPeriodenValidator } from '../validation/jobberIPeriodenSpørsmål';
import { getArbeidstidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';

const { RadioGroup } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

interface Props extends ArbeidstidRegistrertLogProps {
    parentFieldName: string;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    periode: DateRange;
    søkerKunHelgedager: boolean;
    onArbeidstidVariertChange: () => void;
}

const ArbeidIPeriodeSpørsmål = ({
    parentFieldName,
    jobberNormaltTimer,
    arbeidIPeriode,
    arbeidsforholdType,
    periode,
    arbeidsstedNavn,
    onArbeidstidVariertChange,
    onArbeidPeriodeRegistrert,
    onArbeidstidEnkeltdagRegistrert,
}: Props) => {
    const intl = useIntl();
    const [arbeidstidChanged, setArbeidstidChanged] = useState(false);

    useEffect(() => {
        if (arbeidstidChanged === true) {
            setArbeidstidChanged(false);
            onArbeidstidVariertChange();
        }
    }, [arbeidstidChanged, onArbeidstidVariertChange]);

    if (jobberNormaltTimer === undefined) {
        return <Alert variant="error">Det mangler informasjon om hvor mye du jobber normalt</Alert>;
    }

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        arbeidsforhold: {
            arbeidsstedNavn,
            jobberNormaltTimer,
            type: arbeidsforholdType,
        },
        periode,
    });

    const getFieldName = (field: ArbeidIPeriodeField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;

    const { jobberIPerioden } = arbeidIPeriode || {};

    const renderArbeidstidVariertPart = (kanLeggeTilPeriode: boolean) => (
        <ArbeidstidVariert
            arbeidstid={arbeidIPeriode?.enkeltdager}
            kanLeggeTilPeriode={kanLeggeTilPeriode}
            jobberNormaltTimer={jobberNormaltTimer}
            periode={periode}
            intlValues={intlValues}
            arbeidsstedNavn={arbeidsstedNavn}
            arbeidsforholdType={arbeidsforholdType}
            formFieldName={getFieldName(ArbeidIPeriodeField.enkeltdager)}
            onArbeidstidVariertChanged={() => setArbeidstidChanged(true)}
            onArbeidPeriodeRegistrert={onArbeidPeriodeRegistrert}
            onArbeidstidEnkeltdagRegistrert={onArbeidstidEnkeltdagRegistrert}
        />
    );

    return (
        <>
            <RadioGroup
                name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                legend={intlHelper(intl, `arbeidIPeriode.jobberIPerioden.spm`, intlValues)}
                validate={getJobberIPeriodenValidator(intlValues)}
                radios={getJobberIPeriodenRadios(intl)}
            />

            {jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <FormBlock>{renderArbeidstidVariertPart(false)}</FormBlock>
            )}
        </>
    );
};

const getJobberIPeriodenRadios = (intl: IntlShape) => [
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberIkke'),
        value: JobberIPeriodeSvar.heltFravær,
    },
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberRedusert'),
        value: JobberIPeriodeSvar.redusert,
    },
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberVanlig'),
        value: JobberIPeriodeSvar.somVanlig,
    },
];

export default ArbeidIPeriodeSpørsmål;
