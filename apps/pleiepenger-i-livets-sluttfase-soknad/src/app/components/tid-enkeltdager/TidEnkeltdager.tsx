import { Accordion, Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ISODate, ISODateToDate, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { DagMedTid } from '../../types/DagMedTid';
import DagerMedTidListe from '../dager-med-tid-liste/DagerMedTidListe';

interface ISODagMedTid {
    dato: ISODate;
    tid: ISODuration;
}

interface Props {
    dager: ISODagMedTid[];
    renderAsAccordion?: boolean;
    visUke?: boolean;
    headingLevel?: number;
}

const TidEnkeltdager: React.FunctionComponent<Props> = ({
    dager,
    renderAsAccordion = false,
    visUke = false,
    headingLevel = 5,
}) => {
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
    if (!renderAsAccordion) {
        return (
            <div>
                {Object.keys(months).map((key, index) => {
                    const dagerMedTid = months[key];
                    if (dagerMedTid.length === 0) {
                        return ingenDagerRegistrertMelding;
                    }
                    return (
                        <div key={key} style={{ paddingTop: index > 0 ? '2rem' : '.5rem' }}>
                            <Heading level="5" size="xsmall" className="capitalize">
                                {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                            </Heading>
                            <Block margin="l">
                                <DagerMedTidListe
                                    dagerMedTid={dagerMedTid}
                                    viseUke={visUke}
                                    headingLevel={headingLevel}
                                />
                            </Block>
                        </div>
                    );
                })}
            </div>
        );
    }
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
                            <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={visUke} headingLevel={headingLevel} />
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

export default TidEnkeltdager;
