import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { BekreftelseOppgave, Oppgave, ParsedOppgaveBase, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { UngUiIntlShape } from '../i18n';
import { UttalelseSvaralternativer } from '../types';

const renderDatoOgKlokkeslett = (dato?: Date) => {
    return dato ? dateFormatter.compactWithTime(dato) : '';
};

export const getOppgaveTittel = (oppgave: Oppgave | BekreftelseOppgave, { text }: UngUiIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.oppgavetittel`, {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.oppgavetittel`, {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
                måned: oppgave.oppgavetypeData ? dateFormatter.month(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        default:
            return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.oppgavetittel`);
    }
};

export const getOppgavePanelTittel = (oppgave: Oppgave | BekreftelseOppgave, { text }: UngUiIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.paneltittel', {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text('@ungUi.oppgavetype.RAPPORTER_INNTEKT.paneltittel', {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
                måned: oppgave.oppgavetypeData ? dateFormatter.month(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        default:
            return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.paneltittel`);
    }
};

export const getOppgaveInfo = (oppgave: Oppgave, { text }: UngUiIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text('@ungUi.oppgavetype.RAPPORTER_INNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        default:
            return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.info`);
    }
};

export const getOppgaveStatusText = (oppgave: ParsedOppgaveBase): string => {
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
            return `Sendt inn ${renderDatoOgKlokkeslett(oppgave.løstDato)}`;
        case OppgaveStatus.ULØST:
            return `Frist: senest ${dateFormatter.full(oppgave.sisteDatoEnKanSvare)}`;
        case OppgaveStatus.AVBRUTT:
            return 'Oppgave er avbrutt';
        case OppgaveStatus.UTLØPT:
            return `Oppgave er utløpt`;
    }
};

export const getTilbakemeldingSpørsmål = (oppgave: BekreftelseOppgave, { text }: UngUiIntlShape) => {
    return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.harTilbakemeldingSpørsmål`);
};

export const getSvaralternativer = (
    oppgave: BekreftelseOppgave,
    { text }: UngUiIntlShape,
): UttalelseSvaralternativer => {
    return {
        harIkkeUttalelseLabel: text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.harIkkeUttalelseLabel`),
        harUttalelseLabel: text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.harUttalelseLabel`),
    };
};

export const getTilbakemeldingFritekstLabel = (oppgave: BekreftelseOppgave, { text }: UngUiIntlShape) => {
    return text(`@ungUi.oppgavetype.${oppgave.oppgavetype}.tilbakemeldingFritekstLabel`);
};

export const getOppgaveDokumentTittel = (applikasjonTittel: string, oppgave: Oppgave, intl: UngUiIntlShape) => {
    return getDokumentTittel(getOppgaveTittel(oppgave, intl), applikasjonTittel);
};

export const getDokumentTittel = (sidetittel: string, applikasjonTittel: string) => {
    return `${sidetittel} - ${applikasjonTittel}`;
};
