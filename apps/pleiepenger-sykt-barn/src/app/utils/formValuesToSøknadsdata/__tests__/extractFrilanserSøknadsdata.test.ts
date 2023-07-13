import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { dateRangeToISODateRange, ISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { FrilansFormData, Frilanstype } from '../../../types/FrilansFormData';
import {
    FrilansSøknadsdataFrilansarbeidOgHonorararbeid,
    FrilansSøknadsdataIngenInntektSomFrilanser,
    FrilansSøknadsdataKunFrilansarbeid,
    FrilansSøknadsdataKunHonorararbeidMisterHonorar,
    FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar,
} from '../../../types/søknadsdata/arbeidFrilansSøknadsdata';
import { extractFrilanserSøknadsdata } from '../extractFrilanserSøknadsdata';

describe('extractFrilanserSøknadsdata', () => {
    const søknadsperiodeIsoDateRange = '2022-01-01/2022-01-02';
    const søknadsperiode = ISODateRangeToDateRange(søknadsperiodeIsoDateRange);
    const startdato: ISODate = '2019-01-01';

    const timerPerUkeHonorararbeid = 5;
    const timerPerUkeFrilansarbeid = 8;

    it('har ikke inntekt som frilanser', () => {
        const values: FrilansFormData = {
            harHattInntektSomFrilanser: YesOrNo.NO,
        };
        expect(extractFrilanserSøknadsdata(values, søknadsperiode)).toEqual(<
            FrilansSøknadsdataIngenInntektSomFrilanser
        >{
            harInntektSomFrilanser: false,
        });
    });
    describe('kun honorararbeid', () => {
        it('mister ikke honorar', () => {
            const values: FrilansFormData = {
                harHattInntektSomFrilanser: YesOrNo.YES,
                frilanstyper: [Frilanstype.HONORARARBEID],
                misterHonorar: YesOrNo.NO,
            };
            const result = extractFrilanserSøknadsdata(values, søknadsperiode);
            const expectedResult: FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
                harInntektSomFrilanser: true,
                misterInntektSomFrilanserIPeriode: false,
                arbeidsforholdHonorararbeid: {
                    misterHonorar: false,
                    // misterHonorar: false,
                },
            };
            expect(result).toEqual(expectedResult);
        });
        it('mister honorar', () => {
            const values: FrilansFormData = {
                harHattInntektSomFrilanser: YesOrNo.YES,
                frilanstyper: [Frilanstype.HONORARARBEID],
                misterHonorar: YesOrNo.YES,
                startdato,
                erFortsattFrilanser: YesOrNo.YES,
                arbeidsforholdHonorararbeid: {
                    normalarbeidstid: {
                        timerPerUke: `${timerPerUkeHonorararbeid}`,
                    },
                },
            };
            const result = extractFrilanserSøknadsdata(
                values,
                søknadsperiode
            ) as FrilansSøknadsdataKunHonorararbeidMisterHonorar;
            expect(result.harInntektSomFrilanser).toBeTruthy();
            expect(result.misterInntektSomFrilanserIPeriode).toBeTruthy();
            expect(result.periodeinfo.erFortsattFrilanser).toBeTruthy();
            expect(result.periodeinfo.startdato).toEqual(ISODateToDate(startdato));
            expect(dateRangeToISODateRange(result.periodeinfo.aktivPeriode)).toEqual(søknadsperiodeIsoDateRange);
            expect(result.arbeidsforholdHonorararbeid.misterHonorar).toBeTruthy();
            expect(result.arbeidsforholdHonorararbeid.normalarbeidstid?.timerPerUkeISnitt).toEqual(
                timerPerUkeHonorararbeid
            );
            // expect(result.arbeidsforhold?.normalarbeidstid.timerPerUkeISnitt).toEqual(timerPerUkeHonorararbeid);
        });
    });

    describe('kun frilansarbeid', () => {
        const values: FrilansFormData = {
            harHattInntektSomFrilanser: YesOrNo.YES,
            frilanstyper: [Frilanstype.FRILANSARBEID],
            startdato,
            erFortsattFrilanser: YesOrNo.YES,
            arbeidsforholdFrilansarbeid: {
                normalarbeidstid: {
                    timerPerUke: `${timerPerUkeFrilansarbeid}`,
                },
            },
        };
        const result = extractFrilanserSøknadsdata(values, søknadsperiode) as FrilansSøknadsdataKunFrilansarbeid;
        expect(result.harInntektSomFrilanser).toBeTruthy();
        expect(result.misterInntektSomFrilanserIPeriode).toBeTruthy();
        expect(result.periodeinfo.erFortsattFrilanser).toBeTruthy();
        expect(result.periodeinfo.startdato).toEqual(ISODateToDate(startdato));
        expect(dateRangeToISODateRange(result.periodeinfo.aktivPeriode)).toEqual(søknadsperiodeIsoDateRange);
        expect(result.arbeidsforholdFrilanserarbeid.normalarbeidstid?.timerPerUkeISnitt).toEqual(
            timerPerUkeFrilansarbeid
        );
        // expect(result.arbeidsforhold?.normalarbeidstid.timerPerUkeISnitt).toEqual(timerPerUkeFrilansarbeid);
    });

    describe('frilansarbeid og honorar, mister honorar', () => {
        const values: FrilansFormData = {
            harHattInntektSomFrilanser: YesOrNo.YES,
            frilanstyper: [Frilanstype.FRILANSARBEID, Frilanstype.HONORARARBEID],
            startdato,
            erFortsattFrilanser: YesOrNo.YES,
            misterHonorar: YesOrNo.YES,
            arbeidsforholdFrilansarbeid: {
                normalarbeidstid: {
                    timerPerUke: `${timerPerUkeFrilansarbeid}`,
                },
            },
            arbeidsforholdHonorararbeid: {
                normalarbeidstid: {
                    timerPerUke: `${timerPerUkeHonorararbeid}`,
                },
            },
        };
        const result = extractFrilanserSøknadsdata(
            values,
            søknadsperiode
        ) as FrilansSøknadsdataFrilansarbeidOgHonorararbeid;

        const {
            arbeidsforholdFrilanserarbeid,
            harInntektSomFrilanser,
            misterInntektSomFrilanserIPeriode,
            arbeidsforholdHonorararbeid,
            periodeinfo,
            // arbeidsforhold,
            ...rest
        } = result;
        expect(harInntektSomFrilanser).toBeTruthy();
        expect(misterInntektSomFrilanserIPeriode).toBeTruthy();
        expect(periodeinfo.erFortsattFrilanser).toBeTruthy();
        expect(periodeinfo.startdato).toEqual(ISODateToDate(startdato));
        expect(dateRangeToISODateRange(periodeinfo.aktivPeriode)).toEqual(søknadsperiodeIsoDateRange);
        expect(arbeidsforholdFrilanserarbeid.normalarbeidstid?.timerPerUkeISnitt).toEqual(timerPerUkeFrilansarbeid);
        expect(arbeidsforholdHonorararbeid.misterHonorar).toBeTruthy();
        if (arbeidsforholdHonorararbeid.misterHonorar) {
            expect(arbeidsforholdHonorararbeid.normalarbeidstid?.timerPerUkeISnitt).toEqual(timerPerUkeHonorararbeid);
        }
        // expect(arbeidsforhold.normalarbeidstid?.timerPerUkeISnitt).toEqual(
        //     timerPerUkeHonorararbeid + timerPerUkeFrilansarbeid
        // );
        expect(rest).toEqual({});
    });

    describe('frilansarbeid og honorar, mister ikke honorar', () => {
        const values: FrilansFormData = {
            harHattInntektSomFrilanser: YesOrNo.YES,
            frilanstyper: [Frilanstype.FRILANSARBEID, Frilanstype.HONORARARBEID],
            startdato,
            erFortsattFrilanser: YesOrNo.YES,
            misterHonorar: YesOrNo.NO,
            arbeidsforholdFrilansarbeid: {
                normalarbeidstid: {
                    timerPerUke: `${timerPerUkeFrilansarbeid}`,
                },
            },
        };
        const result = extractFrilanserSøknadsdata(
            values,
            søknadsperiode
        ) as FrilansSøknadsdataFrilansarbeidOgHonorararbeid;

        const {
            arbeidsforholdFrilanserarbeid,
            arbeidsforholdHonorararbeid,
            harInntektSomFrilanser,
            periodeinfo,
            // arbeidsforhold,
            misterInntektSomFrilanserIPeriode,
            ...rest
        } = result;
        expect(harInntektSomFrilanser).toBeTruthy();
        expect(misterInntektSomFrilanserIPeriode).toBeTruthy();
        expect(periodeinfo.erFortsattFrilanser).toBeTruthy();
        expect(periodeinfo.startdato).toEqual(ISODateToDate(startdato));
        expect(dateRangeToISODateRange(periodeinfo.aktivPeriode)).toEqual(søknadsperiodeIsoDateRange);
        expect(arbeidsforholdFrilanserarbeid.normalarbeidstid?.timerPerUkeISnitt).toEqual(timerPerUkeFrilansarbeid);
        expect(arbeidsforholdHonorararbeid.misterHonorar).toBeFalsy();
        // expect(arbeidsforhold.normalarbeidstid.timerPerUkeISnitt).toEqual(timerPerUkeFrilansarbeid);
        expect(rest).toEqual({});
    });
});
