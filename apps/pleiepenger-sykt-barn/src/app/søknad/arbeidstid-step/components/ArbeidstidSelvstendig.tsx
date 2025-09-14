import { useAppIntl } from '@i18n/index';
import { Heading } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';

import { AppText } from '../../../i18n';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { SelvstendigFormField } from '../../../types/søknad-form-values/SelvstendigFormValues';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';
import InfoOmEndring from './InfoOmEndring';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    /** Periode som selvstendig i søknadsperioden */
    periode: DateRange;
    søkerFremITid: boolean;
}

const ArbeidstidSelvstendig = ({ arbeidIPeriode, periode, normalarbeidstid, søkerFremITid }: Props) => {
    const appIntl = useAppIntl();

    const intlValues = getArbeidstidIPeriodeIntlValues(appIntl, {
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

                    <InfoOmEndring arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG} />
                </>
            }
        />
    );
};

export default ArbeidstidSelvstendig;
