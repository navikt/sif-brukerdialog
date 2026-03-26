import { BodyLong, Box, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

import { InntektTable } from '../../../../components';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { avvikRegisterinntektOppgaveUtils } from '../avvikRegisterinntektOppgaveUtils';

interface Props {
    oppgave: AvvikRegisterinntektOppgave;
}

export const getUtbetalingsmånedForAvvikRegisterinntektOppgave = (oppgaveFraOgMed: Date): Date => {
    return dayjs(oppgaveFraOgMed).add(1, 'month').toDate();
};

export const AvvikRegisterinntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useUngUiIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.sisteDatoEnKanSvare)}</span>;

    const rapporteringsmåned = dateFormatter.month(oppgave.oppgavetypeData.fraOgMed);
    const rapporteringsmånedOgÅr = dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed);

    const {
        registerinntekt: { ytelseInntekter = [], arbeidOgFrilansInntekter = [] },
    } = oppgave.oppgavetypeData;

    const inntekt = [
        ...avvikRegisterinntektOppgaveUtils.mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...avvikRegisterinntektOppgaveUtils.mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    const harInntekt = inntekt.length > 0;
    const harKunYtelseInntekt = ytelseInntekter.length > 0 && arbeidOgFrilansInntekter.length === 0;

    return (
        <VStack gap="space-16" width="100%" paddingBlock="space-0 space-16">
            {harInntekt ? (
                <>
                    <BodyLong>
                        {harKunYtelseInntekt ? (
                            <UngUiText
                                id="avvikRegisterinntektOppgavetekst.navYtelse"
                                values={{ rapporteringsmåned: rapporteringsmånedOgÅr }}
                            />
                        ) : (
                            <UngUiText
                                id="avvikRegisterinntektOppgavetekst.generell"
                                values={{ rapporteringsmåned: rapporteringsmånedOgÅr }}
                            />
                        )}
                    </BodyLong>

                    <Box marginBlock="space-0 space-8">
                        <InntektTable
                            inntekt={inntekt}
                            navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                            beløpRowHeader={intl.text('inntektTabell.inntekt')}
                            totalColHeader={intl.text('inntektTabell.totalt')}
                            total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
                        />
                    </Box>
                    {oppgave.oppgavetypeData.gjelderDelerAvMåned ? (
                        // Når perioden oppgaven ikke gjelder alle virkedager i måneden
                        <BodyLong>
                            <UngUiText id="avvikRegisterinntektOppgavetekst.1.harInntekt.delerAvMåned" />
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            {harKunYtelseInntekt ? (
                                <UngUiText id="avvikRegisterinntektOppgavetekst.1.harInntekt.kunYtelse" />
                            ) : (
                                <UngUiText id="avvikRegisterinntektOppgavetekst.1.harInntekt" />
                            )}
                        </BodyLong>
                    )}
                </>
            ) : (
                <>
                    <BodyLong>
                        <UngUiText
                            id="avvikRegisterinntektOppgavetekst.ingenOpplysninger"
                            values={{ rapporteringsmåned }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <UngUiText id="avvikRegisterinntektOppgavetekst.ingenInntekt" values={{ rapporteringsmåned }} />
                    </BodyLong>
                </>
            )}
            <Box marginBlock="space-8 space-0">
                <Box marginBlock="space-0 space-24">
                    <List>
                        <List.Item>
                            <UngUiText
                                id="avvikRegisterinntektOppgavetekst.3"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                        <List.Item>
                            <UngUiText
                                id="avvikRegisterinntektOppgavetekst.4"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                    </List>
                </Box>
                <BodyLong weight="semibold">
                    <UngUiText id="avvikRegisterinntektOppgavetekst.5" />
                </BodyLong>
                <BodyLong spacing>
                    <UngUiText id="avvikRegisterinntektOppgavetekst.6" values={{ formatertFrist }} />
                </BodyLong>
                <BodyLong>
                    {harKunYtelseInntekt ? (
                        <UngUiText id="avvikRegisterinntektOppgavetekst.7.kunYtelse" />
                    ) : (
                        <UngUiText id="avvikRegisterinntektOppgavetekst.7" />
                    )}
                </BodyLong>
            </Box>
        </VStack>
    );
};
