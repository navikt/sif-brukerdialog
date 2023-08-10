import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { ISODateToDate, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import DagerMedTidListe from '../../common/dager-med-tid-liste/DagerMedTidListe';
import { ArbeidstidEnkeltdagApiData, DagMedTid } from '../../types';

export interface ArbeidstidEnkeltdagerOppsummeringProps {
    dager: ArbeidstidEnkeltdagApiData[];
    visNormaltid?: boolean;
}

export const mapArbeidstidEnkeltdagApiDataToDagMedTid = (dag: ArbeidstidEnkeltdagApiData): DagMedTid => {
    const dato = ISODateToDate(dag.dato);
    const tid = ISODurationToDuration(dag.arbeidstimer.faktiskTimer);
    const normaltid = ISODurationToDuration(dag.arbeidstimer.normalTimer);
    return { dato, tid, normaltid };
};

const ArbeidstidEnkeltdagerOppsummering: React.FunctionComponent<ArbeidstidEnkeltdagerOppsummeringProps> = ({
    dager,
    visNormaltid,
}) => {
    const ingenDagerRegistrertMelding = <FormattedMessage id="dagerMedTid.ingenDagerRegistrert" />;
    if (dager.length === 0) {
        return ingenDagerRegistrertMelding;
    }
    const dagerMedTid = dager.map(mapArbeidstidEnkeltdagApiDataToDagMedTid);
    const months = groupBy(dagerMedTid, ({ dato }) => `${dato.getFullYear()}.${dato.getMonth()}`);
    return (
        <>
            {Object.keys(months).map((key) => {
                const dagerMedTid = months[key];
                if (dagerMedTid.length === 0) {
                    return ingenDagerRegistrertMelding;
                }
                return (
                    <Box margin="m" key={key}>
                        <EkspanderbartPanel
                            tittel={
                                <span style={{ textTransform: 'capitalize', fontSize: '1rem' }}>
                                    {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                                </span>
                            }>
                            <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={true} visNormaltid={visNormaltid} />
                        </EkspanderbartPanel>
                    </Box>
                );
            })}
        </>
    );
};

export default ArbeidstidEnkeltdagerOppsummering;
