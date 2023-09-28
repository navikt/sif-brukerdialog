import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ArbeidIPeriodeApiData, ArbeidsforholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { JobberIPeriodeSvar } from '../../arbeidstid/ArbeidstidTypes';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { TidEnkeltdager } from '../../../../local-sif-common-pleiepenger';

interface Props {
    periode: DateRange;
    arbeidIPeriode: ArbeidIPeriodeApiData;
    normaltimerUke: number;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const ArbeidIPeriodeSummaryItem: React.FC<Props> = ({ arbeidIPeriode }) => {
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
                <Block margin="m">
                    <TidEnkeltdager dager={arbeidIPeriode.enkeltdager} />
                </Block>
            )}
        </>
    );
};

export default ArbeidIPeriodeSummaryItem;
