import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstidApiData } from '../../../types/søknadApiData/SøknadApiData';
import ArbeidstidArbeidstakerOppsummering from './ArbeidstidArbeidstakerOppsummering';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidstidOppsummering: React.FunctionComponent<Props> = ({ arbeidstid, arbeidsgivere }) => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const arbeidstidKolonneTittel = 'Endret arbeidstid';

    const eksisterendeArbeidstakere = arbeidstakerList.filter((a) => a._erNyArbeidsaktivitet === false);
    const nyeArbeidsgivere = arbeidstakerList.filter((a) => a._erNyArbeidsaktivitet === true);
    return (
        <>
            {nyeArbeidsgivere &&
                Object.keys(nyeArbeidsgivere).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={nyeArbeidsgivere[key]}
                        arbeidsgivere={arbeidsgivere}
                        arbeidstidKolonneTittel="I perioden"
                    />
                ))}

            {eksisterendeArbeidstakere &&
                Object.keys(eksisterendeArbeidstakere).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={eksisterendeArbeidstakere[key]}
                        arbeidsgivere={arbeidsgivere}
                    />
                ))}

            {frilanserArbeidstidInfo && (
                <Block margin="xl" padBottom="l">
                    <Heading level="3" size="small">
                        Frilanser
                    </Heading>
                    <>
                        <ArbeidstidUkeTabell
                            listItems={oppsummeringStepUtils.getArbeidstidUkeTabellItems(
                                frilanserArbeidstidInfo.perioder
                            )}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </Block>
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <Block margin="xl" padBottom="l">
                    <Heading level="3" size="small">
                        Selvstendig næringsdrivende
                    </Heading>
                    <>
                        <ArbeidstidUkeTabell
                            listItems={oppsummeringStepUtils.getArbeidstidUkeTabellItems(
                                selvstendigNæringsdrivendeArbeidstidInfo.perioder
                            )}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </Block>
            )}
        </>
    );
};

export default ArbeidstidOppsummering;
