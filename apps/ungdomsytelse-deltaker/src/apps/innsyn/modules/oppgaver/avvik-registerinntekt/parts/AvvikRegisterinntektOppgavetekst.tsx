import InntektTable from '@innsyn/components/inntekt-table/InntektTabell';
import { avvikRegisterinntektOppgaveUtils } from '@innsyn/modules/oppgaver/avvik-registerinntekt/avvikRegisterinntektOppgaveUtils';
import { BodyLong, Box, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

interface Props {
    oppgave: AvvikRegisterinntektOppgave;
}

export const getUtbetalingsmånedForAvvikRegisterinntektOppgave = (oppgaveFraOgMed: Date): Date => {
    return dayjs(oppgaveFraOgMed).add(1, 'month').toDate();
};

const AvvikRegisterinntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useAppIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.sisteDatoEnKanSvare)}</span>;

    const rapporteringsmåned = dateFormatter.month(oppgave.oppgavetypeData.fraOgMed);
    const rapporteringsmånedOgÅr = dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed);

    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
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
                            <AppText
                                id="avvikRegisterinntektOppgavetekst.navYtelse"
                                values={{ rapporteringsmåned: rapporteringsmånedOgÅr }}
                            />
                        ) : (
                            <AppText
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
                        (<BodyLong>
                            <AppText id="avvikRegisterinntektOppgavetekst.1.harInntekt.delerAvMåned" />
                        </BodyLong>)
                    ) : (
                        <BodyLong>
                            {harKunYtelseInntekt ? (
                                <AppText id="avvikRegisterinntektOppgavetekst.1.harInntekt.kunYtelse" />
                            ) : (
                                <AppText id="avvikRegisterinntektOppgavetekst.1.harInntekt" />
                            )}
                        </BodyLong>
                    )}
                </>
            ) : (
                <>
                    <BodyLong>
                        <AppText
                            id="avvikRegisterinntektOppgavetekst.ingenOpplysninger"
                            values={{ rapporteringsmåned }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <AppText id="avvikRegisterinntektOppgavetekst.ingenInntekt" values={{ rapporteringsmåned }} />
                    </BodyLong>
                </>
            )}
            <Box marginBlock="space-8 space-0">
                <Box marginBlock="space-0 space-24">
                    <List>
                        <List.Item>
                            <AppText
                                id="avvikRegisterinntektOppgavetekst.3"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="avvikRegisterinntektOppgavetekst.4"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                    </List>
                </Box>
                <BodyLong weight="semibold">
                    <AppText id="avvikRegisterinntektOppgavetekst.5" />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="avvikRegisterinntektOppgavetekst.6" values={{ formatertFrist }} />
                </BodyLong>
                <BodyLong>
                    {harKunYtelseInntekt ? (
                        <AppText id="avvikRegisterinntektOppgavetekst.7.kunYtelse" />
                    ) : (
                        <AppText id="avvikRegisterinntektOppgavetekst.7" />
                    )}
                </BodyLong>
            </Box>
        </VStack>
    );
};

export default AvvikRegisterinntektOppgavetekst;
