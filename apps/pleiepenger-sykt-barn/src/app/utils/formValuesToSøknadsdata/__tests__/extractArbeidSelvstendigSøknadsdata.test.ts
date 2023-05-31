import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdSelvstendigFormValues } from '../../../types/ArbeidsforholdFormValues';
import { SelvstendigFormData } from '../../../types/SelvstendigFormData';
import { extractArbeidSelvstendigSøknadsdata } from '../extractArbeidSelvstendigSøknadsdata';
import * as mock from '../extractArbeidsforholdSøknadsdata';

const søknadsperiode = ISODateRangeToDateRange('2022-01-01/2022-02-01');

const arbeidsforholdSpy = jest.spyOn(mock, 'extractArbeidsforholdSøknadsdata');

const mockVirksomhet: Virksomhet = {
    fom: ISODateToDate('2000-01-01'),
} as any;

const mockArbeidsforhold: ArbeidsforholdSelvstendigFormValues = {} as any;

const formData: SelvstendigFormData = {
    harHattInntektSomSN: YesOrNo.YES,
    harFlereVirksomheter: YesOrNo.YES,
    arbeidsforhold: mockArbeidsforhold,
    virksomhet: mockVirksomhet,
};

describe('extractArbeidSelvstendigSøknadsdata', () => {
    describe('Er ikke selvstendig i søknadsperiode', () => {
        it('returnerer erIkkeSN dersom bruker svarer at en ikke er selvstendig', () => {
            const result = extractArbeidSelvstendigSøknadsdata(undefined, søknadsperiode);
            expect(result?.type).toEqual('erIkkeSN');
        });
        it('returnerer undefined dersom arbeidsforhold ikke kan hentes ut', () => {
            arbeidsforholdSpy.mockReturnValue(undefined);
            const result = extractArbeidSelvstendigSøknadsdata({ ...formData, arbeidsforhold: {} }, søknadsperiode);
            expect(result).toBeUndefined();
        });
        it('returnerer undefined dersom virksomhet startet etter søknadsperiode', () => {
            const mockVirksomhetStartetEtterSøknadsperiode: Virksomhet = {
                fom: ISODateToDate('2022-03-01'),
            } as any;
            const result = extractArbeidSelvstendigSøknadsdata(
                { ...formData, virksomhet: mockVirksomhetStartetEtterSøknadsperiode },
                søknadsperiode
            );
            expect(result).toBeUndefined();
        });
    });

    describe('er selvstendig i perioden', () => {
        beforeEach(() => {
            arbeidsforholdSpy.mockReturnValue({} as any);
        });

        it('returnerer riktig info når en har én eller flere virksomheter', () => {
            const result = extractArbeidSelvstendigSøknadsdata(formData, søknadsperiode);
            expect(result).toBeDefined();
            expect(result?.type).toEqual('erSN');
            if (result?.type === 'erSN') {
                expect(result?.arbeidsforhold).toBeDefined();
                expect(result?.startdato).toBeDefined();
            }
        });
        it('returnerer arbeidsforhold og startdato info når en har én eller flere virksomheter', () => {
            const result = extractArbeidSelvstendigSøknadsdata(formData, søknadsperiode);
            expect(result).toBeDefined();
            expect(result?.type).toEqual('erSN');
            if (result?.type === 'erSN') {
                expect(result?.arbeidsforhold).toBeDefined();
                expect(result?.startdato).toBeDefined();
                expect(result?.virksomhet).toBeDefined();
            }
        });
    });
});
