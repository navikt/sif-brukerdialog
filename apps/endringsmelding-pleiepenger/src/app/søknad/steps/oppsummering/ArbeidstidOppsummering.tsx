import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import {
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import ArbeidstidUkeTabell, {
    ArbeidstidUkeTabellItem,
} from '../../../components/arbeidstid-uke-liste/ArbeidstidUkeTabell';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
} from '../../../types/søknadApiData/SøknadApiData';
import { getTimerPerUkeFraTimerPerDag } from '../../../utils/beregnUtils';

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
                    const { organisasjonsnummer, arbeidstidInfo }: ArbeidstakerApiData = arbeidstakerList[key];
                    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);
                    if (!arbeidsgiver) {
                        return null;
                    }
                    const arbeidsuker = getArbeidstidUkeTabellItems(arbeidstidInfo.perioder);
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
                            listItems={getArbeidstidUkeTabellItems(frilanserArbeidstidInfo.perioder)}
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
                            listItems={getArbeidstidUkeTabellItems(selvstendigNæringsdrivendeArbeidstidInfo.perioder)}
                            arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                        />
                    </>
                </Block>
            )}
        </>
    );
};

export default ArbeidstidOppsummering;

const getArbeidsukeListItemFromArbeidstidPeriodeApiData = (
    {
        faktiskArbeidTimerPerDag,
        _opprinneligFaktiskPerDag,
        _opprinneligNormaltPerDag,
        _endretProsent,
    }: ArbeidstidPeriodeApiData,
    isoDateRange: ISODateRange
): ArbeidstidUkeTabellItem => {
    const periode = ISODateRangeToDateRange(isoDateRange);
    const antallDagerMedArbeidstid = getDatesInDateRange(periode).length;

    const arbeidsuke: ArbeidstidUkeTabellItem = {
        kanEndres: false,
        kanVelges: false,
        isoDateRange,
        periode,
        antallDagerMedArbeidstid,
        opprinnelig: {
            normalt: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligNormaltPerDag),
                antallDagerMedArbeidstid
            ),
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligFaktiskPerDag),
                antallDagerMedArbeidstid
            ),
        },
        endret: {
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(faktiskArbeidTimerPerDag),
                antallDagerMedArbeidstid
            ),
            endretProsent: _endretProsent,
        },
    };
    return arbeidsuke;
};

const getArbeidstidUkeTabellItems = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkeTabellItem[] => {
    const arbeidsuker: ArbeidstidUkeTabellItem[] = [];
    Object.keys(perioder)
        .sort()
        .forEach((isoDateRange) => {
            arbeidsuker.push(getArbeidsukeListItemFromArbeidstidPeriodeApiData(perioder[isoDateRange], isoDateRange));
        });
    return arbeidsuker;
};
