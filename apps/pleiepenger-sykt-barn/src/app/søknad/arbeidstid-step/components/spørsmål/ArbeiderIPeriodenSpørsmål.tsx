import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidIPeriodeIntlValues, ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';
import { SøknadFormField } from '../../../../types/SøknadFormValues';
import SøknadFormComponents from '../../../SøknadFormComponents';
import { getArbeidIPeriodeArbeiderIPeriodenValidator } from '../../validationArbeidIPeriodeSpørsmål';

interface Props {
    fieldName: SøknadFormField;
    spørsmål: string;
    validationIntlKey: string;
    intlValues: ArbeidIPeriodeIntlValues;
}

const ArbeiderIPeriodenSpørsmål: React.FunctionComponent<Props> = ({
    fieldName,
    spørsmål: legend,
    validationIntlKey,
    intlValues,
}) => {
    const intl = useIntl();
    return (
        <SøknadFormComponents.RadioGroup
            name={fieldName}
            legend={legend}
            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(validationIntlKey, intlValues)}
            radios={[
                {
                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke'),
                    value: ArbeiderIPeriodenSvar.heltFravær,
                },
                {
                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert'),
                    value: ArbeiderIPeriodenSvar.redusert,
                },
                {
                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig'),
                    value: ArbeiderIPeriodenSvar.somVanlig,
                },
            ]}
        />
    );
};

export default ArbeiderIPeriodenSpørsmål;
