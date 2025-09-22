import { InntektTableRow } from '@innsyn/components/inntekt-table/InntektTabell';
import {
    ArbeidOgFrilansRegisterInntektDto,
    YtelseRegisterInntektDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppIntlShape } from '@shared/i18n';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';

const mapArbeidOgFrilansInntektToInntektTabellRad = (
    inntekt: ArbeidOgFrilansRegisterInntektDto[],
): InntektTableRow[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: i.arbeidsgiverNavn || i.arbeidsgiver,
    }));
};

const mapYtelseInntektToInntektTabellRad = (
    inntekt: YtelseRegisterInntektDto[],
    intl: AppIntlShape,
): InntektTableRow[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: intl.text(`ytelse.${i.ytelsetype}`),
    }));
};

const getInntektskildeHeader = (oppgave: AvvikRegisterinntektOppgave, intl: AppIntlShape) => {
    const harYtelser = oppgave.oppgavetypeData.registerinntekt.ytelseInntekter.length > 0;
    const harArbeidgiverInntekt = oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter.length > 0;

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
