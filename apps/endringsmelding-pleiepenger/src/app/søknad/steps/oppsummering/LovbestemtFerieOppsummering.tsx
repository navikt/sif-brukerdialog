import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import { DateRange, ISODateRangeToDateRange, ISODuration } from '@navikt/sif-common-utils/lib';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import {
    FERIE_FJERNET_DURATION,
    FERIE_LAGTTIL_DURATION,
    LovbestemtFerieApiData,
} from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

interface LovbestemtFeriePeriode {
    isoDuration: ISODuration;
    dateRange: DateRange;
}

const LovbestemtFerieOppsummering: React.FunctionComponent<Props> = ({ lovbestemtFerie }) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map((periode) => ({
        isoDuration: lovbestemtFerie.perioder[periode],
        dateRange: ISODateRangeToDateRange(periode),
    }));

    const perioderLagtTil = perioder.filter((p) => p.isoDuration === FERIE_LAGTTIL_DURATION);
    const perioderFjernet = perioder.filter((p) => p.isoDuration === FERIE_FJERNET_DURATION);

    // const perioderLagtTil = Object.keys(lovbestemtFerie.perioder).map(key => )
    // const perioderLagtTil = Object.keys(lovbestemtFerie.perioderLagtTil).map(ISODateRangeToDateRange);
    // const perioderFjernet = Object.keys(lovbestemtFerie.perioderFjernet).map(ISODateRangeToDateRange);

    return (
        <>
            {perioderLagtTil.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Ferie som er lagt til
                    </Heading>
                    <InfoList>
                        {perioderLagtTil.map((periode) => (
                            <li key={periode.isoDuration}>
                                <div className="capsFirstChar">{getPeriodeTekst(periode.dateRange, true, true)}</div>
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
                    </BodyLong>
                    <InfoList>
                        {perioderFjernet.map((periode) => (
                            <li key={periode.isoDuration}>
                                <div className="capsFirstChar">{getPeriodeTekst(periode.dateRange, true, true)}</div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
        </>
    );
};

export default LovbestemtFerieOppsummering;
