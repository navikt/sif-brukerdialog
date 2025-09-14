import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { DeltakelsePeriode } from '../../../../types/DeltakelsePeriode';
import { SøkYtelseOppgave } from '../../../../types/Oppgave';
import { HarKontonummerEnum } from '../../../søknad/steg/oppsummering/oppsummeringUtils';
import { KontonummerOppslagInfo } from '../../../søknad/types';
import { logUtils } from '../logUtils';

describe('logUtils.getSøknadInnsendingMeta', () => {
    const mockDeltakelse: DeltakelsePeriode = {
        id: 'test-id',
        programPeriode: {
            from: dayjs().subtract(10, 'days').toDate(),
            to: dayjs().add(30, 'days').toDate(),
        },
        søktTidspunkt: dayjs().toDate(),
        oppgaver: [],
        deltaker: {
            deltakerIdent: 'test-ident',
            id: 'deltaker-id',
        },
    };

    const mockOppgave: SøkYtelseOppgave = {
        oppgavetype: Oppgavetype.SØK_YTELSE,
        status: OppgaveStatus.ULØST,
        opprettetDato: dayjs().subtract(1, 'day').toDate(),
        oppgaveReferanse: 'test-ref',
        frist: dayjs().add(7, 'days').toDate(),
        oppgavetypeData: {
            fomDato: dayjs().subtract(10, 'days').toDate(),
        },
    };

    describe('kontonummer-logikk', () => {
        it('skal sette riktig kontonummer-info når bruker har kontonummer og det stemmer', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.JA,
                kontonummerFraRegister: '12345678901',
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerStemmer: true,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harKontonummer).toBe(HarKontonummerEnum.JA);
            expect(result.kontonummerStemmer).toBe(true);
        });

        it('skal sette riktig kontonummer-info når bruker har kontonummer men det stemmer ikke', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.JA,
                kontonummerFraRegister: '12345678901',
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harKontonummer).toBe(HarKontonummerEnum.JA);
            expect(result.kontonummerStemmer).toBe(false);
        });

        it('skal sette riktig kontonummer-info når bruker ikke har kontonummer', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.NEI,
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harKontonummer).toBe(HarKontonummerEnum.NEI);
            expect(result.kontonummerStemmer).toBeUndefined();
        });

        it('skal sette kontonummerStemmer til undefined når harKontonummer ikke er JA', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.UVISST,
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harKontonummer).toBe(HarKontonummerEnum.UVISST);
            expect(result.kontonummerStemmer).toBeUndefined();
        });

        it('skal sette kontonummerStemmer til undefined når kontonummerErRiktig er undefined', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.JA,
                kontonummerFraRegister: '12345678901',
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harKontonummer).toBe(HarKontonummerEnum.JA);
            expect(result.kontonummerStemmer).toBeUndefined();
        });
    });

    describe('barn-logikk', () => {
        it('skal sette harBarn til true når antallBarn er større enn 0', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.NEI,
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 2,
                barnStemmer: true,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harBarn).toBe(true);
            expect(result.barnStemmer).toBe(true);
        });

        it('skal sette harBarn til false når antallBarn er 0', () => {
            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.NEI,
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, mockOppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.harBarn).toBe(false);
            expect(result.barnStemmer).toBe(false);
        });
    });

    describe('tidsmålinger', () => {
        it('skal beregne antall dager mellom opprettet og besvart', () => {
            const opprettetDato = dayjs().subtract(5, 'days');
            const oppgave: SøkYtelseOppgave = {
                ...mockOppgave,
                opprettetDato: opprettetDato.toDate(),
            };

            const kontonummerInfo: KontonummerOppslagInfo = {
                harKontonummer: HarKontonummerEnum.NEI,
            };

            const result = logUtils.getSøknadInnsendingMeta(mockDeltakelse, oppgave, {
                antallBarn: 0,
                barnStemmer: false,
                kontonummerOppslagInfo: kontonummerInfo,
            });

            expect(result.antallDagerMellomOpprettetOgBesvart).toBe(5);
            expect(result.antallMinutterMellomOpprettetOgBesvart).toBe(5 * 24 * 60);
        });
    });
});
