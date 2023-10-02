import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    TidEnkeltdagApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { TidEnkeltdager } from '../../../../local-sif-common-pleiepenger';
import { ISODurationToDecimalDuration, dateToISODate } from '@navikt/sif-common-utils/lib';
import { Heading } from '@navikt/ds-react';

interface Props {
    periode: DateRange;
    dagerMedPleie: Date[];
    arbeidIPeriode: ArbeidIPeriodeApiData;
    normaltimerUke: number;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const fjernDagerIkkeSøktForOgUtenArbeidstid = (enkeltdager: TidEnkeltdagApiData[], dagerMedPleie: Date[]) => {
    const isoDagerMedPleie = dagerMedPleie.map(dateToISODate);
    return enkeltdager.filter(({ dato, tid }) => {
        return isoDagerMedPleie.includes(dato) && ISODurationToDecimalDuration(tid) !== 0;
    });
};

const ArbeidIPeriodeSummaryItem: React.FC<Props> = ({ arbeidIPeriode, dagerMedPleie }) => {
    return (
        <>
            {(arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær ||
                arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.somVanlig) && (
                <p style={{ marginTop: 0 }}>
                    <FormattedMessage
                        id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`}
                    />
                </p>
            )}

            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <p style={{ marginTop: 0 }}>
                    <FormattedMessage
                        id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`}
                    />
                </p>
            )}

            {arbeidIPeriode.enkeltdager && (
                <Block margin="xl">
                    <Heading size="xsmall" level="4" spacing={true}>
                        Dager hvor jeg skal jobbe
                    </Heading>
                    <TidEnkeltdager
                        dager={fjernDagerIkkeSøktForOgUtenArbeidstid(arbeidIPeriode.enkeltdager, dagerMedPleie)}
                    />
                </Block>
            )}
        </>
    );
};

export default ArbeidIPeriodeSummaryItem;
