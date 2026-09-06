import { BodyLong, Box, List, VStack } from '@navikt/ds-react';
import { dateFormatter, dateToISODate, ISODate } from '@sif/utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

import { InntektTable } from '../../../../components';
import { UngInnsynText, useUngInnsynIntl } from '../../../../i18n';
import { avvikRegisterinntektOppgaveUtils } from '../avvikRegisterinntektOppgaveUtils';

interface Props {
    oppgave: AvvikRegisterinntektOppgave;
}

export const getUtbetalingsmånedForAvvikRegisterinntektOppgave = (oppgaveFraOgMed: ISODate): ISODate => {
    return dateToISODate(dayjs(oppgaveFraOgMed).add(1, 'month'));
};

export const AvvikRegisterinntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useUngInnsynIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;

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
                            <UngInnsynText
                                id="@ungInnsyn.avvikRegisterinntektOppgavetekst.navYtelse"
                                values={{ rapporteringsmåned: rapporteringsmånedOgÅr }}
                            />
                        ) : (
                            <UngInnsynText
                                id="@ungInnsyn.avvikRegisterinntektOppgavetekst.generell"
                                values={{ rapporteringsmåned: rapporteringsmånedOgÅr }}
                            />
                        )}
                    </BodyLong>

                    <Box marginBlock="space-0 space-8">
                        <InntektTable
                            inntekt={inntekt}
                            navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                            beløpRowHeader={intl.text('@ungInnsyn.inntektTabell.inntekt')}
                            totalColHeader={intl.text('@ungInnsyn.inntektTabell.totalt')}
                            total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
                        />
                    </Box>
                    {oppgave.oppgavetypeData.gjelderDelerAvMåned ? (
                        // Når perioden oppgaven ikke gjelder alle virkedager i måneden
                        <BodyLong>
                            <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.1.harInntekt.delerAvMåned" />
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            {harKunYtelseInntekt ? (
                                <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.1.harInntekt.kunYtelse" />
                            ) : (
                                <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.1.harInntekt" />
                            )}
                        </BodyLong>
                    )}
                </>
            ) : (
                <>
                    <BodyLong>
                        <UngInnsynText
                            id="@ungInnsyn.avvikRegisterinntektOppgavetekst.ingenOpplysninger"
                            values={{ rapporteringsmåned }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <UngInnsynText
                            id="@ungInnsyn.avvikRegisterinntektOppgavetekst.ingenInntekt"
                            values={{ rapporteringsmåned }}
                        />
                    </BodyLong>
                </>
            )}
            <Box marginBlock="space-8 space-0">
                <Box marginBlock="space-0 space-24">
                    <List>
                        <List.Item>
                            <UngInnsynText
                                id="@ungInnsyn.avvikRegisterinntektOppgavetekst.3"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                        <List.Item>
                            <UngInnsynText
                                id="@ungInnsyn.avvikRegisterinntektOppgavetekst.4"
                                values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                            />
                        </List.Item>
                    </List>
                </Box>
                <BodyLong weight="semibold">
                    <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.5" />
                </BodyLong>
                <BodyLong spacing>
                    <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.6" values={{ formatertFrist }} />
                </BodyLong>
                <BodyLong>
                    {harKunYtelseInntekt ? (
                        <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.7.kunYtelse" />
                    ) : (
                        <UngInnsynText id="@ungInnsyn.avvikRegisterinntektOppgavetekst.7" />
                    )}
                </BodyLong>
            </Box>
        </VStack>
    );
};
