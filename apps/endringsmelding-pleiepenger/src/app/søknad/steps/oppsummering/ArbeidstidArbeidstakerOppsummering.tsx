import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstakerApiData } from '../../../types/søknadApiData/SøknadApiData';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';
import { Heading } from '@navikt/ds-react';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import NyTag from '../../../components/tags/NyTag';

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
    const arbeidsuker = oppsummeringStepUtils.getArbeidstidUkeTabellItems(arbeidstidInfo.perioder);
    return (
        <Block margin="xl" padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
                {arbeidstaker._erNyArbeidsaktivitet && (
                    <Block margin="m">
                        <NyTag>Nytt arbeidsforhold</NyTag>
                    </Block>
                )}
            </Heading>
            <>
                <ArbeidstidUkeTabell
                    listItems={arbeidsuker}
                    arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                    visEndringSomVanligTid={arbeidstaker._erNyArbeidsaktivitet}
                />
            </>
        </Block>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
