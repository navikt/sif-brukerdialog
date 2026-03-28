import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { InntektTable } from '../../../../components';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { avvikRegisterinntektOppgaveUtils } from '../avvikRegisterinntektOppgaveUtils';

interface AvvikRegisterinntektOppsummeringProps {
    oppgave: AvvikRegisterinntektOppgave;
}

export const AvvikRegisterinntektOppsummering = ({ oppgave }: AvvikRegisterinntektOppsummeringProps) => {
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
            <UngUiText id="@ungInnsyn.avvikRegisterinntektOppsummering.intro" values={{ rapporteringsmåned }} />
            <InntektTable
                inntekt={inntekt}
                navnRowHeader={avvikRegisterinntektOppgaveUtils.getInntektskildeHeader(oppgave, intl)}
                totalColHeader={intl.text('@ungInnsyn.inntektTabell.totalt')}
                beløpRowHeader={intl.text('@ungInnsyn.inntektTabell.inntekt')}
                total={oppgave.oppgavetypeData.registerinntekt.totalInntekt}
            />
        </>
    );
};
