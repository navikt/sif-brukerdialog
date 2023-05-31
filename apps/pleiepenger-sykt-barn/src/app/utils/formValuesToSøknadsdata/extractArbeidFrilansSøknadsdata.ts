import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { ArbeidsforholdType } from '../../local-sif-common-pleiepenger';
import { FrilansFormData, FrilansTyper } from '../../types/FrilansFormData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomFrilanserInnenforSøknadsperiode, kunStyrevervUtenNormalArbeidstid } from '../frilanserUtils';
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

    if (frilans.frilansTyper === undefined) {
        return undefined;
    }

    if (kunStyrevervUtenNormalArbeidstid(frilans.frilansTyper, frilans.misterHonorarStyreverv)) {
        return {
            type: 'pågåendeKunStyreverv',
            erFrilanser: true,
            frilansType: [FrilansTyper.STYREVERV],
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
        ? extractArbeidsforholdFrilansSøknadsdata(frilans.arbeidsforhold, ArbeidsforholdType.FRILANSER)
        : undefined;

    /** Er ikke lenger frilanser */
    if (startdato && sluttdato && arbeidsforhold && aktivPeriode) {
        /** Sluttet i søknadsperiode */
        return {
            type: 'sluttetISøknadsperiode',
            erFrilanser: true,
            frilansType: frilans.frilansTyper,
            aktivPeriode,
            misterHonorar: frilans.frilansTyper.some((type) => type === FrilansTyper.STYREVERV)
                ? frilans.misterHonorarStyreverv
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
            frilansType: frilans.frilansTyper,
            misterHonorar: frilans.frilansTyper.some((type) => type === FrilansTyper.STYREVERV)
                ? frilans.misterHonorarStyreverv
                : undefined,
            startdato,
            aktivPeriode,
            arbeidsforhold,
        };
    }
    return undefined;
};
