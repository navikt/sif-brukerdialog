import { BoxNew, Heading, HGrid, VStack } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { AppText } from '../../i18n';
import { DagMedTid } from '../../types/DagMedTid';

interface Props {
    dagerMedTid: DagMedTid[];
    viseUke?: boolean;
    visNormaltid?: boolean;
    ukeHeadingLevel?: '2' | '3' | '4' | '5';
}

const sortDays = (d1: DagMedTid, d2: DagMedTid): number => (dayjs(d1.dato).isSameOrBefore(d2.dato, 'day') ? -1 : 1);

const renderDagMedTid = (dag: DagMedTid, visNormaltid?: boolean): React.ReactNode => {
    const timer = dag.tid.hours || '0';
    const minutter = dag.tid.minutes || '0';
    return (
        <BoxNew borderColor="info-subtle" padding="2" borderWidth="1 0 0 0">
            <HGrid gap="2" columns={{ sm: '12rem auto', xs: '1fr' }} align="center">
                <span className="capsFirstLetter">{dayjs(dag.dato).format('dddd DD.MM.YYYY')}:</span>
                <span>
                    <DurationText duration={{ hours: timer, minutes: minutter }} fullText={true} />
                    {visNormaltid && dag.normaltid && (
                        <>
                            . Normalt <DurationText duration={dag.normaltid} fullText={true} />.
                        </>
                    )}
                </span>
            </HGrid>
        </BoxNew>
    );
};

const renderDagerMedTid = (dager: DagMedTid[], visNormaltid?: boolean) => {
    return (
        <ul>
            {dager.sort(sortDays).map((dag, idx) => {
                return <li key={idx}>{renderDagMedTid(dag, visNormaltid)}</li>;
            })}
        </ul>
    );
};

export const DagerMedTidListe = ({ dagerMedTid, viseUke, visNormaltid, ukeHeadingLevel = '5' }: Props) => {
    const weeksWithDays = groupBy(dagerMedTid, (dag) => `${dag.dato.getFullYear()}-${dayjs(dag.dato).isoWeek()}`);
    return (
        <VStack gap="8">
            {viseUke ? (
                <div>
                    {Object.keys(weeksWithDays).map((key) => {
                        const days = weeksWithDays[key];
                        return (
                            <VStack gap="4" key={key}>
                                {viseUke && (
                                    <Heading level={`${ukeHeadingLevel}` as any} size="xsmall">
                                        <AppText id="dagerMedTid.uke" values={{ uke: dayjs(days[0].dato).isoWeek() }} />
                                    </Heading>
                                )}
                                {renderDagerMedTid(days, visNormaltid)}
                            </VStack>
                        );
                    })}
                </div>
            ) : (
                renderDagerMedTid(dagerMedTid, visNormaltid)
            )}
        </VStack>
    );
};

export default DagerMedTidListe;
