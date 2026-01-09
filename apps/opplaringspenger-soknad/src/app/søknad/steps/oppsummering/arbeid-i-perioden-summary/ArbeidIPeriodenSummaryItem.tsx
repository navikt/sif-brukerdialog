import { Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';

import TidEnkeltdager from '../../../../components/tid-enkeltdager/TidEnkeltdager';
import { AppText } from '../../../../i18n';
import { ArbeidIPeriodeApiData, ArbeidsforholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';

interface Props {
    periode: DateRange;
    valgteDatoer: Date[];
    arbeidIPeriode: ArbeidIPeriodeApiData;
    normaltimerUke: number;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const ArbeidIPeriodeSummaryItem = ({ arbeidIPeriode }: Props) => {
    return (
        <VStack gap="8">
            <>
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
            </>

            {arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager && (
                <VStack gap="8">
                    <Heading size="small" level="4">
                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />
                    </Heading>
                    <TidEnkeltdager dager={arbeidIPeriode.enkeltdager} renderAsAccordion={false} headingLevel="5" />
                </VStack>
            )}
        </VStack>
    );
};

export default ArbeidIPeriodeSummaryItem;
