import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ISODate, ISODateToDate, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import DagerMedTidListe from '../../common/dager-med-tid-liste/DagerMedTidListe';
import { DagMedTid } from '../../types';
import { groupBy } from 'lodash';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Accordion } from '@navikt/ds-react';

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
        <div>
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
                                    {' '}
                                    <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={true} />
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </Block>
                );
            })}
        </div>
    );
};

export default TidEnkeltdager;
