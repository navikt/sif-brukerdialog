import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { FrilansFormData, Frilanstype } from '../../types/FrilansFormData';
import {
    ArbeidssituasjonFrilansSøknadsdata,
    FrilansHonorararbeidArbeidssituasjon,
} from '../../types/søknadsdata/ArbeidssituasjonFrilansSøknadsdata';
import { getPeriodeSomFrilanserInnenforPeriode } from '../frilanserUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/NormalarbeidstidSøknadsdata';
import { isYesOrNoAnswered } from '../../validation/fieldValidations';

export const extractArbeidssituasjonFrilansSøknadsdata = (
    søknadsperiode: DateRange,
    formValues: FrilansFormData
): ArbeidssituasjonFrilansSøknadsdata | undefined => {
    if (formValues === undefined || !isYesOrNoAnswered(formValues.harHattInntektSomFrilanser)) {
        return undefined;
    }
    if (formValues.harHattInntektSomFrilanser === YesOrNo.NO) {
        return {
            harInntektSomFrilanser: false,
        };
    }
    const {
        erFortsattFrilanser,
        frilanstyper,
        arbeidsforholdFrilansarbeid,
        arbeidsforholdHonorararbeid,
        misterHonorar,
    } = formValues;
    const harFrilansarbeid = frilanstyper?.includes(Frilanstype.FRILANSARBEID);
    const harHonorararbeid = frilanstyper?.includes(Frilanstype.HONORARARBEID);

    if (!harFrilansarbeid && harHonorararbeid && misterHonorar === YesOrNo.NO) {
        return {
            harInntektSomFrilanser: true,
            misterInntektSomFrilanser: false,
            honorararbeid: {
                misterHonorar: false,
            },
        };
    }

    const startdato = formValues.startdato ? ISODateToDate(formValues.startdato) : undefined;
    const sluttdato = formValues.sluttdato ? ISODateToDate(formValues.sluttdato) : undefined;
    if (!startdato || (!erFortsattFrilanser && !sluttdato)) {
        throw 'extractArbeidssituasjonFrilansSøknadsdata: ugyldig start eller sluttdato';
    }

    const periodeSomFrilanserISøknadsperiode = getPeriodeSomFrilanserInnenforPeriode(
        søknadsperiode,
        startdato,
        sluttdato
    );
    if (periodeSomFrilanserISøknadsperiode === undefined) {
        throw 'extractArbeidssituasjonFrilansSøknadsdata: periodeSomFrilanserISøknadsperiode === undefined';
    }

    const normalarbeidstidFrilansarbeid = harFrilansarbeid
        ? extractNormalarbeidstid(arbeidsforholdFrilansarbeid?.normalarbeidstid)
        : undefined;

    const normalarbeidstidHonorararbeid = harHonorararbeid
        ? extractNormalarbeidstid(arbeidsforholdHonorararbeid?.normalarbeidstid)
        : undefined;

    return {
        harInntektSomFrilanser: true,
        misterInntektSomFrilanser: true,
        erFortsattFrilanser: erFortsattFrilanser === YesOrNo.YES,
        startdato,
        sluttdato,
        periodeSomFrilanserISøknadsperiode,
        frilansarbeid: normalarbeidstidFrilansarbeid
            ? {
                  normalarbeidstid: normalarbeidstidFrilansarbeid,
              }
            : undefined,
        honorararbeid: harHonorararbeid ? getHonorararbeid(misterHonorar, normalarbeidstidHonorararbeid) : undefined,
    };
};

const getHonorararbeid = (
    misterHonorar?: YesOrNo,
    normalarbeidstid?: NormalarbeidstidSøknadsdata
): FrilansHonorararbeidArbeidssituasjon | undefined => {
    if (!misterHonorar || !isYesOrNoAnswered(misterHonorar)) {
        throw 'getHonorararbeid: misterHonorar is undefined or unanswered';
    }
    if (misterHonorar === YesOrNo.NO) {
        return {
            misterHonorar: false,
        };
    }
    if (normalarbeidstid === undefined) {
        throw 'getHonorararbeid: normalarbeidstid is undefined';
    }
    return {
        misterHonorar: true,
        normalarbeidstid,
    };
};
