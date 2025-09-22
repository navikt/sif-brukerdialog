import InntektTable from '@innsyn/components/inntekt-table/InntektTabell';
import { avvikRegisterinntektOppgaveUtils } from '@innsyn/modules/oppgaver/avvik-registerinntekt/avvikRegisterinntektOppgaveUtils';
import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';
import dayjs from 'dayjs';

import RegelverkOgInnsynReadMore from './RegelverkOgInnsynReadMore';

interface Props {
    oppgave: AvvikRegisterinntektOppgave;
}

export const getUtbetalingsmånedForAvvikRegisterinntektOppgave = (oppgaveFraOgMed: Date): Date => {
    return dayjs(oppgaveFraOgMed).add(1, 'month').toDate();
};

const AvvikRegisterinntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useAppIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;

    const rapporteringsmåned = dateFormatter.month(oppgave.oppgavetypeData.fraOgMed);
    const utbetalingsmåned = dateFormatter.month(
        getUtbetalingsmånedForAvvikRegisterinntektOppgave(oppgave.oppgavetypeData.fraOgMed),
    );

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
        <VStack gap="6" width="100%" paddingBlock="0 6">
            {harInntekt ? (
                <>
                    <BodyLong>
                        {harKunYtelseInntekt ? (
                            <AppText id="avvikRegisterinntektOppgavetekst.navYtelse" values={{ rapporteringsmåned }} />
                        ) : (
                            <AppText id="avvikRegisterinntektOppgavetekst.generell" values={{ rapporteringsmåned }} />
                        )}
                    </BodyLong>

                    <InntektTable
                        inntekt={inntekt}
                        navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                        beløpRowHeader={intl.text('inntektTabell.lønn')}
                        totalColHeader={intl.text('inntektTabell.totalt')}
                        total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
                    />
                </>
            ) : (
                <BodyLong>
                    <AppText id="avvikRegisterinntektOppgavetekst.ingenOpplysninger" values={{ rapporteringsmåned }} />
                </BodyLong>
            )}

            <div>
                <BodyLong spacing>
                    <AppText
                        id="avvikRegisterinntektOppgavetekst.1"
                        values={{ utbetalingsmåned, rapporteringsmåned }}
                    />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="avvikRegisterinntektOppgavetekst.2" />
                </BodyLong>
                {harInntekt ? (
                    <BodyLong spacing>
                        <AppText id="avvikRegisterinntektOppgavetekst.3.harInntekt" />
                    </BodyLong>
                ) : (
                    <BodyLong spacing>
                        <AppText id="avvikRegisterinntektOppgavetekst.3.harIkkeInntekt" />
                    </BodyLong>
                )}
                <BodyLong weight="semibold" spacing>
                    <AppText id="avvikRegisterinntektOppgavetekst.4" />
                    <BodyShort as="div">
                        <AppText id="avvikRegisterinntektOppgavetekst.5" values={{ formatertFrist }} />
                    </BodyShort>
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="avvikRegisterinntektOppgavetekst.6" values={{ rapporteringsmåned }} />
                </BodyLong>
                <RegelverkOgInnsynReadMore />
            </div>
        </VStack>
    );
};

export default AvvikRegisterinntektOppgavetekst;
