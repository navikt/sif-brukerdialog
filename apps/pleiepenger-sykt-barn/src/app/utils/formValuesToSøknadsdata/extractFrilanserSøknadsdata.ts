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
} from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { getPeriodeSomFrilanserInnenforSøknadsperiode } from '../frilanserUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';
import { extractArbeidIPeriodeSøknadsdata } from './extractArbeidIPeriodeSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';

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
            honorararbeid: {
                misterHonorar: false,
            },
        };
        return søknadsdata;
    }

    const frilanserMedArbeidforhold: Omit<FrilanserMisterInntekt, 'arbeidsforhold'> = {
        harInntektSomFrilanser: true,
        misterInntektSomFrilanserIPeriode: true,
        periodeinfo: getFrilanserPeriode(frilans, søknadsperiode),
        // arbeidsforhold: {
        //     normalarbeidstid: { timerPerUkeISnitt: 2 },
        // },
    };

    const arbeidISøknadsperiode: ArbeidIPeriodeSøknadsdata | undefined = frilans.arbeidsforhold?.arbeidIPeriode
        ? extractArbeidIPeriodeSøknadsdata(frilans.arbeidsforhold.arbeidIPeriode)
        : undefined;

    /** Kun honorararbeid - mister honorar */
    if (!harFrilansarbeid && harHonorararbeid && misterHonorar && frilans.honorararbeid_normalarbeidstid) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.honorararbeid_normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for honorararbeid er ikke gyldig';
        }
        const søknadsdata: FrilansSøknadsdataKunHonorararbeidMisterHonorar = {
            ...frilanserMedArbeidforhold,
            frilansarbeid: undefined,
            honorararbeid: {
                misterHonorar: true,
                normalarbeidstid,
            },
            arbeidsforhold: {
                normalarbeidstid,
                arbeidISøknadsperiode,
            },
        };
        return søknadsdata;
    }
    /** Kun frilansrarbeid */
    if (harFrilansarbeid && !harHonorararbeid) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.frilansarbeid_normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for frilansarbeid er ikke gyldig';
        }
        const søknadsdata: FrilansSøknadsdataKunFrilansarbeid = {
            ...frilanserMedArbeidforhold,
            frilansarbeid: {
                normalarbeidstid,
            },
            honorararbeid: undefined,
            arbeidsforhold: {
                normalarbeidstid,
                arbeidISøknadsperiode,
            },
        };
        return søknadsdata;
    }

    /** Frilansarbeid og honorararbeid */
    if (harFrilansarbeid && harHonorararbeid) {
        const normalarbeidstidFrilanser = extractNormalarbeidstid(frilans.frilansarbeid_normalarbeidstid);
        if (!normalarbeidstidFrilanser) {
            throw 'Mangler normalarbeidstid for frilansarbeid';
        }
        /** Mister ikke honorar */
        if (misterHonorar === false) {
            const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
                ...frilanserMedArbeidforhold,
                honorararbeid: {
                    misterHonorar: false,
                },
                frilansarbeid: {
                    normalarbeidstid: normalarbeidstidFrilanser,
                },
                arbeidsforhold: {
                    normalarbeidstid: normalarbeidstidFrilanser,
                    arbeidISøknadsperiode,
                },
            };
            return søknadsdata;
        }

        /** Mister honorar */
        const normalarbeidstidHonorararbeid = frilans.honorararbeid_normalarbeidstid
            ? extractNormalarbeidstid(frilans.honorararbeid_normalarbeidstid)
            : undefined;

        if (!normalarbeidstidHonorararbeid) {
            throw 'Mangler normalarbeidstid for honorararbeid';
        }

        const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
            ...frilanserMedArbeidforhold,
            honorararbeid: {
                misterHonorar: true,
                normalarbeidstid: normalarbeidstidHonorararbeid,
            },
            frilansarbeid: {
                normalarbeidstid: normalarbeidstidFrilanser,
            },
            arbeidsforhold: {
                normalarbeidstid: {
                    timerPerUkeISnitt:
                        normalarbeidstidHonorararbeid.timerPerUkeISnitt + normalarbeidstidFrilanser.timerPerUkeISnitt,
                },
                arbeidISøknadsperiode,
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
