/* eslint-disable no-console */
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { FrilansFormData, Frilanstype } from '../../types/FrilansFormData';
import {
    ArbeidsforholdHonorararbeid,
    FrilanserMisterInntekt,
    FrilanserSøknadsdata,
    FrilansSøknadsdataFrilansarbeidOgHonorararbeid,
    FrilansSøknadsdataIngenInntektSomFrilanser,
    FrilansSøknadsdataKunFrilansarbeid,
    FrilansSøknadsdataKunHonorararbeidMisterHonorar,
    FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar,
} from '../../types/søknadsdata/arbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { ArbeidsforholdSøknadsdata } from '../../types/søknadsdata/arbeidsforholdSøknadsdata';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/NormalarbeidstidSøknadsdata';
import { getPeriodeSomFrilanserInnenforPeriode } from '../frilanserUtils';
import { extractArbeidIPeriodeSøknadsdata } from './extractArbeidIPeriodeSøknadsdata';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';

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

    const erFortsattFrilanser = frilans.erFortsattFrilanser === YesOrNo.YES;
    const startdato = datepickerUtils.getDateFromDateString(frilans.startdato);
    const sluttdato = datepickerUtils.getDateFromDateString(frilans.sluttdato);

    if (!startdato || (!erFortsattFrilanser && !sluttdato)) {
        throw 'extractFrilanserSøknadsdata; kunne ikke sette aktiv periode';
    }
    const aktivPeriode = getPeriodeSomFrilanserInnenforPeriode(søknadsperiode, startdato, sluttdato);
    if (!aktivPeriode) {
        throw 'extractFrilanserSøknadsdata; har svart at en er frilanser, men er ikke aktiv innenfor søknadsperioden';
    }

    const frilanserBase: Omit<
        FrilanserMisterInntekt,
        'arbeidsforholdFrilansarbeid' | 'arbeidsforholdHonorararbeid' | 'arbeidsforhold'
    > = {
        harInntektSomFrilanser: true,
        misterInntektSomFrilanserIPeriode: true,
        erFortsattFrilanser,
        startdato,
        sluttdato,
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
        arbeidIPeriodeHonorararbeid &&
        frilans.arbeidsforholdHonorararbeid?.normalarbeidstid
    ) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.arbeidsforholdHonorararbeid?.normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for honorararbeid er ikke gyldig';
        }

        const arbeidsforholdHonorararbeid: ArbeidsforholdHonorararbeid = {
            normalarbeidstid,
            misterHonorar: true,
            arbeidISøknadsperiode: arbeidIPeriodeHonorararbeid,
            aktivPeriode,
        };

        const søknadsdata: FrilansSøknadsdataKunHonorararbeidMisterHonorar = {
            ...frilanserBase,
            arbeidsforholdFrilansarbeid: undefined,
            arbeidsforholdHonorararbeid,
            arbeidsforhold: arbeidsforholdHonorararbeid,
        };
        return søknadsdata;
    }
    /** Kun frilansarbeid */
    if (harFrilansarbeid && !harHonorararbeid) {
        const normalarbeidstid = extractNormalarbeidstid(frilans.arbeidsforholdFrilansarbeid?.normalarbeidstid);
        if (!normalarbeidstid) {
            throw 'Normalarbeidstid for frilansarbeid er ikke gyldig';
        }
        const arbeidsforholdFrilansarbeid: ArbeidsforholdSøknadsdata = {
            normalarbeidstid,
            arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
            aktivPeriode,
        };
        const søknadsdata: FrilansSøknadsdataKunFrilansarbeid = {
            ...frilanserBase,
            arbeidsforholdHonorararbeid: undefined,
            arbeidsforholdFrilansarbeid,
            arbeidsforhold: arbeidsforholdFrilansarbeid,
        };
        return søknadsdata;
    }

    /** Frilansarbeid og honorararbeid */
    if (harFrilansarbeid && harHonorararbeid) {
        const normalarbeidstidFrilansarbeid = extractNormalarbeidstid(
            frilans.arbeidsforholdFrilansarbeid?.normalarbeidstid
        );
        if (!normalarbeidstidFrilansarbeid) {
            throw 'Mangler normalarbeidstid for frilansarbeid';
        }

        /** Mister ikke honorar */
        if (misterHonorar === false) {
            const arbeidsforholdFrilansarbeid: ArbeidsforholdSøknadsdata = {
                normalarbeidstid: normalarbeidstidFrilansarbeid,
                arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
                aktivPeriode,
            };
            const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
                ...frilanserBase,
                arbeidsforholdHonorararbeid: {
                    misterHonorar: false,
                },
                arbeidsforholdFrilansarbeid,
                arbeidsforhold: arbeidsforholdFrilansarbeid,
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
        if (!arbeidIPeriodeHonorararbeid) {
            throw 'Mangler arbeidIPeriodeHonorararbeid';
        }

        const søknadsdata: FrilansSøknadsdataFrilansarbeidOgHonorararbeid = {
            ...frilanserBase,
            arbeidsforholdHonorararbeid: {
                aktivPeriode,
                misterHonorar: true,
                normalarbeidstid: normalarbeidstidHonorararbeid,
            },
            arbeidsforholdFrilansarbeid: {
                aktivPeriode,
                normalarbeidstid: normalarbeidstidFrilansarbeid,
                arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
            },
            arbeidsforhold: getAggregertArbeidsforholdForFrilanser({
                aktivPeriode,
                honorararbeid: {
                    normalarbeidstid: normalarbeidstidHonorararbeid,
                    arbeidISøknadsperiode: arbeidIPeriodeHonorararbeid,
                },
                frilansarbeid: {
                    normalarbeidstid: normalarbeidstidFrilansarbeid,
                    arbeidISøknadsperiode: arbeidIPeriodeFrilansarbeid,
                },
            }),
        };
        return søknadsdata;
    }

    throw 'extractFrilanserSøknadsdata: ingen returverdi';
};

export const getAggregertArbeidsforholdForFrilanser = ({
    honorararbeid,
    frilansarbeid,
    aktivPeriode,
}: {
    honorararbeid: {
        normalarbeidstid: NormalarbeidstidSøknadsdata;
        arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata;
    };
    frilansarbeid: {
        normalarbeidstid: NormalarbeidstidSøknadsdata;
        arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata;
    };
    aktivPeriode: DateRange;
}): ArbeidsforholdSøknadsdata => {
    const normalarbeidstid: NormalarbeidstidSøknadsdata = {
        timerPerUkeISnitt: summerTimerPerUkeForFrilanser(
            honorararbeid.normalarbeidstid.timerPerUkeISnitt,
            frilansarbeid.normalarbeidstid.timerPerUkeISnitt
        ),
    };

    /** Har ikke besvart arbeid i søknadsperiode */
    if (!honorararbeid.arbeidISøknadsperiode || !frilansarbeid.arbeidISøknadsperiode) {
        return { normalarbeidstid, aktivPeriode };
    }

    /** Arbeider vanlig eller ikke for både honorararbeid og frilansarbeid */
    if (
        frilansarbeid.arbeidISøknadsperiode.type === honorararbeid.arbeidISøknadsperiode.type &&
        frilansarbeid.arbeidISøknadsperiode.type !== ArbeidIPeriodeType.arbeiderRedusert
    ) {
        return {
            aktivPeriode,
            normalarbeidstid: {
                timerPerUkeISnitt: summerTimerPerUkeForFrilanser(
                    honorararbeid.normalarbeidstid.timerPerUkeISnitt,
                    frilansarbeid.normalarbeidstid.timerPerUkeISnitt
                ),
            },
            arbeidISøknadsperiode: {
                type: frilansarbeid.arbeidISøknadsperiode.type,
            },
        };
    }

    /** Arbeider forskjellig - en må regne om til timer per uke for begge */
    // TODO
    const arbeidISøknadsperiode: ArbeidIPeriodeSøknadsdata = {} as any;
    return {
        aktivPeriode,
        normalarbeidstid: {
            timerPerUkeISnitt: summerTimerPerUkeForFrilanser(
                honorararbeid.normalarbeidstid.timerPerUkeISnitt,
                frilansarbeid.normalarbeidstid.timerPerUkeISnitt
            ),
        },
        arbeidISøknadsperiode,
    };
};

export const summerTimerPerUkeForFrilanser = (
    frilansarbeidNormalarbeidstid?: number,
    honorararbeidNormalarbeidstid?: number
): number => {
    return (frilansarbeidNormalarbeidstid || 0) + (honorararbeidNormalarbeidstid || 0);
};

// /** Enkeltuker */
// export const getArbeidPerUkeFraArbeidIPeriode = (
//     periode: DateRange,
//     normalarbeidstid: number,
//     arbeidIPeriode: ArbeidIPeriodeSøknadsdata
// ): ArbeidIPeriodeRedusertArbeidSøknadsdata => {
//     const uker = getArbeidsukerIPerioden(periode);
//     console.log({ uker, normalarbeidstid, arbeidIPeriode });

//     return {} as any;
// };
