import { AppText } from '@app/i18n';
import { ArbeiderIPeriodenSvar, Arbeidsgiver, ArbeidstakerApiData } from '@app/types';
import { FormSummary } from '@navikt/ds-react';

import { ArbeiderIPeriodenSvarIntlKey } from '../../arbeidstid/arbeidsaktivitet-form-part/components/ArbeiderIPeriodenSpørsmål';
import ArbeidstidEndringerAnswer from './ArbeidstidEndringerAnswer';
import ArbeidstidFormSummary from './ArbeidstidFormSummary';

type Props = {
    arbeidstaker: ArbeidstakerApiData;
    arbeidsgivere: Arbeidsgiver[];
    arbeidstidKolonneTittel?: string;
};

const ArbeidstidArbeidstakerOppsummering = ({ arbeidsgivere, arbeidstaker }: Props) => {
    const { organisasjonsnummer, arbeidstidInfo } = arbeidstaker;
    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);

    if (!arbeidsgiver) {
        return null;
    }

    return (
        <ArbeidstidFormSummary title={arbeidsgiver.navn}>
            {arbeidstaker._erUkjentArbeidsforhold && arbeidstaker._arbeiderIPerioden && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="arbeidstidStep.arbeiderIPeriodenSpm.legend" values={{ navn: arbeidsgiver.navn }} />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={ArbeiderIPeriodenSvarIntlKey[arbeidstaker._arbeiderIPerioden]} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
            {(arbeidstaker._erUkjentArbeidsforhold === false ||
                (arbeidstaker._erUkjentArbeidsforhold === true &&
                    arbeidstaker._arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert)) && (
                <ArbeidstidEndringerAnswer
                    perioder={arbeidstidInfo.perioder}
                    visEndringSomOpprinnelig={arbeidstaker._erUkjentArbeidsforhold}
                />
            )}
        </ArbeidstidFormSummary>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
