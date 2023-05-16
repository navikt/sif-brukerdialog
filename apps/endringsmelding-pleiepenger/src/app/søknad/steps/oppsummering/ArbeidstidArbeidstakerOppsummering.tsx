import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstakerApiData } from '../../../types/søknadApiData/SøknadApiData';
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
    const arbeidsuker = oppsummeringStepUtils.getArbeidstidUkeTabellItems(arbeidstidInfo.perioder);
    return (
        <Block margin="xl" padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
            <Heading level="3" size="small">
                {arbeidsgiver.navn}
            </Heading>
            <>
                <ArbeidstidUkeTabell listItems={arbeidsuker} arbeidstidKolonneTittel={arbeidstidKolonneTittel} />
            </>
        </Block>
    );
};

export default ArbeidstidArbeidstakerOppsummering;
