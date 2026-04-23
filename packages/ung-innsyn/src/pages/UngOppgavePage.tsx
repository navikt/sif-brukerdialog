import { Oppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { useUngUiIntl } from '../i18n';
import { AvvikRegisterinntektOppgavePanel } from '../modules/oppgavepaneler/avvik-registerinntekt/AvvikRegisterinntektOppgavePanel';
import { BostedVilkårOppgavePanel } from '../modules/oppgavepaneler/bostedsvilkar/BostedVilkarOppgavePanel';
import { EndretSluttdatoOppgavePanel } from '../modules/oppgavepaneler/endret-sluttdato/EndretSluttdatoOppgavePanel';
import { EndretStartOgSluttdatoOppgavePanel } from '../modules/oppgavepaneler/endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePanel';
import { EndretStartdatoOppgavePanel } from '../modules/oppgavepaneler/endret-startdato/EndretStartdatoOppgavePanel';
import { FjernetPeriodeOppgavePanel } from '../modules/oppgavepaneler/fjernet-periode/FjernetPeriodeOppgavePanel';
import { MeldtUtOppgavePanel } from '../modules/oppgavepaneler/meldt-ut/MeldtUtOppgavePanel';
import { RapporterInntektOppgavePanel } from '../modules/oppgavepaneler/rapporter-inntekt/RapporterInntektOppgavePanel';
import { SøkYtelseOppgavePanel } from '../modules/oppgavepaneler/sok-ytelse/SokYtelseOppgavePanel';
import { getOppgaveDokumentTittel } from '../utils/textUtils';
import { OppgavePageContext } from './hooks/useOppgavePage';
import { UngInnsynPage } from './UngInnsynPage';

const getOppgavePageComponent = (navn: string, oppgave: Oppgave) => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <AvvikRegisterinntektOppgavePanel oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.BEKREFT_BOSTED:
            return <BostedVilkårOppgavePanel navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePanel navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePanel navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_MELDT_UT:
            return <MeldtUtOppgavePanel navn={navn} oppgave={oppgave} />;
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePanel oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePanel oppgave={oppgave} />;
        case ParsedOppgavetype.BEKREFT_FJERNET_PERIODE:
            return <FjernetPeriodeOppgavePanel oppgave={oppgave} navn={navn} />;
        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return <EndretStartOgSluttdatoOppgavePanel navn={navn} oppgave={oppgave} />;
    }
};

interface Props {
    navn: string;
    oppgave: Oppgave;
    applikasjonTittel: string;
    onCancel: () => void;
    onSuccess?: () => void;
}

export const UngOppgavePage = (props: Props) => {
    const { navn, oppgave, applikasjonTittel, onCancel, onSuccess } = props;
    const intl = useUngUiIntl();
    return (
        <OppgavePageContext.Provider value={{ onCancel, onSuccess }}>
            <UngInnsynPage documentTitle={getOppgaveDokumentTittel(applikasjonTittel, oppgave, intl)}>
                {getOppgavePageComponent(navn, oppgave)}
            </UngInnsynPage>
        </OppgavePageContext.Provider>
    );
};
