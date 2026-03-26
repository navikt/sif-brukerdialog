import { ArbeidOgFrilansRegisterInntektDto, YtelseRegisterInntektDto } from '@navikt/ung-brukerdialog-api';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';
import { InntektTableRow } from '@ui/components/inntekt-tabell/InntektTabell';
import { UngUiIntlShape } from '@ui/i18n';

const mapArbeidOgFrilansInntektToInntektTabellRad = (
    inntekt: ArbeidOgFrilansRegisterInntektDto[],
): InntektTableRow[] => {
    if (inntekt.length === 0) {
        return [];
    }

    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: i.arbeidsgiverNavn || i.arbeidsgiverIdentifikator,
    }));
};

const mapYtelseInntektToInntektTabellRad = (
    inntekt: YtelseRegisterInntektDto[],
    intl: UngUiIntlShape,
): InntektTableRow[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: intl.text(`ytelse.${i.ytelsetype}`),
    }));
};

const getInntektskildeHeader = (oppgave: AvvikRegisterinntektOppgave, intl: UngUiIntlShape) => {
    const harYtelser = (oppgave.oppgavetypeData.registerinntekt.ytelseInntekter || []).length > 0;
    const harArbeidgiverInntekt = (oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter || []).length > 0;

    if (harYtelser && harArbeidgiverInntekt) {
        return intl.text('avvikRegisterinntekt.inntekskilde.arbeidsgiverYtelse');
    } else if (harYtelser && !harArbeidgiverInntekt) {
        return intl.text('avvikRegisterinntekt.inntekskilde.navytelse');
    }
    return intl.text('avvikRegisterinntekt.inntekskilde.arbeidsgiver');
};

export const avvikRegisterinntektOppgaveUtils = {
    mapArbeidOgFrilansInntektToInntektTabellRad,
    mapYtelseInntektToInntektTabellRad,
    getInntektskildeHeader,
};
