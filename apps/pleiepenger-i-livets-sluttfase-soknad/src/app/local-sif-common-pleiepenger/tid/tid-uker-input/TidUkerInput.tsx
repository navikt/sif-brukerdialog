import React from 'react';
import { useMediaQuery } from 'react-responsive';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, isDateInDates } from '@navikt/sif-common-utils/lib';
import { Daginfo, TidPerDagValidator, Ukeinfo } from '../../types';
import TidUkeInput from '../tid-uke-input/TidUkeInput';
import { tidUkerInputUtils } from './tidUkerUtils';
import './tidUkerInput.less';

const getTidKalenderFieldName = (fieldName: string, dag: Daginfo): string => `${fieldName}.${dag.isoDate}`;

interface Props {
    fieldName: string;
    periode: DateRange;
    opprinneligTid?: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    tidPerDagValidator?: TidPerDagValidator;
}

const bem = bemUtils('tidUkerInput');

export const TidUkerInput: React.FunctionComponent<Props> = ({
    fieldName,
    periode,
    opprinneligTid,
    utilgjengeligeDatoer,
    ukeTittelRenderer,
    tidPerDagValidator,
}) => {
    const isNarrow = useMediaQuery({ maxWidth: 400 });
    const isWide = useMediaQuery({ minWidth: 1050 });

    const dager = tidUkerInputUtils.getDagInfoForPeriode(periode);
    const uker = tidUkerInputUtils
        .getUkerFraDager(dager)
        .filter(
            (uke) =>
                uke.dager.filter((dag) => isDateInDates(dag.dato, utilgjengeligeDatoer)).length !== uke.dager.length,
        );

    return (
        <div className={bem.classNames(bem.block, bem.modifier('inlineForm'))}>
            {uker.map((uke) => {
                const content = (
                    <TidUkeInput
                        ukeTittelRenderer={ukeTittelRenderer}
                        getFieldName={(dag) => getTidKalenderFieldName(fieldName, dag)}
                        ukeinfo={uke}
                        opprinneligTid={opprinneligTid}
                        utilgjengeligeDatoer={utilgjengeligeDatoer}
                        isNarrow={isNarrow}
                        isWide={isWide}
                        visSomListe={true}
                        tidPerDagValidator={tidPerDagValidator}
                    />
                );
                return (
                    <div key={uke.ukenummer} className={bem.element('ukeWrapper')}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
};

export default TidUkerInput;
