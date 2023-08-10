import React from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { DateRange, TestProps } from '@navikt/sif-common-formik';
import { DurationWeekdays, InputDateDurationMap, isDateInDates, Weekday } from '@navikt/sif-common-utils/lib';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { tidUkerInputUtils } from '../../tid/tid-uker-input/tidUkerUtils';
import { Daginfo, Ukeinfo } from '../../types';
import ArbeidstidUkeInput, {
    ArbeidstidUkeInputEnkeltdagValidator,
    ArbeidstidUkeTekster,
    getUkeTittel,
} from '../arbeidstid-uke-input/ArbeidstidUkeInput';
import './arbeidstidUkerInput.less';

const getTidKalenderFieldName = (fieldName: string, dag: Daginfo): string => `${fieldName}.${dag.isoDate}`;

interface OwnProps {
    fieldName: string;
    arbeidstid: InputDateDurationMap;
    periode: DateRange;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligeUkedager?: Weekday[];
    tekster: ArbeidstidUkeTekster;
    normalarbeidstidUkedager?: DurationWeekdays;
    useExpandablePanel?: boolean;
    beregnFravær?: boolean;
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    enkeltdagValidator?: ArbeidstidUkeInputEnkeltdagValidator;
}

type Props = OwnProps & TestProps;

const bem = bemUtils('arbeidstidUkerInput');

export const ArbeidstidUkerInput: React.FunctionComponent<Props> = ({
    fieldName,
    periode,
    arbeidstid,
    utilgjengeligeDatoer,
    utilgjengeligeUkedager,
    normalarbeidstidUkedager,
    tekster,
    beregnFravær,
    useExpandablePanel,
    enkeltdagValidator,
    'data-testid': testId,
}) => {
    const dager = tidUkerInputUtils.getDagInfoForPeriode(periode);
    const uker = tidUkerInputUtils
        .getUkerFraDager(dager)
        .filter(
            (uke) =>
                uke.dager.filter((dag) => isDateInDates(dag.dato, utilgjengeligeDatoer)).length !== uke.dager.length
        );

    const renderUke = (uke: Ukeinfo, visUkeTittel: boolean) => (
        <div key={uke.ukenummer} className={bem.element('ukeWrapper')}>
            <ArbeidstidUkeInput
                getFieldName={(dag) => getTidKalenderFieldName(fieldName, dag)}
                getDagValue={(dag) => {
                    const dur = arbeidstid[dag.isoDate];
                    return {
                        hours: dur?.hours || '0',
                        minutes: dur?.minutes || '0',
                    };
                }}
                data-testid={testId}
                beregnFravær={beregnFravær}
                visUkeTittel={visUkeTittel}
                ukeinfo={uke}
                utilgjengeligeDatoer={utilgjengeligeDatoer}
                utilgjengeligeUkedager={utilgjengeligeUkedager}
                normalarbeidstidUkedager={normalarbeidstidUkedager}
                enkeltdagValidator={enkeltdagValidator}
                tekst={tekster}
            />
        </div>
    );

    return (
        <div className={bem.block}>
            {uker.map((uke) => {
                if (useExpandablePanel) {
                    return (
                        <div key={uke.ukenummer} className={bem.element('ukeWrapper', 'expandable')}>
                            <Ekspanderbartpanel tittel={getUkeTittel(uke)}>
                                <Box margin="m">{renderUke(uke, false)}</Box>
                            </Ekspanderbartpanel>
                        </div>
                    );
                } else {
                    return (
                        <div key={uke.ukenummer} className={bem.element('ukeWrapper')}>
                            {renderUke(uke, true)}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ArbeidstidUkerInput;
