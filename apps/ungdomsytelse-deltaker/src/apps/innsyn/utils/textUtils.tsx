import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppIntlShape } from '@shared/i18n';
import { BekreftelseOppgave, Oppgave, ParsedOppgaveBase, ParsedOppgavetype } from '@shared/types/Oppgave';

import { UttalelseSvaralternativer } from '../modules/forms/uttalelse-form/UtalelseForm';

const renderDatoOgKlokkeslett = (dato?: Date) => {
    return dato ? dateFormatter.compactWithTime(dato) : '';
};

export const getOppgaveTittel = (oppgave: Oppgave | BekreftelseOppgave, { text }: AppIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`, {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`, {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
                måned: oppgave.oppgavetypeData ? dateFormatter.month(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        default:
            return text(`oppgavetype.${oppgave.oppgavetype}.oppgavetittel`);
    }
};

export const getOppgavePanelTittel = (oppgave: Oppgave | BekreftelseOppgave, { text }: AppIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.paneltittel', {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.paneltittel', {
                månedOgÅr: oppgave.oppgavetypeData ? dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed) : '',
                måned: oppgave.oppgavetypeData ? dateFormatter.month(oppgave.oppgavetypeData.fraOgMed) : '',
            });
        default:
            return text(`oppgavetype.${oppgave.oppgavetype}.paneltittel`);
    }
};

export const getOppgaveInfo = (oppgave: Oppgave, { text }: AppIntlShape): string => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return text('oppgavetype.RAPPORTER_INNTEKT.info', {
                måned: dateFormatter.month(oppgave.oppgavetypeData.fraOgMed),
            });
        default:
            return text(`oppgavetype.${oppgave.oppgavetype}.info`);
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
        case OppgaveStatus.LUKKET:
            return `Lukket ${renderDatoOgKlokkeslett(oppgave.lukketDato)}`;
        case OppgaveStatus.UTLØPT:
            return `Oppgave er utløpt`;
    }
};

export const getTilbakemeldingSpørsmål = (oppgave: BekreftelseOppgave, { text }: AppIntlShape) => {
    return text(`oppgavetype.${oppgave.oppgavetype}.harTilbakemeldingSpørsmål`);
};

export const getSvaralternativer = (oppgave: BekreftelseOppgave, { text }: AppIntlShape): UttalelseSvaralternativer => {
    return {
        harIkkeUttalelseLabel: text(`oppgavetype.${oppgave.oppgavetype}.harIkkeUttalelseLabel`),
        harUttalelseLabel: text(`oppgavetype.${oppgave.oppgavetype}.harUttalelseLabel`),
    };
};

export const getTilbakemeldingFritekstLabel = (oppgave: BekreftelseOppgave, { text }: AppIntlShape) => {
    return text(`oppgavetype.${oppgave.oppgavetype}.tilbakemeldingFritekstLabel`);
};

export const getOppgaveDokumentTittel = (oppgave: Oppgave, intl: AppIntlShape) => {
    return getDokumentTittel(getOppgaveTittel(oppgave, intl));
};

export const getDokumentTittel = (sidetittel: string) => {
    return `${sidetittel} - Din ungdomsprogramytelse`;
};
