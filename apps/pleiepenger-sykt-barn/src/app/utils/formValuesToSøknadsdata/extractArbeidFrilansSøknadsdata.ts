import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { FrilansFormData, Frilanstype } from '../../types/FrilansFormData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomFrilanserInnenforSøknadsperiode, kunHonorararbeidUtenNormalArbeidstid } from '../frilanserUtils';
import { extractArbeidsforholdFrilansSøknadsdata } from './extractArbeidsforholdSøknadsdata';

export const extractArbeidFrilansSøknadsdata = (
    frilans: FrilansFormData,
    søknadsperiode: DateRange
): ArbeidFrilansSøknadsdata | undefined => {
    const erFrilanser = frilans.harHattInntektSomFrilanser === YesOrNo.YES;

    /** Er ikke frilanser */
    if (!erFrilanser) {
        return {
            type: 'erIkkeFrilanser',
            erFrilanser: false,
        };
    }

    if (frilans.frilanstyper === undefined) {
        return undefined;
    }

    if (kunHonorararbeidUtenNormalArbeidstid(frilans.frilanstyper, frilans.misterHonorar)) {
        return {
            type: 'pågåendeKunHonorararbeid',
            erFrilanser: true,
            frilansType: [Frilanstype.HONORARARBEID],
            misterHonorar: YesOrNo.NO,
        };
    }

    const startdato = datepickerUtils.getDateFromDateString(frilans.startdato);
    const sluttdato = datepickerUtils.getDateFromDateString(frilans.sluttdato);
    const aktivPeriode = startdato
        ? getPeriodeSomFrilanserInnenforSøknadsperiode(søknadsperiode, startdato, sluttdato)
        : undefined;
    const erFortsattFrilanser = frilans.erFortsattFrilanser === YesOrNo.YES;
    const arbeidsforhold = frilans.arbeidsforhold
        ? extractArbeidsforholdFrilansSøknadsdata(frilans.arbeidsforhold)
        : undefined;

    /** Er ikke lenger frilanser */
    if (startdato && sluttdato && arbeidsforhold && aktivPeriode) {
        /** Sluttet i søknadsperiode */
        return {
            type: 'sluttetISøknadsperiode',
            erFrilanser: true,
            frilansType: frilans.frilanstyper,
            aktivPeriode,
            misterHonorar: frilans.frilanstyper.some((type) => type === Frilanstype.HONORARARBEID)
                ? frilans.misterHonorar
                : undefined,
            erFortsattFrilanser: false,
            startdato,
            sluttdato,
            arbeidsforhold,
        };
    }

    if (erFortsattFrilanser && arbeidsforhold && startdato && aktivPeriode) {
        /** Er fortsatt frilanser */
        return {
            type: 'pågående',
            erFrilanser: true,
            frilansType: frilans.frilanstyper,
            misterHonorar: frilans.frilanstyper.some((type) => type === Frilanstype.HONORARARBEID)
                ? frilans.misterHonorar
                : undefined,
            startdato,
            aktivPeriode,
            arbeidsforhold,
        };
    }
    return undefined;
};
