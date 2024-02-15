import { DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { ArbeidssituasjonTidsromValidationKeys, validateArbeidssituasjonTidsrom } from '../arbeidssituasjonStepUtils';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types';
import dayjs from 'dayjs';

describe('arbeidssituasjonStepUtils', () => {
    describe('validateArbeidssituasjonTidsrom', () => {
        const fraværsperiode: DateRange = ISODateRangeToDateRange('2022-15-01/2022-20-01');
        it('godtar at en starter som frilanser på samme dag som en starter fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    frilans_erFrilanser: YesOrNo.YES,
                    frilans_startdato: dayjs(fraværsperiode.from).add(0, 'days').format('YYYY-MM-DD'),
                    frilans_jobberFortsattSomFrilans: YesOrNo.YES,
                },
                fraværsperiode,
            );
            expect(result).toEqual(undefined);
        });
        it('feiler dersom en starter som frilanser i eller etter fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    frilans_erFrilanser: YesOrNo.YES,
                    frilans_startdato: dayjs(fraværsperiode.from).add(1, 'days').format('YYYY-MM-DD'),
                    frilans_jobberFortsattSomFrilans: YesOrNo.YES,
                },
                fraværsperiode,
            );
            expect(result).toEqual(ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeStarterEtterFraværsperiode);
        });
        it('feiler dersom en slutter som frilanser før eller i fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    frilans_erFrilanser: YesOrNo.YES,
                    frilans_startdato: dayjs(fraværsperiode.from).subtract(1, 'days').format('YYYY-MM-DD'),
                    frilans_sluttdato: dayjs(fraværsperiode.to).subtract(1, 'days').format('YYYY-MM-DD'),
                    frilans_jobberFortsattSomFrilans: YesOrNo.NO,
                },
                fraværsperiode,
            );
            expect(result).toEqual(ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeSlutterFørEllerIFraværsperiode);
        });
        it('godtar at en starter som selvstendig næringsdrivende på samme dag som en starter fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    selvstendig_virksomhet: {
                        fom: dayjs(fraværsperiode.from).add(0, 'days').toDate(),
                    } as any,
                },
                fraværsperiode,
            );
            expect(result).toEqual(undefined);
        });
        it('feiler dersom en starter som selvstendig næringsdrivende i eller etter fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    selvstendig_virksomhet: {
                        fom: dayjs(fraværsperiode.from).add(1, 'days').toDate(),
                    } as any,
                },
                fraværsperiode,
            );
            expect(result).toEqual(ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeStarterEtterFraværsperiode);
        });
        it('feiler dersom en slutter som selvstendig næringsdrivende før eller i fraværsperiode', () => {
            const result = validateArbeidssituasjonTidsrom(
                {
                    selvstendig_virksomhet: {
                        fom: dayjs(fraværsperiode.from).subtract(1, 'days').toDate(),
                        tom: dayjs(fraværsperiode.to).subtract(1, 'days').toDate(),
                    } as any,
                },
                fraværsperiode,
            );
            expect(result).toEqual(ArbeidssituasjonTidsromValidationKeys.arbeidsperiodeSlutterFørEllerIFraværsperiode);
        });
    });
});
