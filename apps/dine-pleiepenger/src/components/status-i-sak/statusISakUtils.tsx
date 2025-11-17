import { FileIcon } from '@navikt/aksel-icons';
import { Box, Link, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
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
    current: boolean,
): ProcessStepData | undefined => {
    switch (innsendelse.innsendelsestype) {
        case Innsendelsestype.SØKNAD:
            return {
                title: text('statusISak.mottattSøknad.tittel'),
                timestamp: innsendelse.mottattTidspunkt,
                content: <SøknadStatusContent søknad={innsendelse} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ENDRINGSMELDING:
            return {
                title: text('statusISak.mottattEndringsmelding.tittel'),
                timestamp: innsendelse.mottattTidspunkt,
                content: <EndringsmeldingStatusContent dokumenter={innsendelse.dokumenter} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Innsendelsestype.ETTERSENDELSE:
            return {
                title: text(
                    innsendelse.k9FormatInnsendelse?.type === Ettersendelsestype.legeerklæring
                        ? 'statusISak.mottattEttersendelse.legeerklæring.tittel'
                        : 'statusISak.mottattEttersendelse.annet.tittel',
                ),
                timestamp: innsendelse.mottattTidspunkt,
                content: <EttersendelseStatusContent dokumenter={innsendelse.dokumenter} />,
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
                        current: erGjeldendeHendelse,
                        timestamp: hendelse.dato,
                    };

                case Sakshendelser.INNTEKTSMELDING: {
                    const ersatterAntall = hendelse.erstatter.length;

                    return {
                        title: `Inntektsmelding fra ${getImUtils(hendelse.inntektsmelding).arbeidsgiverNavn}`,
                        content: (
                            <Box className="mt-2">
                                <ReadMore header="Vis mer informasjon">
                                    <VStack gap="2" marginBlock="0 4">
                                        <div>
                                            Første dag med perimisjon:{' '}
                                            {dateFormatter.compact(hendelse.inntektsmelding.startDatoPermisjon)}.{' '}
                                        </div>
                                        <div>
                                            Inntekt:{' '}
                                            <FormattedNumber
                                                value={hendelse.inntektsmelding.inntektBeløp}
                                                style="currency"
                                                currency="NOK"
                                            />
                                            .
                                        </div>
                                        <div>
                                            Status:{' '}
                                            <InntektsmeldingStatusTag status={hendelse.inntektsmelding.status} />
                                        </div>
                                        {ersatterAntall > 0 && (
                                            <div>
                                                Erstatter{' '}
                                                {ersatterAntall === 1
                                                    ? '1 inntektsmelding'
                                                    : `${ersatterAntall} inntektsmeldinger`}
                                                .
                                            </div>
                                        )}
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
    const sisteHendelseErEttersendelse =
        hendelse.innsendelsestyperIBehandling[hendelse.innsendelsestyperIBehandling.length - 1] ===
        Innsendelsestype.ETTERSENDELSE;
    if (sisteHendelseErEttersendelse) {
        return undefined;
    }
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
