import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFrilanserFormValues } from '../../../types/ArbeidsforholdFormValues';
import { FrilansFormData, FrilansTyper } from '../../../types/FrilansFormData';
import { extractArbeidFrilansSøknadsdata } from '../extractArbeidFrilansSøknadsdata';

const søknadsperiode = ISODateRangeToDateRange('2022-01-01/2022-02-01');

const mockArbeidsforhold: ArbeidsforholdFrilanserFormValues = {} as any;

const formData: FrilansFormData = {
    harHattInntektSomFrilanser: YesOrNo.YES,
    frilansTyper: [FrilansTyper.FRILANS],
    startdato: '2020-01-01',
    arbeidsforhold: mockArbeidsforhold,
};

describe('extractArbeidFrilansSøknadsdata', () => {
    describe('Er ikke frilanser i søknadsperiode', () => {
        it('returnerer erIkkeFrilanser dersom bruker ikke har oppdrag og har svart nei', () => {
            const result = extractArbeidFrilansSøknadsdata(
                { ...formData, harHattInntektSomFrilanser: YesOrNo.NO },
                søknadsperiode
            );
            expect(result).toBeDefined();
            expect(result?.type).toEqual('erIkkeFrilanser');
        });
        /*
        it('returnerer avsluttetFørSøknadsperiode dersom bruker har oppdrag men er ikke frilanser lenger', () => {
            const result = extractArbeidFrilansSøknadsdata(
                {
                    ...formData,
                    harHattInntektSomFrilanser: YesOrNo.NO,
                    erFortsattFrilanser: YesOrNo.NO,
                    sluttdato: dateToISODate(datoFørSøknadsperiode),
                },
                søknadsperiode
            );
            expect(result).toBeDefined();
            expect(result?.type).toEqual('avsluttetFørSøknadsperiode');
        });*/
    });
    /*
    describe('er frilanser i perioden', () => {
        beforeEach(() => {
            arbeidsforholdSpy.mockReturnValue({} as any);
        });
        
        it('returnerer sluttetISøknadsperiode og arbeidsforhod dersom bruker har oppdrag men er ikke frilanser lenger', () => {
            const result = extractArbeidFrilansSøknadsdata(
                {
                    ...formData,
                    arbeidsforhold: {} as any,
                    erFortsattFrilanser: YesOrNo.NO,
                    sluttdato: dateToISODate(datoISøknadsperiode),
                },
                søknadsperiode
            );
            expect(result).toBeDefined();
            expect(result?.type).toEqual('sluttetISøknadsperiode');
        });

        it('returnerer pågående dersom bruker fortsatt er frilanser', () => {
            const result = extractArbeidFrilansSøknadsdata(
                {
                    ...formData,
                    arbeidsforhold: {} as any,
                    harHattInntektSomFrilanser: YesOrNo.YES,
                },
                søknadsperiode
            );
            expect(result).toBeDefined();
            expect(result?.type).toEqual('pågående');
        });
    });*/
});
