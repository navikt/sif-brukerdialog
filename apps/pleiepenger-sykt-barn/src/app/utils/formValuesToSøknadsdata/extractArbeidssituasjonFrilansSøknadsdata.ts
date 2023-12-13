import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { FrilansFormValues, Frilanstype } from '../../types/søknad-form-values/FrilansFormValues';
import { ArbeidssituasjonFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonFrilansSøknadsdata';
import { isYesOrNoAnswered } from '../../validation/fieldValidations';
import { getPeriodeSomFrilanserInnenforPeriode, getStartdatoSomFrilanser } from '../frilanserUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidssituasjonFrilansSøknadsdata = (
    søknadsperiode: DateRange,
    formValues: FrilansFormValues,
): ArbeidssituasjonFrilansSøknadsdata | undefined => {
    if (formValues === undefined || !isYesOrNoAnswered(formValues.harHattInntektSomFrilanser)) {
        return undefined;
    }
    if (formValues.harHattInntektSomFrilanser === YesOrNo.NO) {
        return {
            harInntektSomFrilanser: false,
        };
    }
    const { erFortsattFrilanser, frilanstype, arbeidsforhold, misterHonorar } = formValues;

    if (frilanstype === Frilanstype.HONORAR && misterHonorar === YesOrNo.NO) {
        return {
            type: frilanstype,
            harInntektSomFrilanser: true,
            misterInntektSomFrilanser: false,
            misterHonorar: false,
        };
    }

    const startetFørSisteTreHeleMåneder = formValues.startetFørSisteTreHeleMåneder === YesOrNo.YES;
    const startdato = getStartdatoSomFrilanser(søknadsperiode, startetFørSisteTreHeleMåneder, formValues.startdato);
    const sluttdato = formValues.sluttdato ? ISODateToDate(formValues.sluttdato) : undefined;

    if (!startdato || (!erFortsattFrilanser && !sluttdato)) {
        throw 'extractArbeidssituasjonFrilansSøknadsdata: ugyldig start eller sluttdato';
    }

    const periodeSomFrilanserISøknadsperiode = getPeriodeSomFrilanserInnenforPeriode(
        søknadsperiode,
        startdato,
        sluttdato,
    );
    if (periodeSomFrilanserISøknadsperiode === undefined || !frilanstype) {
        throw 'extractArbeidssituasjonFrilansSøknadsdata: periodeSomFrilanserISøknadsperiode === undefined';
    }

    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold?.normalarbeidstid);
    if (!normalarbeidstid) {
        throw 'extractArbeidssituasjonFrilansSøknadsdata: normalarbeidstid is undefined';
    }
    return {
        type: frilanstype,
        harInntektSomFrilanser: true,
        misterInntektSomFrilanser: true,
        misterHonorar: misterHonorar === YesOrNo.YES ? true : undefined,
        erFortsattFrilanser: erFortsattFrilanser === YesOrNo.YES,
        startetFørSisteTreHeleMåneder,
        startdato,
        sluttdato,
        periodeSomFrilanserISøknadsperiode,
        normalarbeidstid,
    };
};
