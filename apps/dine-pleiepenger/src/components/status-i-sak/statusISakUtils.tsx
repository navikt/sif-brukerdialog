import { FileIcon } from '@navikt/aksel-icons';
import { Box, Link, ReadMore, VStack } from '@navikt/ds-react';
import { default as NextLink } from 'next/link';
import { FormattedNumber } from 'react-intl';

import { AppText, IntlTextFn } from '../../i18n';
import { InnsendelseISak } from '../../types';
import { Ettersendelsestype } from '../../types/EttersendelseType';
import { Innsendelsestype } from '../../types/Innsendelsestype';
import { ProcessStepData } from '../../types/ProcessStepData';
import { Sakshendelse, SakshendelseForventetSvar, Sakshendelser } from '../../types/Sakshendelse';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import { InntektsmeldingStatusTag } from '../inntektsmelding-status-tag/InntektsmeldingStatusTag';
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

                /** Denne skal ikke vises enda */
                // case Sakshendelser.AKSJONSPUNKT:
                //     return {
                //         title: hendelse.venteårsak,
                //         completed: false,
                //         current: true,
                //         content: '',
                //         timestamp: hendelse.dato,
                //     };

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
                        title: `Inntektsmelding fra ${getImUtils(hendelse.inntektsmelding).arbeidsgiverNavn}`,
                        content: (
                            <Box className="mt-2">
                                <ReadMore header="Vis detaljer i inntektsmelding">
                                    <VStack gap="2" marginBlock="0 4">
                                        <div>
                                            <strong>Status: </strong>
                                            <InntektsmeldingStatusTag status={hendelse.inntektsmelding.status} />
                                        </div>
                                        <div>
                                            <strong>Beregnet månedsinntekt: </strong>
                                            <FormattedNumber
                                                value={hendelse.inntektsmelding.inntektBeløp}
                                                style="currency"
                                                currency="NOK"
                                                maximumFractionDigits={0}
                                            />
                                            .
                                        </div>
                                    </VStack>
                                    <Link
                                        as={NextLink}
                                        href={`/sak/${hendelse.inntektsmelding.saksnummer}/inntektsmelding/${hendelse.inntektsmelding.journalpostId}`}>
                                        <FileIcon
                                            title="Inntektsmelding"
                                            style={{ width: '1.5rem', height: '1.5rem' }}
                                        />
                                        Gå til hele inntektsmeldingen
                                    </Link>
                                </ReadMore>
                            </Box>
                        ),
                        completed: true,
                        timestamp: hendelse.inntektsmelding.innsendingstidspunkt,
                    };
                }
                case Sakshendelser.FORVENTET_SVAR: {
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
            }
        })
        .filter((h) => h !== undefined) as ProcessStepData[];
};

const getForventetSvarTitleContent = (
    hendelse: SakshendelseForventetSvar,
    text: IntlTextFn,
): Pick<ProcessStepData, 'title' | 'content'> | undefined => {
    const inneholderSøknad = hendelse.innsendelsestyperIBehandling.includes(Innsendelsestype.SØKNAD);
    const inneholderEndring = hendelse.innsendelsestyperIBehandling.includes(Innsendelsestype.ENDRINGSMELDING);

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
