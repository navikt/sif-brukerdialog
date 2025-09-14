import { Accordion, Heading, VStack } from '@navikt/ds-react';
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

const TidEnkeltdager = ({ dager, renderAsAccordion = false, visUke = false, headingLevel = '5' }: Props) => {
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
            <VStack gap="8">
                {Object.keys(months).map((key) => {
                    const dagerMedTid = months[key];
                    if (dagerMedTid.length === 0) {
                        return ingenDagerRegistrertMelding;
                    }
                    return (
                        <div key={key}>
                            <Heading level={headingLevel} size="xsmall" className="capitalize" spacing>
                                {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                            </Heading>
                            <DagerMedTidListe
                                dagerMedTid={dagerMedTid}
                                viseUke={visUke}
                                ukeHeadingLevel={headingLevel}
                            />
                        </div>
                    );
                })}
            </VStack>
        );
    }
    return (
        <Accordion data-color="neutral">
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
