import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODurationToDecimalDuration } from '@navikt/sif-common-utils';
import TidEnkeltdager from '../../../../components/tid-enkeltdager/TidEnkeltdager';
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    TidEnkeltdagApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';
import { AppText } from '../../../../i18n';
import { Box, List } from '@navikt/ds-react';

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
        <List>
            {(arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær ||
                arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.somVanlig) && (
                <List.Item>
                    <AppText id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`} />
                </List.Item>
            )}

            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <List.Item>
                    <AppText id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`} />
                </List.Item>
            )}

            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager && (
                <List.Item>
                    <Box className="mb-2">
                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />:
                    </Box>

                    <TidEnkeltdager
                        dager={fjernDagerIkkeSøktForOgUtenArbeidstid(arbeidIPeriode.enkeltdager, dagerMedPleie)}
                        renderAsAccordion={true}
                        visUke={false}
                    />
                </List.Item>
            )}
        </List>
    );
};

export default ArbeidIPeriodeSummaryItem;
