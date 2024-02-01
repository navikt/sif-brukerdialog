import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { ArbeiderIPeriodenSvar, ArbeiderIPeriodenSvarTekst, Arbeidsgiver, ArbeidstakerApiData } from '@types';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
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
        <Block margin="xl" padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            {arbeidstaker._erUkjentArbeidsforhold && arbeidstaker._arbeiderIPerioden && (
                <SummaryBlock
                    header={`I perioden med pleiepenger, hvilken situasjon gjelder for deg hos ${arbeidsgiver.navn}?`}>
                    {ArbeiderIPeriodenSvarTekst[arbeidstaker._arbeiderIPerioden]}
                </SummaryBlock>
            )}
            {(arbeidstaker._erUkjentArbeidsforhold === false ||
                (arbeidstaker._erUkjentArbeidsforhold === true &&
                    arbeidstaker._arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert)) && (
                <Block margin={arbeidstaker._erUkjentArbeidsforhold === true ? 'l' : 'none'}>
                    <ArbeidstidUker
                        listItems={oppsummeringStepUtils.getArbeidstidUkerItems(arbeidstidInfo.perioder)}
                        arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        visEndringSomOpprinnelig={arbeidstaker._erUkjentArbeidsforhold}
                    />
                </Block>
            )}
        </Block>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
