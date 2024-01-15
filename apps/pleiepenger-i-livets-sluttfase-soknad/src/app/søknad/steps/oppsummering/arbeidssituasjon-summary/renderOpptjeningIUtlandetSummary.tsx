import React from 'react';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import './opptjeningIUtlandetSummaryItem.css';

export const renderOpptjeningIUtlandetSummary = (opptjening: OpptjeningIUtlandetApi): React.ReactNode => {
    return (
        <div className={'opptjeningIUtlandetSummaryItem'}>
            <span className={'opptjeningIUtlandetSummaryItem__dates'}>
                {prettifyDateExtended(ISODateToDate(opptjening.fraOgMed))} -{' '}
                {prettifyDateExtended(ISODateToDate(opptjening.tilOgMed))}
            </span>
            <span>{`Jobbet i ${opptjening.land.landnavn} som ${opptjening.opptjeningType.toLowerCase()} hos ${
                opptjening.navn
            }`}</span>
        </div>
    );
};
