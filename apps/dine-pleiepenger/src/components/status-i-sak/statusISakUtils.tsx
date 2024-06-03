import { Box } from '@navikt/ds-react';
import { AppText, IntlTextFn as IntlTextFn } from '../../i18n';
import { Innsendelse } from '../../server/api-models/InnsendelseSchema';
import { Innsendelsestype } from '../../server/api-models/Innsendelsestype';
import { Ettersendelsestype } from '../../types/EttersendelseType';
import { Sakshendelse, SakshendelseForventetSvar, Sakshendelser } from '../../types/Sakshendelse';
import { ProcessStepData } from '../process/ProcessStep';
import EndringsmeldingStatusContent from './parts/EndringsmeldingStatusContent';
import EttersendelseStatusContent from './parts/EttersendelseStatusContent';
import FerdigBehandletStatusContent from './parts/FerdigBehandletStatusContent';
import SøknadStatusContent from './parts/SøknadStatusContent';

export const getProcessStepFromInnsendelse = (
    text: IntlTextFn,
    innsendelse: Innsendelse,
    current: boolean,
): ProcessStepData | undefined => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.SØKNAD:
            return {
                title: text('statusISak.mottattSøknad.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <SøknadStatusContent søknad={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ENDRINGSMELDING:
            return {
                title: text('statusISak.mottattEndringsmelding.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EndringsmeldingStatusContent endringsmelding={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ETTERSENDELSE:
            return {
                title: text(
                    innsendelse.k9FormatInnsendelse.type === Ettersendelsestype.legeerklæring
                        ? 'statusISak.mottattEttersendelse.legeerklæring.tittel'
                        : 'statusISak.mottattEttersendelse.annet.tittel',
                ),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EttersendelseStatusContent ettersendelse={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
    }
};

export const getProcessStepsFraSakshendelser = (text: IntlTextFn, hendelser: Sakshendelse[]): ProcessStepData[] => {
    /** Aksjonspunkt skal ikke vises enda */
    const hendelserSomSkalVises = hendelser.filter((h) => h.type !== Sakshendelser.AKSJONSPUNKT);

    if (hendelserSomSkalVises.length === 0) {
        return [];
    }

    const antall = hendelserSomSkalVises.length;
    const erFerdigBehandlet = hendelserSomSkalVises[antall - 1].type === Sakshendelser.FERDIG_BEHANDLET;

    return hendelserSomSkalVises
        .map((hendelse, index): ProcessStepData | undefined => {
            /** Gjeldende hendelse er per må alltid siste hendelse før ferdig behandlet, eller ferdig behandlet */
            const erGjeldendeHendelse = erFerdigBehandlet ? index === antall - 1 : index === antall - 2;

            switch (hendelse.type) {
                case Sakshendelser.MOTTATT_SØKNAD:
                case Sakshendelser.ETTERSENDELSE:
                    return getProcessStepFromInnsendelse(text, hendelse.innsendelse, erGjeldendeHendelse);

                case Sakshendelser.AKSJONSPUNKT:
                    return {
                        title: hendelse.venteårsak,
                        completed: false,
                        current: true,
                        content: '',
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.FERDIG_BEHANDLET:
                    return {
                        title: text('statusISak.ferdigBehandlet.tittel'),
                        content: <FerdigBehandletStatusContent />,
                        completed: true,
                        isLastStep: true,
                        current: erGjeldendeHendelse,
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.FORVENTET_SVAR:
                    const titleContent = getForventetSvarTitleContent(hendelse, text);
                    if (titleContent) {
                        return {
                            ...titleContent,
                            completed: false,
                            isLastStep: true,
                        };
                    }
                    return undefined;
            }
        })
        .filter((h) => h !== undefined) as ProcessStepData[];
};

const getForventetSvarTitleContent = (
    hendelse: SakshendelseForventetSvar,
    text: IntlTextFn,
): Pick<ProcessStepData, 'title' | 'content'> | undefined => {
    const sisteHendelseErEttersendelse =
        hendelse.søknadstyperIBehandling[hendelse.søknadstyperIBehandling.length - 1] ===
        Innsendelsestype.ETTERSENDELSE;
    if (sisteHendelseErEttersendelse) {
        return undefined;
    }
    const inneholderSøknad = hendelse.søknadstyperIBehandling.includes(Innsendelsestype.SØKNAD);
    const inneholderEndring = hendelse.søknadstyperIBehandling.includes(Innsendelsestype.ENDRINGSMELDING);

    if (!inneholderSøknad && inneholderEndring) {
        return {
            title: text('statusISak.forventetSvar.endring.tittel'),
            content: (
                <Box className="mt-2">
                    <AppText id="statusISak.forventetSvar.endring.info" />
                </Box>
            ),
        };
    }
    return {
        title: text('statusISak.forventetSvar.søknad.tittel'),
        content: (
            <Box className="mt-2">
                <AppText id="statusISak.forventetSvar.søknad.info" />
            </Box>
        ),
    };
};
