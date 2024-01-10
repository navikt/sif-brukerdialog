import { IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const omsorgstilbudPeriodeFormMessages = {
    nb: {
        'omsorgstilbudPeriodeForm.tittel': 'Oppgi periode med omsorgstilbud',
        'omsorgstilbudPeriodeForm.submitButtonLabel': 'Ok',
        'omsorgstilbudPeriodeForm.cancelButtonLabel': 'Avbryt',
        'omsorgstilbudPeriodeForm.periode.legend': 'Periode',
        'omsorgstilbudPeriodeForm.fraOgMed.label': 'Fra og med',
        'omsorgstilbudPeriodeForm.tilOgMed.label': 'Til og med',
        'omsorgstilbudPeriodeForm.tidFasteDager.label': 'Fyll ut tiden i omsorgstilbudet som er fast og regelmessig:',
    },
};

const omsorgstilbudPeriodeFormValidationMessages = {
    nb: {
        'omsorgstilbudPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        'omsorgstilbudPeriodeForm.validation.fom.dateHasInvalidFormat':
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'omsorgstilbudPeriodeForm.validation.fom.fromDateIsAfterToDate':
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsBeforeMin':
            'Fra-datoen kan ikke være før perioden du har søkt om.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsBeforeMin':
            'Til-datoen kan ikke være før perioden du har søkt om.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsAfterMax':
            'Fra-datoen kan ikke være etter perioden du har søkt for.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsNotWeekday':
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        'omsorgstilbudPeriodeForm.validation.tom.dateHasInvalidFormat':
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'omsorgstilbudPeriodeForm.validation.tom.toDateIsBeforeFromDate':
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsAfterMax':
            'Til-datoen kan ikke være etter perioden du har søkt for.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsNotWeekday':
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.gruppe.ingenTidRegistrert':
            'Du må fylle ut tiden i omsorgstilbudet som er fast og regelmessig.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.gruppe.forMangeTimer':
            'Du kan ikke oppgi mer enn 37 timer og 30 minutter for en uke.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.timeHasNoValue':
            'Du må fylle ut timer og minutter for {dag}.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.hoursAreInvalid':
            'Antall timer på {dag} er ikke et gyldig tall.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.minutesAreInvalid':
            'Antall minutter på {dag} er ikke et gyldig tall.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.tooManyHours':
            'Antall timer på {dag} kan ikke overstige 7 timer og 30 minutter.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.tooManyMinutes':
            'Antall minutter på {dag} kan ikke overstige 59 minutter.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 7 timer og 30 minutter hver ukedag.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.durationIsTooShort':
            'Antall timer og minutter {dato} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.minutesAreNegative':
            'Antall timer og minutter {dag}  kan ikke være mindre enn 0 timer og 0 minutter.',
        'omsorgstilbudPeriodeForm.validation.tidFasteDager.tid.hoursAreNegative':
            'Antall timer og minutter {dag}  kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

export const omsorgstibudPeriodeMessages = {
    nb: {
        ...omsorgstilbudPeriodeFormMessages.nb,
        ...omsorgstilbudPeriodeFormValidationMessages.nb,
        'omsorgstilbudMåned.ukeOgÅr': 'Omsorgstilbud {ukeOgÅr}',
        'omsorgstilbudMåned.dagerRegistrert.dager':
            '{dager, plural, one {# dag} other {# dager}} med omsorgstilbud registrert.',
        'omsorgstilbudMåned.dagerRegistrert.ingenDager': 'Ingen dager med omsorgstilbud registrert.',
        'omsorgstilbudPeriodeDialog.contentLabel': 'Registrer tid i omsorgstilbud',
        'omsorgstilbudPeriode.part.skalVære': 'skal være',
    },
};

type OmsorgstilbudPeriodeMessagesType = keyof typeof omsorgstibudPeriodeMessages.nb;

export const getOmsorgstilbudPeriodeIntl = (intl: IntlShape) => typedIntlHelper<OmsorgstilbudPeriodeMessagesType>(intl);
