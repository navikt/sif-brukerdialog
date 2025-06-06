import { Accordion, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { ISODate, ISODateToDate, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { AppText } from '../../i18n';
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
    headingLevel?: '2' | '3' | '4' | '5';
}

const TidEnkeltdager: React.FunctionComponent<Props> = ({
    dager,
    renderAsAccordion = false,
    visUke = false,
    headingLevel = '5',
}) => {
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
                            <Heading level={headingLevel} size="xsmall" className="capitalize">
                                {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                            </Heading>
                            <Block margin="l">
                                <DagerMedTidListe
                                    dagerMedTid={dagerMedTid}
                                    viseUke={visUke}
                                    ukeHeadingLevel={headingLevel}
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
                            <DagerMedTidListe
                                dagerMedTid={dagerMedTid}
                                viseUke={visUke}
                                ukeHeadingLevel={headingLevel}
                            />
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

export default TidEnkeltdager;
