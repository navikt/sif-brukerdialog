import { Heading, VStack } from '@navikt/ds-react';
import { ArbeiderIPeriodenSvar, Arbeidsgiver, ArbeidstakerApiData } from '@types';
import { AppText } from '../../../i18n';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeiderIPeriodenSvarIntlKey } from '../arbeidstid/arbeidsaktivitet-form-part/components/ArbeiderIPeriodenSpørsmål';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

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
        <VStack gap="4" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            {arbeidstaker._erUkjentArbeidsforhold && arbeidstaker._arbeiderIPerioden && (
                <VStack gap="2">
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
