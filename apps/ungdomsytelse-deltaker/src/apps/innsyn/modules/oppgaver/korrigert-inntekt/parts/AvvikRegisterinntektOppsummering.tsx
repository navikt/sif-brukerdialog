import InntektTabell from '@innsyn/components/inntekt-tabell/InntektTabell';
import { korrigertInntektOppgaveUtils } from '@innsyn/modules/oppgaver/korrigert-inntekt/korrigertInntektOppgaveUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '@shared/i18n';
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
            Vi har fått disse opplysningene om lønnen din i {rapporteringsmåned}:
            <InntektTabell
                inntekt={inntekt}
                header={korrigertInntektOppgaveUtils.getInntektskildeHeader(oppgave)}
                lønnHeader="Lønn (før skatt)"
                summert={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
            />
        </>
    );
};

export default AvvikRegisterinntektOppsummering;
