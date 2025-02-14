import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
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

const ArbeidIPeriodeSummaryItem: React.FC<Props> = ({ arbeidIPeriode }) => {
    return (
        <>
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
                <Block margin="xl">
                    <Heading size="xsmall" level="4" spacing={true}>
                        <AppText id="oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading" />
                    </Heading>
                    <TidEnkeltdager dager={arbeidIPeriode.enkeltdager} renderAsAccordion={false} headingLevel="5" />
                </Block>
            )}
        </>
    );
};

export default ArbeidIPeriodeSummaryItem;
