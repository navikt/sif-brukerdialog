import { IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core/lib/utils/intlUtils';

const arbeidstidPeriodeFormFormMessages = {
    nb: {
        'arbeidstidPeriodeForm.tittel': `Periode med jobb - {arbeidsstedNavn}`,
        'arbeidstidPeriodeForm.submitButtonLabel': 'Ok',
        'arbeidstidPeriodeForm.cancelButtonLabel': 'Avbryt',
        'arbeidstidPeriodeForm.fraOgMed.label': 'Fra og med',
        'arbeidstidPeriodeForm.tilOgMed.label': 'Til og med',
        'arbeidstidPeriodeForm.velgHelePerioden': 'Velg hele søknadsperioden',
        'arbeidstidPeriodeForm.tidFasteDager.label': `Fyll ut hvor mye du jobber i uken i perioden:`,
        'arbeidstidPeriodeForm.tidFasteUkedager.label': `Fyll ut hvor mye du jobber de ulike ukedagene i perioden:`,
        'arbeidstidPeriodeForm.arbeiderIPerioden.spm': 'Hvordan jobber du {hvor} i denne perioden?',
        'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberIkke': 'Jeg er helt borte fra jobb på grunn av pleiepenger',
        'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
        'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberVanlig':
            'Jeg jobber som vanlig og har ikke fravær fra jobb på grunn av pleiepenger',
        'arbeidstidPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        'arbeidstidPeriodeForm.validation.fom.dateHasInvalidFormat':
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'arbeidstidPeriodeForm.validation.fom.fromDateIsAfterToDate':
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.fom.dateIsBeforeMin': 'Fra-datoen kan ikke være før perioden du har søkt om.',
        'arbeidstidPeriodeForm.validation.tom.dateIsBeforeMin': 'Til-datoen kan ikke være før perioden du har søkt om.',
        'arbeidstidPeriodeForm.validation.fom.dateIsAfterMax':
            'Fra-datoen kan ikke være etter perioden du har søkt for.',
        'arbeidstidPeriodeForm.validation.fom.dateIsNotWeekday':
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        'arbeidstidPeriodeForm.validation.tom.dateHasInvalidFormat':
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'arbeidstidPeriodeForm.validation.tom.toDateIsBeforeFromDate':
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.tom.dateIsAfterMax':
            'Til-datoen kan ikke være etter perioden du har søkt for.',
        'arbeidstidPeriodeForm.validation.tom.dateIsNotWeekday':
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.fasteDager.gruppe.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du jobber i uken.',
        'arbeidstidPeriodeForm.validation.fasteDager.gruppe.forMangeTimer':
            'Du kan ikke oppgi mer enn 24 timer for én dag.',
        'arbeidstidPeriodeForm.validation.arbeiderHvordan.noValue':
            'Du må svare på hvordan du jobber {hvor} i denne perioden.',

        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.timeHasNoValue':
            'Du må fylle ut timer og minutter for {dag}.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.hoursAreInvalid':
            'Antall timer på {dag} er ikke et gyldig tall.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.minutesAreInvalid':
            'Antall minutter på {dag} er ikke et gyldig tall.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.tooManyHours':
            'Antall timer på {dag} kan ikke overstige 24 timer.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.tooManyMinutes':
            'Antall minutter på {dag}  kan ikke overstige 59 minutter.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.durationIsTooShort':
            'Antall timer og minutter {dag}  kan ikke være mindre enn 0 timer og 0 minutter.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.minutesAreNegative':
            'Antall timer og minutter {dag}  kan ikke være mindre enn 0 timer og 0 minutter.',
        'arbeidstidPeriodeForm.validation.tidFasteDager.tid.hoursAreNegative':
            'Antall timer og minutter {dag}  kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

const arbeidIPeriodeIntlValuesMessages = {
    nb: {
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    },
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidstidPeriodeFormFormMessages.nb,
        ...arbeidIPeriodeIntlValuesMessages.nb,
        'arbeidstidPeriodeDialog.contentLabel': 'Registrer jobb for en periode',
        'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
