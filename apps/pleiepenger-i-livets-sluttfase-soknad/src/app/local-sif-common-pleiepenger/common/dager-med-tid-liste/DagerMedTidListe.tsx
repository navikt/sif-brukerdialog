import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { DagMedTid } from '../..';
import DurationText from '../duration-text/DurationText';
import './dagerMedTidListe.less';

interface Props {
    dagerMedTid: DagMedTid[];
    viseUke?: boolean;
    visNormaltid?: boolean;
    headingLevel?: number;
}

const sortDays = (d1: DagMedTid, d2: DagMedTid): number => (dayjs(d1.dato).isSameOrBefore(d2.dato, 'day') ? -1 : 1);

const bem = bemUtils('dagerMedTidListe');

const renderDagMedTid = (dag: DagMedTid, visNormaltid?: boolean): React.ReactNode => {
    const timer = dag.tid.hours || '0';
    const minutter = dag.tid.minutes || '0';
    return (
        <div className={bem.element('dag')}>
            <span className={bem.element('dag__dato')}>{dayjs(dag.dato).format('dddd DD.MM.YYYY')}:</span>
            <span className={bem.element('dag__tid')}>
                <DurationText duration={{ hours: timer, minutes: minutter }} fullText={true} />
                {visNormaltid && dag.normaltid && (
                    <>
                        . Normalt <DurationText duration={dag.normaltid} fullText={true} />.
                    </>
                )}
            </span>
        </div>
    );
};

const renderDagerMedTid = (dager: DagMedTid[], visNormaltid?: boolean) => {
    return (
        <ol className={bem.element('dager')}>
            {dager.sort(sortDays).map((dag, idx) => {
                return <li key={idx}>{renderDagMedTid(dag, visNormaltid)}</li>;
            })}
        </ol>
    );
};

export const DagerMedTidListe = ({ dagerMedTid, viseUke, visNormaltid, headingLevel = 5 }: Props) => {
    const weeksWithDays = groupBy(dagerMedTid, (dag) => `${dag.dato.getFullYear()}-${dayjs(dag.dato).isoWeek()}`);
    return (
        <div className={bem.block}>
            {viseUke ? (
                <div className={bem.element('uker')}>
                    {Object.keys(weeksWithDays).map((key) => {
                        const days = weeksWithDays[key];
                        return (
                            <div key={key} className={bem.element('uke', viseUke ? undefined : 'utenUkenummer')}>
                                {viseUke && (
                                    <Heading
                                        level={`${headingLevel}` as any}
                                        size="xsmall"
                                        className={bem.element('uketittel')}>
                                        <FormattedMessage
                                            id="dagerMedTid.uke"
                                            values={{ uke: dayjs(days[0].dato).isoWeek() }}
                                        />
                                    </Heading>
                                )}
                                {renderDagerMedTid(days, visNormaltid)}
                            </div>
                        );
                    })}
                </div>
            ) : (
                renderDagerMedTid(dagerMedTid, visNormaltid)
            )}
        </div>
    );
};

export default DagerMedTidListe;
