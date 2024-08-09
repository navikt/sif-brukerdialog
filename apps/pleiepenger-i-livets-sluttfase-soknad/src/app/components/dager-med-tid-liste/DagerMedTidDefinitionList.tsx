import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DurationText } from '@navikt/sif-common-ui';
import dayjs from 'dayjs';
import { DagMedTid } from '../../types/DagMedTid';
import './dagerMedTidListe.less';
import { dateToISODate } from '@navikt/sif-common-utils';

interface Props {
    dagerMedTid: DagMedTid[];
    viseUke?: boolean;
    visNormaltid?: boolean;
    headingLevel?: number;
}

const sortDays = (d1: DagMedTid, d2: DagMedTid): number => (dayjs(d1.dato).isSameOrBefore(d2.dato, 'day') ? -1 : 1);

const bem = bemUtils('dagerMedTidListe');

export const DagerMedTidDefinitionList = ({ dagerMedTid }: Props) => {
    return (
        <dl className={bem.element('dager')}>
            {dagerMedTid.sort(sortDays).map((dag) => {
                const timer = dag.tid.hours || '0';
                const minutter = dag.tid.minutes || '0';
                return (
                    <div className={bem.element('dag')} key={dateToISODate(dag.dato)}>
                        <dt className={bem.element('dag__dato')}>{dayjs(dag.dato).format('dddd DD.MM.YYYY')}:</dt>
                        <dd className={bem.element('dag__tid')}>
                            <DurationText duration={{ hours: timer, minutes: minutter }} fullText={true} />
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
};

export default DagerMedTidDefinitionList;
