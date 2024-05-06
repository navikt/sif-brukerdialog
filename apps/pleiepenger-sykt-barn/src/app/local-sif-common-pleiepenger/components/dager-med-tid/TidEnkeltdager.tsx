import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { ISODate, ISODateToDate, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import { AppText } from '../../../i18n';
import { DagMedTid } from '../../types/DagMedTid';
import DagerMedTidListe from '../dager-med-tid-liste/DagerMedTidListe';

interface ISODagMedTid {
    dato: ISODate;
    tid: ISODuration;
}

interface Props {
    dager: ISODagMedTid[];
}

const TidEnkeltdager: React.FunctionComponent<Props> = ({ dager }) => {
    const days: DagMedTid[] = [];
    dager.forEach((dag) => {
        const dato = ISODateToDate(dag.dato);
        const tid = ISODurationToDuration(dag.tid);
        if (dato && tid) {
            days.push({ dato, tid });
        }
    });

    const ingenDagerRegistrertMelding = <AppText id="dagerMedTid.ingenDagerRegistrert" />;
    if (dager.length === 0) {
        return ingenDagerRegistrertMelding;
    }

    const months = groupBy(days, ({ dato }) => `${dato.getFullYear()}.${dato.getMonth()}`);
    return (
        <div>
            {Object.keys(months).map((key) => {
                const dagerMedTid = months[key];
                if (dagerMedTid.length === 0) {
                    return ingenDagerRegistrertMelding;
                }
                return (
                    <Block margin="m" key={key}>
                        <ExpandableInfo title={dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}>
                            <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={true} />
                        </ExpandableInfo>
                    </Block>
                );
            })}
        </div>
    );
};

export default TidEnkeltdager;
