import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types';
import {
    ArbeidAnsattSøknadsdata,
    ArbeidsgivereSøknadsdata_depr,
} from '../../types/søknadsdata/arbeidAnsattSøknadsdata';
import { getArbeidsforhorholdAvsluttetFørSøknadsperiode } from '../getDataBruktTilUtledning';

const arbeidsgiver: Arbeidsgiver = {
    id: '1',
    navn: 'Frilansoppdrag',
    type: ArbeidsgiverType.ORGANISASJON,
    ansattFom: ISODateToDate('2021-01-01'),
};

const periodeSomAnsattISøknadsperiode: DateRange = {
    from: ISODateToDate('2021-01-01'),
    to: ISODateToDate('2023-01-01'),
};

describe('getArbeidsforhorholdAvsluttetFørSøknadsperiode', () => {
    const arbeidsforhold: any = {};
    const pågående: ArbeidAnsattSøknadsdata = {
        index: 0,
        arbeidsforhold,
        arbeidsgiver: { ...arbeidsgiver, id: '1' },
        erAnsattISøknadsperiode: true,
        periodeSomAnsattISøknadsperiode,
        type: 'pågående',
    };
    const avsluttetIPeriode: ArbeidAnsattSøknadsdata = {
        index: 1,
        arbeidsforhold,
        arbeidsgiver: { ...arbeidsgiver, id: '2' },
        erAnsattISøknadsperiode: true,
        periodeSomAnsattISøknadsperiode,
        type: 'sluttetISøknadsperiode',
    };
    const avsluttetFørPeriode: ArbeidAnsattSøknadsdata = {
        index: 2,
        arbeidsgiver: { ...arbeidsgiver, id: '3' },
        erAnsattISøknadsperiode: false,
        type: 'sluttetFørSøknadsperiode',
    };

    it('returnerer alle arbeidsgivere hvor en sluttet før søknadsperioden', () => {
        const data: ArbeidsgivereSøknadsdata_depr = new Map();
        data.set('1', pågående);
        data.set('2', avsluttetFørPeriode);
        data.set('3', avsluttetIPeriode);
        const result = getArbeidsforhorholdAvsluttetFørSøknadsperiode(data);
        expect(result).toHaveLength(1);
        if (result) expect(result[0].orgnr).toEqual('2');
    });
    it('returnerer undefined dersom en ikke har arbeidsforhold som en sluttet i før søknadsperioden', () => {
        const data: ArbeidsgivereSøknadsdata_depr = new Map();
        data.set('1', pågående);
        data.set('3', avsluttetIPeriode);
        const result = getArbeidsforhorholdAvsluttetFørSøknadsperiode(data);
        expect(result).toBeUndefined();
    });
});
