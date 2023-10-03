import { Accordion } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ISODate, ISODateToDate, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import DagerMedTidListe from '../../common/dager-med-tid-liste/DagerMedTidListe';
import { DagMedTid } from '../../types';

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

    const ingenDagerRegistrertMelding = <FormattedMessage id="dagerMedTid.ingenDagerRegistrert" />;
    if (dager.length === 0) {
        return ingenDagerRegistrertMelding;
    }

    const months = groupBy(days, ({ dato }) => `${dato.getFullYear()}.${dato.getMonth()}`);
    return (
        <Accordion>
            {Object.keys(months).map((key) => {
                const dagerMedTid = months[key];
                if (dagerMedTid.length === 0) {
                    return ingenDagerRegistrertMelding;
                }
                return (
                    <Accordion.Item key={key}>
                        <Accordion.Header>
                            <div className="capitalize">{dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}</div>
                        </Accordion.Header>
                        <Accordion.Content>
                            <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={true} />
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

export default TidEnkeltdager;
