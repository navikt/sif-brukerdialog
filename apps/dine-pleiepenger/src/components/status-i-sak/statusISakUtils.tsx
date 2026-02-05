import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Box, Link } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';

import { IntlTextFn } from '../../i18n';
import { InnsendelseISak } from '../../types';
import { Ettersendelsestype } from '../../types/EttersendelseType';
import { Innsendelsestype } from '../../types/Innsendelsestype';
import { ProcessStepData } from '../../types/ProcessStepData';
import { Sakshendelse, Sakshendelser } from '../../types/Sakshendelse';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import EndringsmeldingStatusContent from './parts/EndringsmeldingStatusContent';
import EttersendelseStatusContent from './parts/EttersendelseStatusContent';
import FerdigBehandletStatusContent from './parts/FerdigBehandletStatusContent';
import SøknadStatusContent from './parts/SøknadStatusContent';

export const getProcessStepFromInnsendelse = (
    text: IntlTextFn,
    innsendelse: InnsendelseISak,
): ProcessStepData | undefined => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.SØKNAD:
            return {
                title: text('statusISak.mottattSøknad.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <SøknadStatusContent søknad={innsendelse} />,
                completed: true,
                isLastStep: false,
            };
        case Innsendelsestype.ENDRINGSMELDING:
            return {
                title: text('statusISak.mottattEndringsmelding.tittel'),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EndringsmeldingStatusContent dokumenter={innsendelse.dokumenter} />,
                completed: true,
                isLastStep: false,
            };
        case Innsendelsestype.ETTERSENDELSE:
            return {
                title: text(
                    innsendelse.k9FormatInnsendelse?.type === Ettersendelsestype.legeerklæring
                        ? 'statusISak.mottattEttersendelse.legeerklæring.tittel'
                        : 'statusISak.mottattEttersendelse.annet.tittel',
                ),
                timestamp: innsendelse.k9FormatInnsendelse.mottattDato,
                content: <EttersendelseStatusContent dokumenter={innsendelse.dokumenter} />,
                completed: true,
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

    return hendelserSomSkalVises
        .map((hendelse): ProcessStepData | undefined => {
            /** Gjeldende hendelse er per må alltid siste hendelse før ferdig behandlet, eller ferdig behandlet */

            switch (hendelse.type) {
                case Sakshendelser.MOTTATT_SØKNAD:
                case Sakshendelser.ETTERSENDELSE:
                    return getProcessStepFromInnsendelse(text, hendelse.innsendelse);

                case Sakshendelser.FERDIG_BEHANDLET:
                    return {
                        title: text('statusISak.ferdigBehandlet.tittel'),
                        content: <FerdigBehandletStatusContent />,
                        completed: true,
                        isLastStep: true,
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.INNTEKTSMELDING: {
                    return {
                        title: `Vi har fått inntektsmelding fra ${getImUtils(hendelse.inntektsmelding).arbeidsgiverNavn}`,
                        content: (
                            <Box marginBlock="space-8 space-0">
                                <Link
                                    as={NextLink}
                                    href={`/sak/${hendelse.inntektsmelding.saksnummer}/inntektsmelding/${hendelse.inntektsmelding.journalpostId}`}>
                                    Vis inntektsmelding
                                    <ArrowRightIcon
                                        title="Inntektsmelding"
                                        style={{ width: '1.5rem', height: '1.5rem' }}
                                    />
                                </Link>
                            </Box>
                        ),
                        completed: true,
                        timestamp: hendelse.inntektsmelding.innsendingstidspunkt,
                    };
                }
            }
        })
        .filter((h) => h !== undefined) as ProcessStepData[];
};
