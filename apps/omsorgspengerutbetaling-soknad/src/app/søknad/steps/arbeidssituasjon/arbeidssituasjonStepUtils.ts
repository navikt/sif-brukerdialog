import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { ArbeidssituasjonFormValues } from './ArbeidssituasjonStep';
import { ArbeidSøknadsdata } from '../../../types/søknadsdata/ArbeidSøknadsdata';
import { ArbeidFrilansSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';

export const frilansIsValid = (values: Partial<ArbeidssituasjonFormValues>) => {
    const erFrilanser = values.frilans_erFrilanser;
    const frilansStartdato = datepickerUtils.getDateFromDateString(values.frilans_startdato);
    const frilansSluttdato = datepickerUtils.getDateFromDateString(values.frilans_sluttdato);
    const frilansJobberFortsattSomFrilans = values.frilans_jobberFortsattSomFrilans;

    return !!(
        erFrilanser === YesOrNo.NO ||
        (erFrilanser === YesOrNo.YES &&
            frilansStartdato &&
            (frilansJobberFortsattSomFrilans === YesOrNo.YES ||
                (frilansJobberFortsattSomFrilans === YesOrNo.NO && frilansSluttdato !== undefined)))
    );
};

export const selvstendigIsValid = (values: Partial<ArbeidssituasjonFormValues>) => {
    const erSelvstendigNæringsdrivende = values.selvstendig_erSelvstendigNæringsdrivende;
    const selvstendigVirksomhet = values.selvstendig_virksomhet;
    return !!(
        erSelvstendigNæringsdrivende === YesOrNo.NO ||
        (erSelvstendigNæringsdrivende === YesOrNo.YES && selvstendigVirksomhet !== undefined)
    );
};

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
    //TODO
    // if (selvstendig_virksomhet && dayjs(virksomhet.fom).isBefore(søknadsperiode.to, 'day')) {
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
        // TODO
        // Kanskje logge error
        return defaultValues;
    }

    if (frilans.type === 'erIkkeFrilanser' && selvstendig.type === 'erIkkeSN') {
        // TODO
        // Kanskje logge error
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
