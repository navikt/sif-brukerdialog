import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText, useUngUiIntl } from '@ui/i18n';
import InntektTable from '@ui/components/inntekt-tabell/InntektTabell';
import { avvikRegisterinntektOppgaveUtils } from '../avvikRegisterinntektOppgaveUtils';

interface AvvikRegisterinntektOppsummeringProps {
    oppgave: AvvikRegisterinntektOppgave;
}

const AvvikRegisterinntektOppsummering = ({ oppgave }: AvvikRegisterinntektOppsummeringProps) => {
    const intl = useUngUiIntl();
    const {
        registerinntekt: { arbeidOgFrilansInntekter = [], ytelseInntekter = [] },
        fraOgMed,
    } = oppgave.oppgavetypeData;

    const rapporteringsmåned = dateFormatter.month(fraOgMed);
    const inntekt = [
        ...avvikRegisterinntektOppgaveUtils.mapArbeidOgFrilansInntektToInntektTabellRad(arbeidOgFrilansInntekter),
        ...avvikRegisterinntektOppgaveUtils.mapYtelseInntektToInntektTabellRad(ytelseInntekter, intl),
    ];

    return (
        <>
            <UngUiText id="avvikRegisterinntektOppsummering.intro" values={{ rapporteringsmåned }} />
            <InntektTable
                inntekt={inntekt}
                navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                totalColHeader={intl.text('inntektTabell.totalt')}
                beløpRowHeader={intl.text('inntektTabell.inntekt')}
                total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
            />
        </>
    );
};

export default AvvikRegisterinntektOppsummering;
