import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { tidUkerInputUtils } from '../../tid/tid-uker-input/tidUkerUtils';
import { Daginfo, Ukeinfo } from '../../types';
import ArbeidstidUkeInput, {
    ArbeidstidUkeInputEnkeltdagValidator,
    ArbeidstidUkeTekster,
    getUkeTittel,
} from '../arbeidstid-uke-input/ArbeidstidUkeInput';
import './arbeidstidUkerInput.less';
import { DateRange, TestProps } from '@navikt/sif-common-formik-ds';
import { DurationWeekdays, InputDateDurationMap, Weekday, isDateInDates } from '@navikt/sif-common-utils';
import { Accordion } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

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
                uke.dager.filter((dag) => isDateInDates(dag.dato, utilgjengeligeDatoer)).length !== uke.dager.length,
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
                            <Accordion>
                                <Accordion.Item>
                                    <Accordion.Header>{getUkeTittel(uke)}</Accordion.Header>
                                    <Accordion.Content>
                                        <Block margin="m">{renderUke(uke, false)}</Block>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
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
