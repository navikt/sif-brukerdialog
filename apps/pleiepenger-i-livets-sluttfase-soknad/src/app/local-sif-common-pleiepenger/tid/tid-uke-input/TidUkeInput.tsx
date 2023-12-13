import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DateDurationMap, isDateInDates } from '@navikt/sif-common-utils';
import { TidPerDagValidator } from '../..';
import { Daginfo, Ukeinfo } from '../../types';
import { tidUkerInputUtils } from '../tid-uker-input/tidUkerUtils';
import { FormikTimeInput } from '@navikt/sif-common-formik-ds/lib';
import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

type DagLabelRenderer = (dag: Daginfo) => React.ReactNode;

interface Props {
    getFieldName: (dag: Daginfo) => string;
    ukeinfo: Ukeinfo;
    opprinneligTid?: DateDurationMap;
    isNarrow: boolean;
    isWide: boolean;
    utilgjengeligeDatoer?: Date[];
    visSomListe?: boolean;
    tidPerDagValidator?: TidPerDagValidator;
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    dagLabelRenderer?: (dag: Daginfo) => React.ReactNode;
}

const renderDagLabel = (dag: Daginfo, customRenderer?: DagLabelRenderer): JSX.Element => {
    return (
        <span className={bem.element('dag__label')}>
            {customRenderer ? (
                customRenderer(dag)
            ) : (
                <>
                    <span className={bem.element('dag__label__dagnavn')}>{dag.labelDag}</span>
                    <span className={bem.element('dag__label__dato')}>{dag.labelDato}</span>
                </>
            )}
        </span>
    );
};

const bem = bemUtils('tidUkerInput');

const TidUkeInput: React.FunctionComponent<Props> = ({
    ukeinfo,
    utilgjengeligeDatoer,
    visSomListe,
    getFieldName,
    dagLabelRenderer,
    tidPerDagValidator,
    ukeTittelRenderer,
    isWide,
}) => {
    const { dager, ukenummer, år } = ukeinfo;

    return (
        <div className={bem.element('uke')}>
            {ukeTittelRenderer ? (
                ukeTittelRenderer(ukeinfo)
            ) : (
                <Heading level="2" size="small">
                    <FormattedMessage id="ukeÅr" values={{ ukenummer, år }} />
                </Heading>
            )}

            <div className={bem.element('uke__ukedager', isWide && visSomListe !== true ? 'grid' : 'liste')}>
                {tidUkerInputUtils.getForegåendeDagerIUke(dager[0]).map((dag) => (
                    <div className={bem.element('dag', 'utenforPeriode')} key={dag.isoDate} aria-hidden={true}>
                        {renderDagLabel(dag, dagLabelRenderer)}
                        <div className={bem.element('dag__utenforPeriodeIkon')}>-</div>
                    </div>
                ))}
                {dager.map((dag) => {
                    const erUtilgjengelig = isDateInDates(dag.dato, utilgjengeligeDatoer);
                    return (
                        <div
                            key={dag.isoDate}
                            className={bem.element('dag', erUtilgjengelig ? 'utilgjengelig' : undefined)}>
                            {erUtilgjengelig ? (
                                <span />
                            ) : (
                                <FormikTimeInput
                                    name={getFieldName(dag)}
                                    label={renderDagLabel(dag, dagLabelRenderer)}
                                    timeInputLayout={{
                                        direction: 'horizontal',
                                    }}
                                    validate={tidPerDagValidator ? tidPerDagValidator(dag.labelFull) : undefined}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TidUkeInput;
