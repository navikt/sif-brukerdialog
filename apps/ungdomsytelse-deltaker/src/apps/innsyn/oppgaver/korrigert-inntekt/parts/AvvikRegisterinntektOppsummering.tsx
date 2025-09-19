import { dateFormatter } from '@navikt/sif-common-utils';

import { useAppIntl } from '../../../../../i18n';
import { KorrigertInntektOppgave } from '../../../../../types/Oppgave';
import InntektTabell from '../../../components/inntekt-tabell/InntektTabell';
import { korrigertInntektOppgaveUtils } from '../korrigertInntektOppgaveUtils';

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
