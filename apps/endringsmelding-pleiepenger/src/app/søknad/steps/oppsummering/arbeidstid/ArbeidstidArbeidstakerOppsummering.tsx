import { AppText } from '@app/i18n';
import ArbeidstidUker from '@app/modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeiderIPeriodenSvar, Arbeidsgiver, ArbeidstakerApiData } from '@app/types';
import { Heading, VStack } from '@navikt/ds-react';

import { ArbeiderIPeriodenSvarIntlKey } from '../../arbeidstid/arbeidsaktivitet-form-part/components/ArbeiderIPeriodenSpørsmål';
import { oppsummeringStepUtils } from './../oppsummeringStepUtils';

type Props = {
    arbeidstaker: ArbeidstakerApiData;
    arbeidsgivere: Arbeidsgiver[];
    arbeidstidKolonneTittel?: string;
};

const ArbeidstidArbeidstakerOppsummering = ({ arbeidsgivere, arbeidstaker, arbeidstidKolonneTittel }: Props) => {
    const { organisasjonsnummer, arbeidstidInfo } = arbeidstaker;
    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);

    if (!arbeidsgiver) {
        return null;
    }

    return (
        <VStack gap="space-16" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            {arbeidstaker._erUkjentArbeidsforhold && arbeidstaker._arbeiderIPerioden && (
                <VStack gap="space-8">
                    <Heading level="3" size="xsmall">
                        <AppText id="arbeidstidStep.arbeiderIPeriodenSpm.legend" values={{ navn: arbeidsgiver.navn }} />
                    </Heading>

                    <AppText id={ArbeiderIPeriodenSvarIntlKey[arbeidstaker._arbeiderIPerioden]} />
                </VStack>
            )}
            {(arbeidstaker._erUkjentArbeidsforhold === false ||
                (arbeidstaker._erUkjentArbeidsforhold === true &&
                    arbeidstaker._arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert)) && (
                <ArbeidstidUker
                    listItems={oppsummeringStepUtils.getArbeidstidUkerItems(arbeidstidInfo.perioder)}
                    arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                    visEndringSomOpprinnelig={arbeidstaker._erUkjentArbeidsforhold}
                />
            )}
        </VStack>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
