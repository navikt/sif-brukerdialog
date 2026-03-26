import { Oppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { useUngUiIntl } from '../i18n';
import { AvvikRegisterinntektOppgavePage } from '../modules/oppgaver/avvik-registerinntekt/AvvikRegisterinntektOppgavePage';
import { EndretSluttdatoOppgavePage } from '../modules/oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import { EndretStartOgSluttdatoOppgavePage } from '../modules/oppgaver/endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePage';
import { EndretStartdatoOppgavePage } from '../modules/oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import { FjernetPeriodeOppgavePage } from '../modules/oppgaver/fjernet-periode/FjernetPeriodeOppgavePage';
import { MeldtUtOppgavePage } from '../modules/oppgaver/meldt-ut/MeldtUtOppgavePage';
import { RapporterInntektOppgavePage } from '../modules/oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import { SøkYtelseOppgavePage } from '../modules/oppgaver/søk-ytelse/SøkYtelseOppgavePage';
import { getOppgaveDokumentTittel } from '../utils/textUtils';
import { UngInnsynPage } from './UngInnsynPage';

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

interface Props {
    navn: string;
    oppgave: Oppgave;
    applikasjonTittel: string;
}

export const UngOppgavePage = (props: Props) => {
    const { navn, oppgave, applikasjonTittel } = props;
    const intl = useUngUiIntl();
    return (
        <UngInnsynPage documentTitle={getOppgaveDokumentTittel(applikasjonTittel, oppgave, intl)}>
            {getOppgavePageComponent(navn, oppgave)}
        </UngInnsynPage>
    );
};
