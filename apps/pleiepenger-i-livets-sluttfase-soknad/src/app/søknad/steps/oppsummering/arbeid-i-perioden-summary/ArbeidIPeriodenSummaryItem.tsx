import { Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODurationToDecimalDuration } from '@navikt/sif-common-utils';

import TidEnkeltdager from '../../../../components/tid-enkeltdager/TidEnkeltdager';
import { AppText } from '../../../../i18n';
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

const ArbeidIPeriodeSummaryItem = ({ arbeidIPeriode, dagerMedPleie }: Props) => {
    return (
        <VStack gap="space-32">
            {(arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær ||
                arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.somVanlig) && (
                <p style={{ marginTop: 0 }}>
                    <AppText id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`} />
                </p>
            )}
            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <p style={{ marginTop: 0 }}>
                    <AppText id={`oppsummering.arbeidIPeriode.jobberIPerioden.${arbeidIPeriode.jobberIPerioden}`} />
                </p>
            )}
            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager && (
                <VStack gap="space-32">
                    <Heading size="xsmall" level="4" spacing={true}>
                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />
                    </Heading>
                    <TidEnkeltdager
                        dager={fjernDagerIkkeSøktForOgUtenArbeidstid(arbeidIPeriode.enkeltdager, dagerMedPleie)}
                        renderAsAccordion={false}
                        headingLevel="5"
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default ArbeidIPeriodeSummaryItem;
