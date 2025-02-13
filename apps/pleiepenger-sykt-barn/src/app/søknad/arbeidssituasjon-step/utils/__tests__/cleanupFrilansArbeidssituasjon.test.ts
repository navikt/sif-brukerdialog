/* eslint-disable vitest/expect-expect */
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { FrilansFormValues, Frilanstype } from '../../../../types/søknad-form-values/FrilansFormValues';
import { cleanupFrilansArbeidssituasjon } from '../cleanupArbeidssituasjonStep';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',
    };
});

const søknadsperiode = ISODateRangeToDateRange('2021-01-02/2022-01-01');

const frilanserFullFormValues: FrilansFormValues = {
    harHattInntektSomFrilanser: YesOrNo.YES,
    erFortsattFrilanser: YesOrNo.YES,
    frilanstype: Frilanstype.FRILANS_HONORAR,
    misterHonorar: YesOrNo.YES,
    startdato: '2021-02-02',
    sluttdato: '2022-02-01',
    arbeidsforhold: {
        normalarbeidstid: {
            timerPerUke: '2',
        },
    },
};

const checkValuesAvsluttetFrilanser = (result: FrilansFormValues, forventetFrilanstype: Frilanstype) => {
    const {
        arbeidsforhold,
        erFortsattFrilanser,
        frilanstype,
        harHattInntektSomFrilanser,
        misterHonorar,
        startdato,
        sluttdato,
        ...rest
    } = result;
    expect(arbeidsforhold?.normalarbeidstid).toEqual({ timerPerUke: '2' });
    expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    expect(frilanstype).toEqual(forventetFrilanstype);
    expect(misterHonorar).toBeUndefined();
    expect(erFortsattFrilanser).toEqual(YesOrNo.NO);
    expect(startdato).toEqual('2021-02-02');
    expect(sluttdato).toEqual('2022-02-01');
    expect(rest).toEqual({});
};
const checkValuesFortsattFrilanser = (result: FrilansFormValues, forventetFrilanstype: Frilanstype) => {
    const {
        arbeidsforhold,
        erFortsattFrilanser,
        frilanstype,
        harHattInntektSomFrilanser,
        misterHonorar,
        startdato,
        sluttdato,
        ...rest
    } = result;
    expect(arbeidsforhold?.normalarbeidstid).toEqual({ timerPerUke: '2' });
    expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    expect(frilanstype).toEqual(forventetFrilanstype);
    expect(misterHonorar).toBeUndefined();
    expect(erFortsattFrilanser).toEqual(YesOrNo.YES);
    expect(startdato).toEqual('2021-02-02');
    expect(sluttdato).toBeUndefined();
    expect(rest).toEqual({});
};

describe('cleanupFrilansArbeidssituasjon', () => {
    it('har ikke hatt inntekt som frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            harHattInntektSomFrilanser: YesOrNo.NO,
        });
        const { harHattInntektSomFrilanser, ...rest } = result;
        expect(harHattInntektSomFrilanser).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    it('mottar kun honorar, mister ikke honorar', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.HONORAR,
            misterHonorar: YesOrNo.NO,
        });
        const { harHattInntektSomFrilanser, frilanstype, misterHonorar, ...rest } = result;
        expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
        expect(frilanstype).toEqual(Frilanstype.HONORAR);
        expect(misterHonorar).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });

    it('mottar kun honorar og mister honorar, fortsatt frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.HONORAR,
            misterHonorar: YesOrNo.YES,
        });
        const {
            arbeidsforhold,
            erFortsattFrilanser,
            frilanstype,
            harHattInntektSomFrilanser,
            misterHonorar,
            startdato,
            ...rest
        } = result;
        expect(arbeidsforhold?.normalarbeidstid).toEqual({ timerPerUke: '2' });
        expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
        expect(frilanstype).toEqual(Frilanstype.HONORAR);
        expect(misterHonorar).toEqual(YesOrNo.YES);
        expect(erFortsattFrilanser).toEqual(YesOrNo.YES);
        expect(startdato).toEqual('2021-02-02');
        expect(rest).toEqual({});
    });
    it('kun frilanser, fortsatt frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.FRILANS,
        });
        checkValuesFortsattFrilanser(result, Frilanstype.FRILANS);
    });
    it('frilanser og honorar, fortsatt frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.FRILANS_HONORAR,
        });
        checkValuesFortsattFrilanser(result, Frilanstype.FRILANS_HONORAR);
    });
    it('kun frilanser, er ikke lenger frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.FRILANS,
            erFortsattFrilanser: YesOrNo.NO,
        });
        checkValuesAvsluttetFrilanser(result, Frilanstype.FRILANS);
    });
    it('frilanser og honorar, er ikke lenger frilanser', () => {
        const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
            ...frilanserFullFormValues,
            frilanstype: Frilanstype.FRILANS_HONORAR,
            erFortsattFrilanser: YesOrNo.NO,
        });
        checkValuesAvsluttetFrilanser(result, Frilanstype.FRILANS_HONORAR);
    });
});
