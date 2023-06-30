import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';
import { SøknadFormField } from '../../../../types/SøknadFormValues';
import SøknadFormComponents from '../../../SøknadFormComponents';
import { getArbeidIPeriodeArbeiderIPeriodenValidator } from '../../validationArbeidIPeriodeSpørsmål';

interface Props {
    fieldName: SøknadFormField;
    hvor: string;
    validationKey: string;
}

const ArbeiderIPeriodenSpørsmål: React.FunctionComponent<Props> = ({ fieldName, validationKey, hvor }) => {
    const intl = useIntl();
    return (
        <SøknadFormComponents.RadioGroup
            name={fieldName}
            legend={intlHelper(intl, `arbeidIPeriode.arbeiderIPerioden.spm`, {
                hvor,
            })}
            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(validationKey, { hvor })}
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
