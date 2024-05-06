import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { SelvstendigFormField } from '../../../types/søknad-form-values/SelvstendigFormValues';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import InfoOmEndring from './InfoOmEndring';
import { AppText } from '../../../i18n';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    /** Periode som selvstendig i søknadsperioden */
    periode: DateRange;
    søkerFremITid: boolean;
}

const ArbeidstidSelvstendig: React.FunctionComponent<Props> = ({
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    søkerFremITid,
}) => {
    const { intl } = useAppIntl();

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: periode,
        jobberNormaltTimer: normalarbeidstid,
        arbeidsforholdType: ArbeidsforholdType.SELVSTENDIG,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            periode={periode}
            arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={SelvstendigFormField.arbeidsforhold}
            tittel="Selvstendig næringsdrivende"
            intlValues={intlValues}
            normalarbeidstid={normalarbeidstid}
            info={
                <>
                    <Heading level="4" size="small">
                        Hvor mye jobber du som selvstendig næringsdrivende i perioden?
                    </Heading>

                    {søkerFremITid && (
                        <p>
                            <AppText id="arbeidIPeriode.redusert.info.tekst" />
                        </p>
                    )}
                    <Block margin="m">
                        <InfoOmEndring arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG} />
                    </Block>
                </>
            }
        />
    );
};

export default ArbeidstidSelvstendig;
