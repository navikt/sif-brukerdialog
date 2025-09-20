import InntektTabell from '@innsyn/components/inntekt-tabell/InntektTabell';
import { korrigertInntektOppgaveUtils } from '@innsyn/modules/oppgaver/korrigert-inntekt/korrigertInntektOppgaveUtils';
import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { KorrigertInntektOppgave } from '@shared/types/Oppgave';
import dayjs from 'dayjs';

import RegelverkOgInnsynReadMore from './RegelverkOgInnsynReadMore';

interface Props {
    oppgave: KorrigertInntektOppgave;
}

export const getUtbetalingsmånedForKorrigertInntektOppgave = (oppgaveFraOgMed: Date): Date => {
    return dayjs(oppgaveFraOgMed).add(1, 'month').toDate();
};

const KorrigertInntektOppgavetekst = ({ oppgave }: Props) => {
    const intl = useAppIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;

    const rapporteringsmåned = dateFormatter.month(oppgave.oppgavetypeData.fraOgMed);
    const utbetalingsmåned = dateFormatter.month(
        getUtbetalingsmånedForKorrigertInntektOppgave(oppgave.oppgavetypeData.fraOgMed),
    );

    const {
        registerinntekt: { ytelseInntekter, arbeidOgFrilansInntekter },
    } = oppgave.oppgavetypeData;

    const inntekt = [
        ...korrigertInntektOppgaveUtils.mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...korrigertInntektOppgaveUtils.mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    const harInntekt = inntekt.length > 0;
    const harKunYtelseInntekt = ytelseInntekter.length > 0 && arbeidOgFrilansInntekter.length === 0;

    return (
        <VStack gap="6" width="100%" paddingBlock="0 6">
            {harInntekt ? (
                <>
                    <BodyLong>
                        {harKunYtelseInntekt ? (
                            <AppText id="korrigertInntektOppgavetekst.navYtelse" values={{ rapporteringsmåned }} />
                        ) : (
                            <AppText id="korrigertInntektOppgavetekst.generell" values={{ rapporteringsmåned }} />
                        )}
                    </BodyLong>

                    <InntektTabell
                        inntekt={inntekt}
                        header={korrigertInntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                        lønnHeader={intl.text('inntektTabell.lønn')}
                        totalLabel={intl.text('inntektTabell.totalt')}
                        summert={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
                    />
                </>
            ) : (
                <BodyLong>
                    <AppText id="korrigertInntektOppgavetekst.ingenOpplysninger" values={{ rapporteringsmåned }} />
                </BodyLong>
            )}

            <div>
                <BodyLong spacing>
                    <AppText id="korrigertInntektOppgavetekst.1" values={{ utbetalingsmåned, rapporteringsmåned }} />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="korrigertInntektOppgavetekst.2" />
                </BodyLong>
                {harInntekt ? (
                    <BodyLong spacing>
                        <AppText id="korrigertInntektOppgavetekst.3.harInntekt" />
                    </BodyLong>
                ) : (
                    <BodyLong spacing>
                        <AppText id="korrigertInntektOppgavetekst.3.harIkkeInntekt" />
                    </BodyLong>
                )}
                <BodyLong weight="semibold" spacing>
                    <AppText id="korrigertInntektOppgavetekst.4" />
                    <BodyShort as="div">
                        <AppText id="korrigertInntektOppgavetekst.5" values={{ formatertFrist }} />
                    </BodyShort>
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="korrigertInntektOppgavetekst.6" values={{ rapporteringsmåned }} />
                </BodyLong>
                <RegelverkOgInnsynReadMore />
            </div>
        </VStack>
    );
};

export default KorrigertInntektOppgavetekst;
