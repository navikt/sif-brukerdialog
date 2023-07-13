import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { FrilansFormData, Frilanstype } from '../../types/FrilansFormData';
import {
    FrilanserMisterInntekt,
    FrilanserPeriodePart,
    FrilanserSøknadsdata,
    FrilansSøknadsdataFrilansarbeidOgHonorararbeid,
    FrilansSøknadsdataIngenInntektSomFrilanser,
    FrilansSøknadsdataKunFrilansarbeid,
    FrilansSøknadsdataKunHonorararbeidMisterHonorar,
    FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar,
} from '../../types/søknadsdata/arbeidFrilansSøknadsdata';
import { getPeriodeSomFrilanserInnenforSøknadsperiode } from '../frilanserUtils';
import { extractArbeidIPeriodeSøknadsdata } from './extractArbeidIPeriodeSøknadsdata';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractFrilanserSøknadsdata = (
    frilans: FrilansFormData,
    søknadsperiode: DateRange
): FrilanserSøknadsdata => {
    const harInntektSomFrilanser = frilans.harHattInntektSomFrilanser === YesOrNo.YES;

    /** Har ingen inntekt som frilanser */
    if (!harInntektSomFrilanser) {
        const søknadsdata: FrilansSøknadsdataIngenInntektSomFrilanser = {
            harInntektSomFrilanser: false,
        };
        return søknadsdata;
    }

    const harFrilansarbeid = frilans.frilanstyper?.includes(Frilanstype.FRILANSARBEID);
    const harHonorararbeid = frilans.frilanstyper?.includes(Frilanstype.HONORARARBEID);
    const misterHonorar = harHonorararbeid && frilans.misterHonorar === YesOrNo.YES;

    /** Har kun honorararbeid og mister ingen inntekt  */
    if (!harFrilansarbeid && harHonorararbeid && !misterHonorar) {
        const søknadsdata: FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
            harInntektSomFrilanser: true,
            misterInntektSomFrilanserIPeriode: false,
            arbeidsforholdHonorararbeid: {
                misterHonorar: false,
            },
        };
        return søknadsdata;
    }

    const frilanserMedArbeidforhold: Omit<
        FrilanserMisterInntekt,
        'arbeidsforholdFrilansarbeid' | 'arbeidsforholdHonorararbeid'
    > = {
        harInntektSomFrilanser: true,
        misterInntektSomFrilanserIPeriode: true,
        periodeinfo: getFrilanserPeriode(frilans, søknadsperiode),
    };

    const arbeidIPeriodeFrilansarbeid = frilans.arbeidsforholdFrilansarbeid?.arbeidIPeriode
        ? extractArbeidIPeriodeSøknadsdata(frilans.arbeidsforholdFrilansarbeid.arbeidIPeriode)
        : undefined;

    const arbeidIPeriodeHonorararbeid = frilans.arbeidsforholdHonorararbeid?.arbeidIPeriode
        ? extractArbeidIPeriodeSøknadsdata(frilans.arbeidsforholdHonorararbeid.arbeidIPeriode)
        : undefined;

    /** Kun honorararbeid - mister honorar */
    if (
        !harFrilansarbeid &&
        harHonorararbeid &&
        misterHonorar &&
        frilans.arbeidsforholdHonorararbeid?.normalarbeidstid
    ) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.arbeidsforholdHonorararbeid?.normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for honorararbeid er ikke gyldig';
        }
        const søknadsdata: FrilansSøknadsdataKunHonorararbeidMisterHonorar = {
            ...frilanserMedArbeidforhold,
            arbeidsforholdFrilanserarbeid: undefined,
            arbeidsforholdHonorararbeid: {
                misterHonorar: true,
                normalarbeidstid,
                arbeidISøknadsperiode: arbeidIPeriodeHonorararbeid,
            },
        };
        return søknadsdata;
    }
    /** Kun frilansarbeid */
    if (harFrilansarbeid && !harHonorararbeid) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.arbeidsforholdFrilansarbeid?.normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for frilansarbeid er ikke gyldig';
        }
        const søknadsdata: FrilansSøknadsdataKunFrilansarbeid = {
            ...frilanserMedArbeidforhold,
            arbeidsforholdFrilanserarbeid: {
                normalarbeidstid,
                arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
            },
            arbeidsforholdHonorararbeid: undefined,
        };
        return søknadsdata;
    }

    /** Frilansarbeid og honorararbeid */
    if (harFrilansarbeid && harHonorararbeid) {
        const normalarbeidstidFrilanser = extractNormalarbeidstid(
            frilans.arbeidsforholdFrilansarbeid?.normalarbeidstid
        );
        if (!normalarbeidstidFrilanser) {
            throw 'Mangler normalarbeidstid for frilansarbeid';
        }
        /** Mister ikke honorar */
        if (misterHonorar === false) {
            const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
                ...frilanserMedArbeidforhold,
                arbeidsforholdHonorararbeid: {
                    misterHonorar: false,
                },
                arbeidsforholdFrilanserarbeid: {
                    normalarbeidstid: normalarbeidstidFrilanser,
                    arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
                },
            };
            return søknadsdata;
        }

        /** Mister honorar */
        const normalarbeidstidHonorararbeid = frilans.arbeidsforholdHonorararbeid?.normalarbeidstid
            ? extractNormalarbeidstid(frilans.arbeidsforholdHonorararbeid.normalarbeidstid)
            : undefined;

        if (!normalarbeidstidHonorararbeid) {
            throw 'Mangler normalarbeidstid for honorararbeid';
        }

        const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
            ...frilanserMedArbeidforhold,
            arbeidsforholdHonorararbeid: {
                misterHonorar: true,
                normalarbeidstid: normalarbeidstidHonorararbeid,
            },
            arbeidsforholdFrilanserarbeid: {
                normalarbeidstid: normalarbeidstidFrilanser,
                arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
            },
        };
        return søknadsdata;
    }

    throw 'Extract frilanser søknadsdata feilet';
};

const getFrilanserPeriode = (frilans: FrilansFormData, søknadsperiode: DateRange): FrilanserPeriodePart => {
    const startdato = datepickerUtils.getDateFromDateString(frilans.startdato);
    const sluttdato = datepickerUtils.getDateFromDateString(frilans.sluttdato);
    const aktivPeriode = startdato
        ? getPeriodeSomFrilanserInnenforSøknadsperiode(søknadsperiode, startdato, sluttdato)
        : undefined;
    const erFortsattFrilanser = frilans.erFortsattFrilanser === YesOrNo.YES;

    if (erFortsattFrilanser && startdato && aktivPeriode) {
        return {
            erFortsattFrilanser,
            startdato,
            aktivPeriode,
        };
    }
    if (!erFortsattFrilanser && startdato && sluttdato && aktivPeriode) {
        return {
            erFortsattFrilanser,
            startdato,
            sluttdato,
            aktivPeriode,
        };
    }
    throw 'Kunne ikke finne frilanserperiodepart';
};
