import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import React from 'react';

import { OpptjeningIUtlandetApiData } from '../../../types/søknad-api-data/SøknadApiData';

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
