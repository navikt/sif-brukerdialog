import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { ArbeidAktivitetType, Arbeidsgiver, ArbeidstidApiData } from '@types';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import ArbeidstidArbeidstakerOppsummering from './ArbeidstidArbeidstakerOppsummering';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidstidOppsummering: React.FunctionComponent<Props> = ({ arbeidstid, arbeidsgivere }) => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const arbeidstidKolonneTittel = 'Endret arbeidstid';

    const eksisterendeArbeidstakere = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === false);
    const ukjenteArbeidsgivere = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === true);
    return (
        <>
            {ukjenteArbeidsgivere &&
                Object.keys(ukjenteArbeidsgivere).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={ukjenteArbeidsgivere[key]}
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
                            arbeidsaktivitetKey={ArbeidAktivitetType.frilanser}
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
                            arbeidsaktivitetKey={ArbeidAktivitetType.selvstendigNæringsdrivende}
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
