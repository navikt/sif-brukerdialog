import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import { dateRangeToISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import { LovbestemtFerieApiData } from '../../../types/søknadApiData/SøknadApiData';
import { LovbestemtFeriePeriode } from '../../../types/Sak';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering: React.FunctionComponent<Props> = ({ lovbestemtFerie }) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map((isoDateRange) => {
        const x: LovbestemtFeriePeriode = {
            ...ISODateRangeToDateRange(isoDateRange),
            skalHaFerie: lovbestemtFerie.perioder[isoDateRange].skalHaFerie,
        };
        return x;
    });

    const perioderLagtTil = perioder.filter((p) => p.skalHaFerie === true);
    const perioderFjernet = perioder.filter((p) => p.skalHaFerie === false);

    return (
        <>
            {perioderLagtTil.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Ferie som er lagt til
                    </Heading>
                    <InfoList>
                        {perioderLagtTil.map((periode) => (
                            <li key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstChar">{getPeriodeTekst(periode, true, true)}</div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
            {perioderFjernet.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Ferie som er fjernet
                    </Heading>
                    <BodyLong>
                        Dager hvor ferie er fjernet erstattes med arbeidstiden du tidligere har oppgitt på disse dagene.
                        Det er viktig du kontrollerer at arbeidstiden som er oppgitt for disse dagene er oppdatert.
                    </BodyLong>
                    <InfoList>
                        {perioderFjernet.map((periode) => (
                            <li key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstChar">{getPeriodeTekst(periode, true, true)}</div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
        </>
    );
};

export default LovbestemtFerieOppsummering;
