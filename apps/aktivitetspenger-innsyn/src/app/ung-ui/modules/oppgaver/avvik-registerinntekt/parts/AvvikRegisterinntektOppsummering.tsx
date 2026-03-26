import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { AppText, useAppIntl } from '../../../../../i18n';
import InntektTable from '../../../../components/inntekt-tabell/InntektTabell';
import { avvikRegisterinntektOppgaveUtils } from '../avvikRegisterinntektOppgaveUtils';

interface AvvikRegisterinntektOppsummeringProps {
    oppgave: AvvikRegisterinntektOppgave;
}

const AvvikRegisterinntektOppsummering = ({ oppgave }: AvvikRegisterinntektOppsummeringProps) => {
    const intl = useAppIntl();
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
            <AppText id="avvikRegisterinntektOppsummering.intro" values={{ rapporteringsmåned }} />
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
