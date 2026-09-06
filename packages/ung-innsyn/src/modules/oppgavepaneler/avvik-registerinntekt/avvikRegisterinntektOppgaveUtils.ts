import { ArbeidOgFrilansRegisterInntektDto, YtelseRegisterInntektDto } from '@navikt/ung-brukerdialog-api';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { InntektTableRow } from '../../../components/inntekt-table/InntektTable';
import { UngInnsynIntlShape } from '../../../i18n';

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
    intl: UngInnsynIntlShape,
): InntektTableRow[] => {
    if (inntekt.length === 0) {
        return [];
    }
    return inntekt.map((i) => ({
        beløp: i.inntekt,
        navn: intl.text(`@ungInnsyn.ytelse.${i.ytelsetype}`),
    }));
};

const getInntektskildeHeader = (oppgave: AvvikRegisterinntektOppgave, intl: UngInnsynIntlShape) => {
    const harYtelser = (oppgave.oppgavetypeData.registerinntekt.ytelseInntekter || []).length > 0;
    const harArbeidgiverInntekt = (oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter || []).length > 0;

    if (harYtelser && harArbeidgiverInntekt) {
        return intl.text('@ungInnsyn.avvikRegisterinntekt.inntekskilde.arbeidsgiverYtelse');
    } else if (harYtelser && !harArbeidgiverInntekt) {
        return intl.text('@ungInnsyn.avvikRegisterinntekt.inntekskilde.navytelse');
    }
    return intl.text('@ungInnsyn.avvikRegisterinntekt.inntekskilde.arbeidsgiver');
};

export const avvikRegisterinntektOppgaveUtils = {
    mapArbeidOgFrilansInntektToInntektTabellRad,
    mapYtelseInntektToInntektTabellRad,
    getInntektskildeHeader,
};
