import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ArbeidstidUkeTabell from '../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstakerApiData, ArbeidstidApiData } from '../../../types/søknadApiData/SøknadApiData';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidstidOppsummering: React.FunctionComponent<Props> = ({ arbeidstid, arbeidsgivere }) => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const arbeidstidKolonneTittel = 'Endret arbeidstid';

    return (
        <>
            {arbeidstakerList &&
                Object.keys(arbeidstakerList).map((key) => {
                    const { organisasjonsnummer, arbeidstidInfo }: ArbeidstakerApiData = (arbeidstakerList as any)[key];
                    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);
                    if (!arbeidsgiver) {
                        return null;
                    }
                    const arbeidsuker = oppsummeringStepUtils.getArbeidstidUkeTabellItems(arbeidstidInfo.perioder);
                    return (
                        <Block margin="xl" key={key} padBottom="l" data-testid={`oppsummering-${organisasjonsnummer}`}>
                            <Heading level="3" size="small">
                                {arbeidsgiver.navn}
                            </Heading>
                            <>
                                <ArbeidstidUkeTabell
                                    listItems={arbeidsuker}
                                    arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                                />
                            </>
                        </Block>
                    );
                })}
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
