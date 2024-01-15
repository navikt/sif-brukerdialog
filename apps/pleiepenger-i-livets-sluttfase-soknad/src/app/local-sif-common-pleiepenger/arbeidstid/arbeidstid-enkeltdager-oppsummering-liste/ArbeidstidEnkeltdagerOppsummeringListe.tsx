import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ISODateToDate, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import DagerMedTidListe from '../../common/dager-med-tid-liste/DagerMedTidListe';
import { ArbeidstidEnkeltdagApiData, DagMedTid } from '../../types';
import { groupBy } from 'lodash';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Accordion } from '@navikt/ds-react';

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
                    <Block margin="m" key={key}>
                        <Accordion>
                            <Accordion.Item>
                                <Accordion.Header>
                                    <span style={{ textTransform: 'capitalize', fontSize: '1rem' }}>
                                        {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                                    </span>
                                </Accordion.Header>
                                <Accordion.Content>
                                    <DagerMedTidListe
                                        dagerMedTid={dagerMedTid}
                                        viseUke={true}
                                        visNormaltid={visNormaltid}
                                    />
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </Block>
                );
            })}
        </>
    );
};

export default ArbeidstidEnkeltdagerOppsummering;
