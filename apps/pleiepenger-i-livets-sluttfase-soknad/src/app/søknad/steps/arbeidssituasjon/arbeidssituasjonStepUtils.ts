import {
    DateRange,
    getNumberFromNumberInputValue,
    getStringForNumberInputValue,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';
import { Arbeidsgiver, ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import { ArbeidFrilansSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { ArbeidAnsattSøknadsdata, ArbeidsgivereSøknadsdata } from '../../../types/søknadsdata/ArbeidsgivereSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from '../../../types/søknadsdata/OpptjeningUtlandSøknadsdata';
import { ArbeidssituasjonSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { UtenlandskNæringSøknadsdata } from '../../../types/søknadsdata/UtenlandskNæringSøknadsdata';
import { VernepliktigSøknadsdata } from '../../../types/søknadsdata/VernepliktigSøknadsdata';
import { ArbeidssituasjonFormValues } from './ArbeidssituasjonStep';
import { AnsattFormData } from './form-parts/ArbeidssituasjonAnsatt';
import { FrilansFormData } from './form-parts/ArbeidssituasjonFrilans';
import { SelvstendigFormData } from './form-parts/ArbeidssituasjonSN';

export const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer !== undefined && (answer === YesOrNo.NO || answer === YesOrNo.YES);
};

export const visVernepliktSpørsmål = (
    søknadsperiode: DateRange,
    ansatt_arbeidsforhold: AnsattFormData[],
    frilans: FrilansFormData,
    selvstendig: SelvstendigFormData,
    frilansoppdrag?: Arbeidsgiver[],
): boolean => {
    const harFrilansoppdrag = (frilansoppdrag || []).length > 0;

    /** Selvstendig næringsdrivende */
    if (
        isYesOrNoAnswered(selvstendig.harHattInntektSomSN) === false ||
        selvstendig.harHattInntektSomSN === YesOrNo.YES
    ) {
        return false;
    }
    /** Frilanser */
    if (
        (isYesOrNoAnswered(frilans?.harHattInntektSomFrilanser) === false && !harFrilansoppdrag) ||
        (frilans?.harHattInntektSomFrilanser === YesOrNo.YES &&
            erFrilanserISøknadsperiode(søknadsperiode, frilans, frilansoppdrag))
    ) {
        return false;
    }

    /** Arbeidsgivere */
    if (ansatt_arbeidsforhold.length > 0) {
        if (ansatt_arbeidsforhold.some((a) => isYesOrNoAnswered(a.erAnsatt) === false)) {
            return false;
        }
        if (ansatt_arbeidsforhold.some((a) => a.erAnsatt === YesOrNo.YES)) {
            return false;
        }
        return (
            ansatt_arbeidsforhold.some(
                (a) => a.erAnsatt === YesOrNo.NO && a.sluttetFørSøknadsperiode !== YesOrNo.YES,
            ) === false
        );
    }
    return true;
};

export const harFrilansoppdrag = (frilansoppdrag: Arbeidsgiver[] | undefined) =>
    frilansoppdrag !== undefined && frilansoppdrag.length > 0;

export const harSvartErFrilanserEllerHarFrilansoppdrag = (
    harHattInntektSomFrilanser: YesOrNo | undefined,
    frilansoppdrag: Arbeidsgiver[] | undefined,
): boolean => {
    return harFrilansoppdrag(frilansoppdrag) || harHattInntektSomFrilanser === YesOrNo.YES;
};

export const getArbeidssituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    arbeidsgivere: Arbeidsgiver[],
    formValues?: ArbeidssituasjonFormValues,
): ArbeidssituasjonFormValues => {
    if (formValues) {
        return formValues;
    }

    const frilansOppdragDefaultValues = arbeidsgivere.filter(
        (arbeidsgiver) => arbeidsgiver.type === ArbeidsgiverType.FRILANSOPPDRAG,
    );

    const defaultValues: ArbeidssituasjonFormValues = {
        ansatt_arbeidsforhold: ansattArbeidsforholdDefaultValues(
            arbeidsgivere,
            søknadsdata.arbeidssituasjon?.arbeidsgivere,
        ),
        frilans: getFrilansDafaultValues(søknadsdata.arbeidssituasjon?.frilans),
        frilansoppdrag: frilansOppdragDefaultValues,
        selvstendig: getSelvstendigDefaultValues(søknadsdata.arbeidssituasjon?.selvstendig),
        harVærtEllerErVernepliktig: getVernepliktigFormData(søknadsdata.arbeidssituasjon?.vernepliktig),
        ...getOpptjeningUtlandFormData(søknadsdata.arbeidssituasjon?.opptjeningUtland),
        ...getUtenlandskNæringFormData(søknadsdata.arbeidssituasjon?.utenlandskNæring),
    };

    return defaultValues;
};

const getFrilansDafaultValues = (frilans?: ArbeidFrilansSøknadsdata): FrilansFormData => {
    const defaultValues: FrilansFormData = {
        harHattInntektSomFrilanser: YesOrNo.UNANSWERED,
    };

    if (frilans) {
        switch (frilans.type) {
            case 'erIkkeFrilanser':
                return {
                    harHattInntektSomFrilanser: YesOrNo.NO,
                };
            case 'sluttetFørSøknadsperiode':
                return {
                    harHattInntektSomFrilanser: YesOrNo.YES,
                    jobberFortsattSomFrilans: YesOrNo.NO,
                    startdato: frilans.startdato,
                    sluttdato: frilans.sluttdato,
                };
            case 'sluttetISøknadsperiode':
                return {
                    harHattInntektSomFrilanser: YesOrNo.YES,
                    jobberFortsattSomFrilans: YesOrNo.NO,
                    startdato: frilans.startdato,
                    sluttdato: frilans.sluttdato,
                    jobberNormaltTimer: getStringForNumberInputValue(frilans.jobberNormaltTimer),
                };
            case 'pågående':
                return {
                    harHattInntektSomFrilanser: YesOrNo.YES,
                    jobberFortsattSomFrilans: YesOrNo.YES,
                    startdato: frilans.startdato,
                    jobberNormaltTimer: getStringForNumberInputValue(frilans.jobberNormaltTimer),
                };
        }
    }

    return defaultValues;
};

const getSelvstendigDefaultValues = (selvstendig?: ArbeidSelvstendigSøknadsdata): SelvstendigFormData => {
    const selvstendigDefaultValues: SelvstendigFormData = {
        harHattInntektSomSN: YesOrNo.UNANSWERED,
    };

    if (selvstendig) {
        switch (selvstendig.type) {
            case 'erIkkeSN':
                return {
                    harHattInntektSomSN: YesOrNo.NO,
                };
            case 'erSN':
                return {
                    harHattInntektSomSN: YesOrNo.YES,
                    harFlereVirksomheter: selvstendig.harFlereVirksomheter ? YesOrNo.YES : YesOrNo.NO,
                    virksomhet: selvstendig.virksomhet,
                    jobberNormaltTimer: getStringForNumberInputValue(selvstendig.jobberNormaltTimer),
                };
        }
    }
    return selvstendigDefaultValues;
};

const ansattArbeidsforholdDefaultValues = (
    arbeidsgivereFraAAreg: Arbeidsgiver[],
    arbeidsgivere?: ArbeidsgivereSøknadsdata,
): AnsattFormData[] => {
    const ansattFormData: AnsattFormData[] = [];

    arbeidsgivereFraAAreg.map((arbeidsgiver) => {
        if (arbeidsgiver.type === ArbeidsgiverType.ORGANISASJON) {
            const arbeidsgiverSøknadsdata = getArbeidsgiverFormDataFromSøknadsData(
                arbeidsgivere,
                arbeidsgiver.organisasjonsnummer,
            );

            ansattFormData.push({ arbeidsgiver, ...arbeidsgiverSøknadsdata });
        }
    });

    return ansattFormData;
};

const getArbeidsgiverFormDataFromSøknadsData = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata,
    organisasjonsnummer?: string,
): Partial<AnsattFormData> => {
    const defaultValues = {
        erAnsatt: YesOrNo.UNANSWERED,
    };

    const keyOrgNummer = organisasjonsnummer || '';
    const arbeidsgiverSøknadsdata = arbeidsgivere ? arbeidsgivere[keyOrgNummer] : undefined;

    if (arbeidsgiverSøknadsdata) {
        switch (arbeidsgiverSøknadsdata?.type) {
            case 'sluttetFørSøknadsperiode':
                return {
                    erAnsatt: YesOrNo.NO,
                    sluttetFørSøknadsperiode: YesOrNo.YES,
                };
            case 'sluttetISøknadsperiode':
                return {
                    erAnsatt: YesOrNo.NO,
                    sluttetFørSøknadsperiode: YesOrNo.NO,
                    jobberNormaltTimer: getStringForNumberInputValue(arbeidsgiverSøknadsdata.jobberNormaltTimer),
                };
            case 'pågående':
                return {
                    erAnsatt: YesOrNo.YES,
                    jobberNormaltTimer: getStringForNumberInputValue(arbeidsgiverSøknadsdata.jobberNormaltTimer),
                };
        }
    }

    return defaultValues;
};

export const getVernepliktigFormData = (vernepliktigSøknadsdata?: VernepliktigSøknadsdata): YesOrNo | undefined => {
    return vernepliktigSøknadsdata?.type === 'harVærtEllerErVernepliktigYes'
        ? YesOrNo.YES
        : vernepliktigSøknadsdata?.type === 'harVærtEllerErVernepliktigNo'
          ? YesOrNo.NO
          : YesOrNo.UNANSWERED;
};

const getOpptjeningUtlandFormData = (opptjeningUtland?: OpptjeningUtlandSøknadsdata) => {
    if (opptjeningUtland) {
        switch (opptjeningUtland.type) {
            case 'harIkkeOpptjeningUtland':
                return {
                    harOpptjeningUtland: YesOrNo.NO,
                    opptjeningUtland: [],
                };
            case 'harOpptjeningUtland':
                return {
                    harOpptjeningUtland: YesOrNo.YES,
                    opptjeningUtland: opptjeningUtland.opptjeningUtland,
                };
        }
    }

    return {
        harOpptjeningUtland: YesOrNo.UNANSWERED,
        opptjeningUtland: [],
    };
};

const getUtenlandskNæringFormData = (utenlandskNæring?: UtenlandskNæringSøknadsdata) => {
    if (utenlandskNæring) {
        switch (utenlandskNæring.type) {
            case 'harIkkeUtenlandskNæring':
                return {
                    harUtenlandskNæring: YesOrNo.NO,
                    utenlandskNæring: [],
                };
            case 'harUtenlandskNæring':
                return {
                    harUtenlandskNæring: YesOrNo.YES,
                    utenlandskNæring: utenlandskNæring.utenlandskNæring,
                };
        }
    }

    return {
        harUtenlandskNæring: YesOrNo.UNANSWERED,
        utenlandskNæring: [],
    };
};

export const getArbeidssituasjonSøknadsdataFromFormValues = (
    values: ArbeidssituasjonFormValues,
    søknadsperiode?: DateRange,
): ArbeidssituasjonSøknadsdata | undefined => {
    if (!søknadsperiode) {
        // TODO trow error
        return undefined;
    }

    const arbeidAnsattSøknadsdata = getArbeidsgiverSøknadsdataFromFormData(values.ansatt_arbeidsforhold);
    const frilans = getFrilansSøknadsdataFromFormValues(values.frilans, values.frilansoppdrag, søknadsperiode);
    const selvstendig = getSelvstendigSøknadsdataFromFormValues(values.selvstendig, søknadsperiode);

    const vernepliktig = visVernepliktSpørsmål(
        søknadsperiode,
        values.ansatt_arbeidsforhold,
        values.frilans,
        values.selvstendig,
        values.frilansoppdrag,
    )
        ? getVernepliktigSøknadsdata(values)
        : undefined;
    const opptjeningUtland = getOpptjeningUtlandSøknadsdata(values);
    const utenlandskNæring = getUtenlandskNæringSøknadsdata(values);

    if (!frilans || !selvstendig || !opptjeningUtland || !utenlandskNæring) {
        return undefined;
    }

    return {
        arbeidsgivere: arbeidAnsattSøknadsdata,
        frilans,
        selvstendig,
        vernepliktig,
        opptjeningUtland,
        utenlandskNæring,
    };
};

export const erFrilanserITidsrom = (tidsrom: DateRange, frilansStartdato: Date, frilansSluttdato?: Date): boolean => {
    if (dayjs(frilansStartdato).isAfter(tidsrom.to, 'day')) {
        return false;
    }
    if (frilansSluttdato && dayjs(frilansSluttdato).isBefore(tidsrom.from, 'day')) {
        return false;
    }
    return true;
};

export const erFrilanserISøknadsperiode = (
    søknadsperiode: DateRange,
    { harHattInntektSomFrilanser, jobberFortsattSomFrilans, sluttdato, startdato }: FrilansFormData,
    frilansoppdrag: Arbeidsgiver[] | undefined,
): boolean => {
    if (jobberFortsattSomFrilans === YesOrNo.YES) {
        return true;
    }
    const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(sluttdato);

    if (frilansStartdato && harSvartErFrilanserEllerHarFrilansoppdrag(harHattInntektSomFrilanser, frilansoppdrag)) {
        return erFrilanserITidsrom(søknadsperiode, frilansStartdato, frilansSluttdato);
    }
    return false;
};

export const getFrilansSøknadsdataFromFormValues = (
    frilansFormdata: FrilansFormData,
    frilansoppdrag: Arbeidsgiver[],
    søknadsperiode: DateRange,
): ArbeidFrilansSøknadsdata | undefined => {
    const { harHattInntektSomFrilanser, jobberFortsattSomFrilans, startdato, sluttdato } = frilansFormdata;
    const erFrilanser = harHattInntektSomFrilanser === YesOrNo.YES;

    const brukerHarFrilansOppdrag = harFrilansoppdrag(frilansoppdrag);
    const brukerHarFrilansISøknadsPeriode = erFrilanserISøknadsperiode(søknadsperiode, frilansFormdata, frilansoppdrag);

    if (!erFrilanser && !brukerHarFrilansOppdrag) {
        return {
            type: 'erIkkeFrilanser',
            erFrilanser: false,
        };
    }

    if (
        !brukerHarFrilansISøknadsPeriode &&
        brukerHarFrilansOppdrag &&
        jobberFortsattSomFrilans === YesOrNo.NO &&
        startdato &&
        sluttdato
    ) {
        return {
            type: 'sluttetFørSøknadsperiode',
            erFrilanser: true,
            jobberFortsattSomFrilans: false,
            startdato,
            sluttdato,
        };
    }

    const jobberNormaltTimer = getNumberFromNumberInputValue(frilansFormdata.jobberNormaltTimer);

    if (brukerHarFrilansISøknadsPeriode && jobberNormaltTimer && startdato) {
        if (jobberFortsattSomFrilans === YesOrNo.NO && sluttdato) {
            return {
                type: 'sluttetISøknadsperiode',
                erFrilanser: true,
                jobberFortsattSomFrilans: false,
                startdato,
                sluttdato,
                jobberNormaltTimer,
            };
        }

        return {
            type: 'pågående',
            erFrilanser: true,
            jobberFortsattSomFrilans: true,
            startdato,
            jobberNormaltTimer: jobberNormaltTimer,
        };
    }

    return undefined;
};

export const erSNITidsrom = (tidsrom: DateRange, snStartdato: Date, snSluttdato?: Date): boolean => {
    if (dayjs(snStartdato).isAfter(tidsrom.to, 'day')) {
        return false;
    }
    if (snSluttdato && dayjs(snSluttdato).isBefore(tidsrom.from, 'day')) {
        return false;
    }
    return true;
};

export const getSelvstendigSøknadsdataFromFormValues = (
    selvstendigFormData: SelvstendigFormData,
    søknadsperiode: DateRange,
): ArbeidSelvstendigSøknadsdata | undefined => {
    const { harHattInntektSomSN, harFlereVirksomheter, virksomhet } = selvstendigFormData;

    if (harHattInntektSomSN === YesOrNo.NO) {
        return {
            type: 'erIkkeSN',
            erSelvstendigNæringsdrivende: false,
        };
    }

    const jobberNormaltTimer = getNumberFromNumberInputValue(selvstendigFormData.jobberNormaltTimer);
    if (!virksomhet || !jobberNormaltTimer) {
        return undefined;
    }
    const erSelvstendigITidsrom = erSNITidsrom(søknadsperiode, virksomhet?.fom, virksomhet?.tom);

    if (harHattInntektSomSN === YesOrNo.YES && erSelvstendigITidsrom) {
        return {
            type: 'erSN',
            erSelvstendigNæringsdrivende: true,
            harFlereVirksomheter: harFlereVirksomheter === YesOrNo.YES,
            virksomhet,
            jobberNormaltTimer,
        };
    }

    return undefined;
};

export const getArbeidsgiverSøknadsdataFromFormData = (
    ansattFormData: AnsattFormData[],
): ArbeidsgivereSøknadsdata | undefined => {
    if (!ansattFormData || ansattFormData.length === 0) {
        return undefined;
    }

    const arbeidsgivereSøknadsdata: ArbeidsgivereSøknadsdata = {};

    ansattFormData.forEach((ansatt) => {
        const arbeidAnsattSøknadsdata = getArbeidAnsattSøknadsdata(ansatt);
        if (arbeidAnsattSøknadsdata) {
            arbeidsgivereSøknadsdata[ansatt.arbeidsgiver.id] = arbeidAnsattSøknadsdata;
        }
    });

    return arbeidsgivereSøknadsdata;
};

export const getArbeidAnsattSøknadsdata = (ansatt: AnsattFormData): ArbeidAnsattSøknadsdata | undefined => {
    const jobberNormaltTimer = getNumberFromNumberInputValue(ansatt.jobberNormaltTimer);
    if (ansatt.erAnsatt === YesOrNo.YES && jobberNormaltTimer) {
        return {
            type: 'pågående',
            arbeidsgiver: ansatt.arbeidsgiver,
            erAnsattISøknadsperiode: true,
            jobberNormaltTimer,
        };
    }

    if (ansatt.erAnsatt === YesOrNo.NO && ansatt.sluttetFørSøknadsperiode === YesOrNo.NO && jobberNormaltTimer) {
        return {
            type: 'sluttetISøknadsperiode',
            arbeidsgiver: ansatt.arbeidsgiver,
            erAnsattISøknadsperiode: true,
            jobberNormaltTimer,
        };
    }

    if (ansatt.erAnsatt === YesOrNo.NO && ansatt.sluttetFørSøknadsperiode === YesOrNo.YES) {
        return {
            type: 'sluttetFørSøknadsperiode',
            arbeidsgiver: ansatt.arbeidsgiver,
            erAnsattISøknadsperiode: false,
        };
    }
    return undefined;
};

export const getOpptjeningUtlandSøknadsdata = (values: ArbeidssituasjonFormValues): OpptjeningUtlandSøknadsdata => {
    const { harOpptjeningUtland, opptjeningUtland } = values;

    if (harOpptjeningUtland === YesOrNo.YES) {
        return {
            type: 'harOpptjeningUtland',
            opptjeningUtland,
        };
    } else {
        return {
            type: 'harIkkeOpptjeningUtland',
        };
    }
};

export const getUtenlandskNæringSøknadsdata = (values: ArbeidssituasjonFormValues): UtenlandskNæringSøknadsdata => {
    const { harUtenlandskNæring, utenlandskNæring } = values;

    if (harUtenlandskNæring === YesOrNo.YES) {
        return {
            type: 'harUtenlandskNæring',
            utenlandskNæring,
        };
    } else {
        return {
            type: 'harIkkeUtenlandskNæring',
        };
    }
};

export const getVernepliktigSøknadsdata = (values: ArbeidssituasjonFormValues): VernepliktigSøknadsdata | undefined => {
    const { harVærtEllerErVernepliktig } = values;
    if (harVærtEllerErVernepliktig && harVærtEllerErVernepliktig !== YesOrNo.UNANSWERED) {
        return {
            type:
                harVærtEllerErVernepliktig === YesOrNo.YES
                    ? 'harVærtEllerErVernepliktigYes'
                    : 'harVærtEllerErVernepliktigNo',
        };
    }
    return undefined;
};
