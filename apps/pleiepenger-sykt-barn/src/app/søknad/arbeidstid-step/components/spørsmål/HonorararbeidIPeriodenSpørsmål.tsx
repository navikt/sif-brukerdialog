import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';
import { SøknadFormField } from '../../../../types/SøknadFormValues';
import SøknadFormComponents from '../../../SøknadFormComponents';
import { getArbeidIPeriodeArbeiderIPeriodenMisterHonorararbeidValidator } from '../../validationArbeidIPeriodeSpørsmål';

interface Props {
    fieldName: SøknadFormField;
}

const HonorararbeidIPeriodenSpørsmål: React.FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();
    return (
        <SøknadFormComponents.RadioGroup
            name={fieldName}
            legend={intlHelper(intl, `arbeidIPeriode.arbeiderIPerioden.honorararbeid.spm`)}
            validate={getArbeidIPeriodeArbeiderIPeriodenMisterHonorararbeidValidator()}
            radios={[
                {
                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.honorararbeid.svar.jobberIkke'),
                    value: ArbeiderIPeriodenSvar.heltFravær,
                },
                {
                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.honorararbeid.svar.jobberRedusert'),
                    value: ArbeiderIPeriodenSvar.redusert,
                },
            ]}
        />
    );
};

export default HonorararbeidIPeriodenSpørsmål;
