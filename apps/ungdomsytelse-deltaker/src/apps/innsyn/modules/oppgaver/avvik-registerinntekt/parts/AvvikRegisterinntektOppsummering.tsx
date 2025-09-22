import InntektTable from '@innsyn/components/inntekt-table/InntektTabell';
import { avvikRegisterinntektOppgaveUtils } from '@innsyn/modules/oppgaver/avvik-registerinntekt/avvikRegisterinntektOppgaveUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';

interface AvvikRegisterinntektOppsummeringProps {
    oppgave: AvvikRegisterinntektOppgave;
}

const AvvikRegisterinntektOppsummering = ({ oppgave }: AvvikRegisterinntektOppsummeringProps) => {
    const intl = useAppIntl();
    const {
        registerinntekt: { arbeidOgFrilansInntekter, ytelseInntekter },
        fraOgMed,
    } = oppgave.oppgavetypeData;

    const rapporteringsmåned = dateFormatter.month(fraOgMed);
    const inntekt = [
        ...avvikRegisterinntektOppgaveUtils.mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...avvikRegisterinntektOppgaveUtils.mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    return (
        <>
            <AppText id="avvikRegisterinntektOppsummering.intro" values={{ rapporteringsmåned }} />
            <InntektTable
                inntekt={inntekt}
                navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                totalColHeader={intl.text('inntektTabell.totalt')}
                beløpRowHeader={intl.text('inntektTabell.lønn')}
                total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
            />
        </>
    );
};

export default AvvikRegisterinntektOppsummering;
