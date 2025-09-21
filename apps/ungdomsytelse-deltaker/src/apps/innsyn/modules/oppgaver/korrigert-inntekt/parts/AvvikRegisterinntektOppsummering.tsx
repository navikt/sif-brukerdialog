import InntektTable from '@innsyn/components/inntekt-table/InntektTabell';
import { korrigertInntektOppgaveUtils } from '@innsyn/modules/oppgaver/korrigert-inntekt/korrigertInntektOppgaveUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { KorrigertInntektOppgave } from '@shared/types/Oppgave';

interface AvvikRegisterinntektOppsummeringProps {
    oppgave: KorrigertInntektOppgave;
}

const AvvikRegisterinntektOppsummering = ({ oppgave }: AvvikRegisterinntektOppsummeringProps) => {
    const intl = useAppIntl();
    const {
        registerinntekt: { arbeidOgFrilansInntekter, ytelseInntekter },
        fraOgMed,
    } = oppgave.oppgavetypeData;

    const rapporteringsmåned = dateFormatter.month(fraOgMed);
    const inntekt = [
        ...korrigertInntektOppgaveUtils.mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...korrigertInntektOppgaveUtils.mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    return (
        <>
            <AppText id="avvikRegisterinntektOppsummering.intro" values={{ rapporteringsmåned }} />
            <InntektTable
                inntekt={inntekt}
                navnRowHeader={korrigertInntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                totalColHeader={intl.text('inntektTabell.totalt')}
                beløpRowHeader={intl.text('inntektTabell.lønn')}
                total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
            />
        </>
    );
};

export default AvvikRegisterinntektOppsummering;
