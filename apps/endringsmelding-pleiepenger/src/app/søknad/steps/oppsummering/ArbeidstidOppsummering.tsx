import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Arbeidsgiver, ArbeidstidApiData } from '@types';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
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
    const ukjenteArbeidsforhold = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === true);
    return (
        <>
            {ukjenteArbeidsforhold &&
                Object.keys(ukjenteArbeidsforhold).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={ukjenteArbeidsforhold[key]}
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
                        <ArbeidstidUker
                            listItems={oppsummeringStepUtils.getArbeidstidUkerItems(frilanserArbeidstidInfo.perioder)}
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
                        <ArbeidstidUker
                            listItems={oppsummeringStepUtils.getArbeidstidUkerItems(
                                selvstendigNæringsdrivendeArbeidstidInfo.perioder,
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
