import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';
import { ArbeidFrilansSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { ArbeidSøknadsdata } from '../../../types/søknadsdata/ArbeidSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidssituasjonFormValues } from './ArbeidssituasjonStep';

export const getArbeidssituasjonSøknadsdataFromFormValues = (
    values: ArbeidssituasjonFormValues,
): ArbeidSøknadsdata | undefined => {
    const frilans = getArbeidFrilansSøknadsdataFromFormValues(values);
    const selvstendig = getArbeidSNSøknadsdataFromFormValues(values);

    if (!frilans && !selvstendig) {
        // Kanskje trow error
        return undefined;
    }
    return {
        frilans,
        selvstendig,
    };
};

const getArbeidFrilansSøknadsdataFromFormValues = (
    values: ArbeidssituasjonFormValues,
): ArbeidFrilansSøknadsdata | undefined => {
    const { frilans_erFrilanser, frilans_jobberFortsattSomFrilans, frilans_startdato, frilans_sluttdato } = values;

    const erFrilanser = frilans_erFrilanser === YesOrNo.YES;

    /** Er ikke frilanser */
    if (!erFrilanser) {
        return {
            type: 'erIkkeFrilanser',
            erFrilanser: false,
        };
    }

    const startdato = frilans_startdato;
    const sluttdato = frilans_sluttdato;
    const jobberFortsattSomFrilans = frilans_jobberFortsattSomFrilans === YesOrNo.YES;

    /** Er ikke lenger frilanser */
    if (startdato && sluttdato && !jobberFortsattSomFrilans) {
        /** Sluttet i søknadsperiode */
        return {
            type: 'sluttetISøknadsperiode',
            erFrilanser: true,
            jobberFortsattSomFrilans: false,
            startdato,
            sluttdato,
        };
    }
    if (jobberFortsattSomFrilans && startdato) {
        /** Er fortsatt frilanser */
        return {
            type: 'pågående',
            erFrilanser: true,
            startdato,
            jobberFortsattSomFrilans: true,
        };
    }
};

const getArbeidSNSøknadsdataFromFormValues = (
    values: ArbeidssituasjonFormValues,
): ArbeidSelvstendigSøknadsdata | undefined => {
    const { selvstendig_erSelvstendigNæringsdrivende, selvstendig_virksomhet, selvstendig_harFlereVirksomheter } =
        values;

    if (selvstendig_erSelvstendigNæringsdrivende === YesOrNo.NO) {
        return {
            type: 'erIkkeSN',
            erSelvstendigNæringsdrivende: false,
        };
    }
    if (selvstendig_virksomhet) {
        return {
            type: 'erSN',
            erSelvstendigNæringsdrivende: true,
            virksomhet: selvstendig_virksomhet,
            harFlereVirksomheter: selvstendig_harFlereVirksomheter === YesOrNo.YES,
        };
    }
};

export const getArbeidssituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: ArbeidssituasjonFormValues,
): ArbeidssituasjonFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: ArbeidssituasjonFormValues = {
        frilans_erFrilanser: YesOrNo.UNANSWERED,
        selvstendig_erSelvstendigNæringsdrivende: YesOrNo.UNANSWERED,
    };

    if (søknadsdata.arbeidssituasjon === undefined) {
        return defaultValues;
    }

    const { frilans, selvstendig } = søknadsdata.arbeidssituasjon;

    if (frilans === undefined || selvstendig === undefined) {
        return defaultValues;
    }

    if (frilans.type === 'erIkkeFrilanser' && selvstendig.type === 'erIkkeSN') {
        return defaultValues;
    }

    const frilansFormValues = getFrilansFormValuesFromSøknadsdata(frilans);
    const selvstendigFormValues = getSelvstendigNæringsdrivendeFormValuesFromSøknadsdata(selvstendig);

    const initialValues = {
        ...defaultValues,
        ...frilansFormValues,
        ...selvstendigFormValues,
    };

    return initialValues;
};

const getFrilansFormValuesFromSøknadsdata = (frilans: ArbeidFrilansSøknadsdata) => {
    switch (frilans.type) {
        case 'pågående':
            return {
                frilans_erFrilanser: YesOrNo.YES,
                frilans_startdato: frilans.startdato,
                frilans_jobberFortsattSomFrilans: YesOrNo.YES,
                // frilans_sluttdato
            };
        case 'sluttetISøknadsperiode':
            return {
                frilans_erFrilanser: YesOrNo.YES,
                frilans_startdato: frilans.startdato,
                frilans_jobberFortsattSomFrilans: YesOrNo.NO,
                frilans_sluttdato: frilans.sluttdato,
            };
        case 'erIkkeFrilanser':
            return {
                frilans_erFrilanser: YesOrNo.NO,
            };
    }
};

const getSelvstendigNæringsdrivendeFormValuesFromSøknadsdata = (selvstendig: ArbeidSelvstendigSøknadsdata) => {
    switch (selvstendig.type) {
        case 'erSN':
            return {
                selvstendig_erSelvstendigNæringsdrivende: YesOrNo.YES,
                selvstendig_harFlereVirksomheter: selvstendig.harFlereVirksomheter ? YesOrNo.YES : YesOrNo.NO,
                selvstendig_virksomhet: selvstendig.virksomhet,
            };
        case 'erIkkeSN':
            return {
                selvstendig_erSelvstendigNæringsdrivende: YesOrNo.NO,
            };
    }
};

export const getFrilanserSnSituasjon = (
    values: Partial<ArbeidssituasjonFormValues>,
): 'frilanser' | 'sn' | 'frilanserOgSn' | undefined => {
    const erFrilanser = values.frilans_erFrilanser === YesOrNo.YES;
    const erSn = values.selvstendig_erSelvstendigNæringsdrivende === YesOrNo.YES;
    if (erFrilanser && erSn) {
        return 'frilanserOgSn';
    }
    if (erFrilanser) {
        return 'frilanser';
    }
    if (erSn) {
        return 'sn';
    }
    return;
};

export enum ArbeidssituasjonTidsromValidationKeys {
    arbeidsperiodeStarterEtterFraværsperiode = 'arbeidsperiodeStarterEtterFraværsperiode',
    arbeidsperiodeSlutterFørEllerIFraværsperiode = 'arbeidsperiodeSlutterFørEllerIFraværsperiode',
}
export const validateArbeidssituasjonTidsrom = (
    values: Partial<ArbeidssituasjonFormValues>,
    fraværsperiode?: DateRange,
): ArbeidssituasjonTidsromValidationKeys | undefined => {
    if (!fraværsperiode) {
        return undefined;
    }

    const frilansStartdato = datepickerUtils.getDateFromDateString(values.frilans_startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(values.frilans_sluttdato);

    const snStartdato = values.selvstendig_virksomhet?.fom;
    const snSluttdato = values.selvstendig_virksomhet?.tom;

    const arbeidsperiode: Partial<DateRange> = {
        from: frilansStartdato || snStartdato,
        to: frilansSluttdato || snSluttdato,
    };

    if (arbeidsperiode.from) {
        if (dayjs(arbeidsperiode.from).isAfter(fraværsperiode.from, 'day')) {
            return ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeStarterEtterFraværsperiode;
        }
    }
    if (arbeidsperiode.to) {
        if (dayjs(arbeidsperiode.to).isBefore(fraværsperiode.to, 'day')) {
            return ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeSlutterFørEllerIFraværsperiode;
        }
    }

    return undefined;
};
