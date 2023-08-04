import React from 'react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { OpptjeningIUtlandetApiData } from '../../../types/søknad-api-data/_SøknadApiData';

const bem = bemUtils('opptjeningIUtlandetSummaryItem');

export const renderOpptjeningIUtlandetSummary = (opptjening: OpptjeningIUtlandetApiData): React.ReactNode => {
    return (
        <div className={bem.block}>
            <span className={bem.element('dates')}>
                {prettifyDateExtended(ISODateToDate(opptjening.fraOgMed))} -{' '}
                {prettifyDateExtended(ISODateToDate(opptjening.tilOgMed))}
            </span>
            <span>{`Jobbet i ${opptjening.land.landnavn} som ${opptjening.opptjeningType.toLowerCase()} hos ${
                opptjening.navn
            }`}</span>
        </div>
    );
};
