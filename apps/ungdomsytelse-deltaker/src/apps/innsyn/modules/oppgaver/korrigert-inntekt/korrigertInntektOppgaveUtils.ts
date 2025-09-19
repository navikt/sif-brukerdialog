import { InntektTabellRad } from '@innsyn/components/inntekt-tabell/InntektTabell';
import {
    ArbeidOgFrilansRegisterInntektDto,
    YtelseRegisterInntektDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppIntlShape } from '@shared/i18n';
import { KorrigertInntektOppgave } from '@shared/types/Oppgave';

const mapArbeidOgFrilansInntektToInntektTabellRad = (
    inntekt: ArbeidOgFrilansRegisterInntektDto[],
): InntektTabellRad[] => {
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
): InntektTabellRad[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: intl.text(`ytelse.${i.ytelsetype}`),
    }));
};

const getInntektskildeHeader = (oppgave: KorrigertInntektOppgave) => {
    const harYtelser = oppgave.oppgavetypeData.registerinntekt.ytelseInntekter.length > 0;
    const harArbeidgiverInntekt = oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter.length > 0;

    if (harYtelser && harArbeidgiverInntekt) {
        return 'Arbeidsgiver/Nav-ytelse';
    } else if (harYtelser && !harArbeidgiverInntekt) {
        return 'Nav-ytelse';
    }
    return 'Arbeidsgiver';
};

export const korrigertInntektOppgaveUtils = {
    mapArbeidOgFrilansInntektToInntektTabellRad,
    mapYtelseInntektToInntektTabellRad,
    getInntektskildeHeader,
};
