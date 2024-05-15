import { Heading } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { DagMedTid } from '../../types/DagMedTid';
import './dagerMedTidListe.less';
import { AppText } from '../../../i18n';

interface Props {
    dagerMedTid: DagMedTid[];
    visMåned?: boolean;
    viseUke?: boolean;
    visNormaltid?: boolean;
}

const sortDays = (d1: DagMedTid, d2: DagMedTid): number => (dayjs(d1.dato).isSameOrBefore(d2.dato, 'day') ? -1 : 1);

const bem = bemUtils('dagerMedTidListe');

export const DagerMedTidListe = ({ dagerMedTid, viseUke, visMåned, visNormaltid }: Props) => {
    const weeksWithDays = groupBy(dagerMedTid, (dag) => `${dag.dato.getFullYear()}-${dayjs(dag.dato).isoWeek()}`);
    return (
        <div className={bem.block}>
            {visMåned && (
                <Heading level="2" size="medium" className="m-caps">
                    {dayjs(dagerMedTid[0].dato).format('MMM YYYY')}
                </Heading>
            )}
            <div className={bem.element('uker')}>
                {Object.keys(weeksWithDays).map((key) => {
                    const days = weeksWithDays[key];
                    return (
                        <div key={key} className={bem.element('uke')}>
                            {viseUke && (
                                <Heading level="3" size="xsmall" className={bem.element('uketittel')}>
                                    <AppText id="dagerMedTid.uke" values={{ uke: dayjs(days[0].dato).isoWeek() }} />
                                </Heading>
                            )}
                            <ol className={bem.element('dager')}>
                                {days.sort(sortDays).map((dag, idx) => {
                                    const timer = dag.tid.hours || '0';
                                    const minutter = dag.tid.minutes || '0';

                                    return (
                                        <li key={idx}>
                                            <div className={bem.element('dag')}>
                                                <span className={bem.element('dag__dato')}>
                                                    {dayjs(dag.dato).format('dddd DD.MM.YYYY')}:
                                                </span>
                                                <span className={bem.element('dag__tid')}>
                                                    <DurationText
                                                        duration={{ hours: timer, minutes: minutter }}
                                                        fullText={true}
                                                    />
                                                    {visNormaltid && dag.normaltid && (
                                                        <>
                                                            . Normalt{' '}
                                                            <DurationText duration={dag.normaltid} fullText={true} />.
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DagerMedTidListe;
