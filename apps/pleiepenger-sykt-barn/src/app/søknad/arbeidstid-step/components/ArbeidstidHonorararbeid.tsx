import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { FrilansFormField } from '../../../types/FrilansFormData';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import ArbeidIPeriodeInfo from './info/ArbeidIPeriodeInfo';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    /** Periode som frilanser i søknadsperioden */
    periode: DateRange;
    søkerFremITid: boolean;
}

const ArbeidstidHonorararbeid: React.FunctionComponent<Props> = ({
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    søkerFremITid,
}) => {
    const intl = useIntl();

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: periode,
        jobberNormaltTimer: normalarbeidstid,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            periode={periode}
            arbeidsaktivitetType={ArbeidsaktivitetType.HONORARARBEID}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={FrilansFormField.arbeidsforholdHonorararbeid}
            intlValues={intlValues}
            tittel={'Jobb for honorar'}
            normalarbeidstid={normalarbeidstid}
            info={
                <ArbeidIPeriodeInfo
                    søkerFremITid={søkerFremITid}
                    arbeidsaktivitetType={ArbeidsaktivitetType.FRILANSARBEID}
                    tittel="Hvor mye tid bruker du på det du får honorar for i perioden?">
                    <p>
                        <FormattedMessage id="arbeidIPeriode.info.honorararbeid.tekst.1" />
                    </p>
                </ArbeidIPeriodeInfo>
            }
            arbeiderIPeriodenAlternativer={[
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

export default ArbeidstidHonorararbeid;
