// import { AvvikRegisterinntektOppgave, Oppgave, ParsedOppgavetype } from "@sif/api/ung-brukerdialog";

import { Oppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { AvvikRegisterinntektOppgavePage } from './avvik-registerinntekt/AvvikRegisterinntektOppgavePage';
import { EndretSluttdatoOppgavePage } from './endret-sluttdato/EndretSluttdatoOppgavePage';
import { EndretStartOgSluttdatoOppgavePage } from './endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePage';
import { EndretStartdatoOppgavePage } from './endret-startdato/EndretStartdatoOppgavePage';
import { FjernetPeriodeOppgavePage } from './fjernet-periode/FjernetPeriodeOppgavePage';
import { MeldtUtOppgavePage } from './meldt-ut/MeldtUtOppgavePage';
import { RapporterInntektOppgavePage } from './rapporter-inntekt/RapporterInntektOppgavePage';
import { SøkYtelseOppgavePage } from './søk-ytelse/SøkYtelseOppgavePage';

const getOppgavePageComponent = (navn: string, oppgave: Oppgave) => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <AvvikRegisterinntektOppgavePage oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePage navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePage navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_MELDT_UT:
            return <MeldtUtOppgavePage navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_FJERNET_PERIODE:
            return <FjernetPeriodeOppgavePage oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return <EndretStartOgSluttdatoOppgavePage navn={navn} oppgave={oppgave} />;
    }
};

export const OppgaveRenderer = (props: { navn: string; oppgave: Oppgave }) => {
    const { navn, oppgave } = props;
    return getOppgavePageComponent(navn, oppgave);
};
