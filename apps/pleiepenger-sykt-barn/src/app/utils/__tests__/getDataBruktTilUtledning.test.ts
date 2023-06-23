import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types';
import { ArbeidAnsattSøknadsdata, ArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidAnsattSøknadsdata';
import { getArbeidsforhorholdAvsluttetFørSøknadsperiode } from '../getDataBruktTilUtledning';

const arbeidsgiver: Arbeidsgiver = {
    id: '1',
    navn: 'Frilansoppdrag',
    type: ArbeidsgiverType.ORGANISASJON,
    ansattFom: ISODateToDate('2021-01-01'),
};

describe('getArbeidsforhorholdAvsluttetFørSøknadsperiode', () => {
    const arbeidsforhold: any = {};
    const pågående: ArbeidAnsattSøknadsdata = {
        arbeidsforhold,
        arbeidsgiver: { ...arbeidsgiver, id: '1' },
        erAnsattISøknadsperiode: true,
        type: 'pågående',
    };
    const avsluttetIPeriode: ArbeidAnsattSøknadsdata = {
        arbeidsforhold,
        arbeidsgiver: { ...arbeidsgiver, id: '2' },
        erAnsattISøknadsperiode: true,
        type: 'sluttetISøknadsperiode',
    };
    const avsluttetFørPeriode: ArbeidAnsattSøknadsdata = {
        arbeidsgiver: { ...arbeidsgiver, id: '3' },
        erAnsattISøknadsperiode: false,
        type: 'sluttetFørSøknadsperiode',
    };

    it('returnerer alle arbeidsgivere hvor en sluttet før søknadsperioden', () => {
        const data: ArbeidsgivereSøknadsdata = new Map();
        data.set('1', pågående);
        data.set('2', avsluttetFørPeriode);
        data.set('3', avsluttetIPeriode);
        const result = getArbeidsforhorholdAvsluttetFørSøknadsperiode(data);
        expect(result).toHaveLength(1);
        if (result) expect(result[0].orgnr).toEqual('2');
    });
    it('returnerer undefined dersom en ikke har arbeidsforhold som en sluttet i før søknadsperioden', () => {
        const data: ArbeidsgivereSøknadsdata = new Map();
        data.set('1', pågående);
        data.set('3', avsluttetIPeriode);
        const result = getArbeidsforhorholdAvsluttetFørSøknadsperiode(data);
        expect(result).toBeUndefined();
    });
});
