import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { ISODurationToDecimalDuration, dateToISODate } from '@navikt/sif-common-utils';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TidEnkeltdager } from '../../../../local-sif-common-pleiepenger';
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    TidEnkeltdagApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';

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

            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager && (
                <Block margin="xl">
                    <Heading size="xsmall" level="4" spacing={true}>
                        Dager med pleiepenger hvor jeg skal jobbe
                    </Heading>
                    <TidEnkeltdager
                        dager={fjernDagerIkkeSøktForOgUtenArbeidstid(arbeidIPeriode.enkeltdager, dagerMedPleie)}
                        renderAsAccordion={false}
                        visUke={false}
                    />
                </Block>
            )}
        </>
    );
};

export default ArbeidIPeriodeSummaryItem;
