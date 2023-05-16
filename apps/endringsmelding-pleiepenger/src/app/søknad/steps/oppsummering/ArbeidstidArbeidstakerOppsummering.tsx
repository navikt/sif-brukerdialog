import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstakerApiData } from '../../../types/søknadApiData/SøknadApiData';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds';
import { ArbeiderIPeriodenSvar, ArbeiderIPeriodenSvarTekst } from '../../../types/arbeiderIPeriodenSvar';

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
        <Block margin="xl" padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            {arbeidstaker._erUkjentArbeidsaktivitet && arbeidstaker._arbeiderIPerioden && (
                <SummaryBlock
                    header={`I perioden med pleiepenger, hvilken situasjon gjelder for deg hos ${arbeidsgiver.navn}?`}>
                    {ArbeiderIPeriodenSvarTekst[arbeidstaker._arbeiderIPerioden]}
                </SummaryBlock>
            )}
            {(arbeidstaker._erUkjentArbeidsaktivitet === false ||
                (arbeidstaker._erUkjentArbeidsaktivitet === true &&
                    arbeidstaker._arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert)) && (
                <Block margin={arbeidstaker._erUkjentArbeidsaktivitet === true ? 'l' : 'none'}>
                    <ArbeidstidUkeTabell
                        listItems={oppsummeringStepUtils.getArbeidstidUkeTabellItems(arbeidstidInfo.perioder)}
                        arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        visEndringSomOpprinnelig={arbeidstaker._erUkjentArbeidsaktivitet}
                    />
                </Block>
            )}
        </Block>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
