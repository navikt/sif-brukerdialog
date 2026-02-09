import { sifCommonPleiepengerMessages_nb } from './nb';

export const sifCommonPleiepengerMessages_nn: Record<keyof typeof sifCommonPleiepengerMessages_nb, string> = {
    'tilsynsordningPeriodeForm.tittel': 'Oppgje periode med omsorgstilbod',
    'tilsynsordningPeriodeForm.submitButtonLabel': 'Ok',
    'tilsynsordningPeriodeForm.cancelButtonLabel': 'Avbryt',
    'tilsynsordningPeriodeForm.periode.legend': 'Vel periode',
    'tilsynsordningPeriodeForm.fraOgMed.label': 'Frå og med',
    'tilsynsordningPeriodeForm.tilOgMed.label': 'Til og med',
    'tilsynsordningPeriodeForm.tidFasteDager.label': 'Fyll ut tida i omsorgstilbodet som er fast og regelmessig:',

    'tilsynsordningPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut perioden sin frå-dato.',
    'tilsynsordningPeriodeForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje perioden sin frå-dato i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'tilsynsordningPeriodeForm.validation.fom.fromDateIsAfterToDate':
        'Frå-datoen kan ikkje vere etter til-datoen. Skriv inn eller vel dato frå kalenderen.',
    'tilsynsordningPeriodeForm.validation.fom.dateIsBeforeMin':
        'Frå-datoen kan ikkje vere før perioden du har søkt om.',
    'tilsynsordningPeriodeForm.validation.tom.dateIsBeforeMin':
        'Til-datoen kan ikkje vere før perioden du har søkt om.',
    'tilsynsordningPeriodeForm.validation.fom.dateIsAfterMax':
        'Frå-datoen kan ikkje vere etter perioden du har søkt for.',
    'tilsynsordningPeriodeForm.validation.fom.dateIsNotWeekday':
        'Frå-dato må vere ein vekedag, det kan ikkje vere ein laurdag eller sundag. Skriv inn eller vel dato frå kalenderen.',
    'tilsynsordningPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut perioden sin til-dato.',
    'tilsynsordningPeriodeForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje perioden sin til-dato i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'tilsynsordningPeriodeForm.validation.tom.toDateIsBeforeFromDate':
        'Til-datoen kan ikkje vere før frå-datoen. Skriv inn eller vel dato frå kalenderen.',
    'tilsynsordningPeriodeForm.validation.tom.dateIsAfterMax':
        'Til-datoen kan ikkje vere etter perioden du har søkt for.',
    'tilsynsordningPeriodeForm.validation.tom.dateIsNotWeekday':
        'Til-dato må vere ein vekedag, det kan ikkje vere ein laurdag eller sundag. Skriv inn eller vel dato frå kalenderen.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.gruppe.ingenTidRegistrert':
        'Du må fylle ut tida i omsorgstilbodet som er fast og regelmessig.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.gruppe.forMangeTimer':
        'Du kan ikkje oppgje meir enn 37 timar og 30 minutt for ei veke.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.timeHasNoValue':
        'Du må fylle ut timar og minutt for {dag}.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.hoursAreInvalid':
        'Talet på timar på {dag} er ikkje eit gyldig tal.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.minutesAreInvalid':
        'Talet på minutt på {dag} er ikkje eit gyldig tal.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.tooManyHours':
        'Talet på timar på {dag} kan ikkje overstige 7 timar og 30 minutt.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.tooManyMinutes':
        'Talet på minutt på {dag} kan ikkje overstige 59 minutt.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.durationIsTooLong':
        'Talet på timar og minutt registrert {dag} er for høgt. Tida kan ikkje overstige 7 timar og 30 minutt kvar vekedag.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.durationIsTooShort':
        'Talet på timar og minutt {dato} {hvor} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.minutesAreNegative':
        'Talet på timar og minutt {dag} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'tilsynsordningPeriodeForm.validation.tidFasteDager.tid.hoursAreNegative':
        'Talet på timar og minutt {dag} kan ikkje vere mindre enn 0 timar og 0 minutt.',

    'tilsynsordningMåned.ukeOgÅr': '{ukeOgÅr}',
    'tilsynsordningMåned.dagerRegistrert.dager': '{dager, plural, one {# dag} other {# dagar}} endra.',
    'tilsynsordningMåned.dagerRegistrert.ingenDager': 'Ingen dagar endra.',
    'tilsynsordningPeriodeDialog.contentLabel': 'Registrer tid i omsorgstilbod',

    'tilsynsordningEnkeltdagForm.tittel': 'Tid i omsorgstilbod {dato}',
    'tilsynsordningEnkeltdagForm.tid.spm': 'Kor mykje skal barnet vere i omsorgstilbod {dato}?',
    'tilsynsordningEnkeltdagForm.tid.spm.historisk': 'Kor mykje var barnet i omsorgstilbod {dato}?',

    'tidEnkeltdagForm.endretFra': 'Endra frå',
    'tidEnkeltdagForm.gjelderFlereDager.label': 'Gjenta desse timane for fleire dagar',
    'tidEnkeltdagForm.gjelderFlereDager.info':
        'Vel kva andre dagar i søknadsperioden du ønskjer at desse timane skal registrerast på:',
    'tidEnkeltdagForm.gjentagelse.helUke': 'Alle dagar i veke {ukeNavn}',
    'tidEnkeltdagForm.gjentagelse.delAvUke': 'Alle dagar i veke {ukeNavn}',
    'tidEnkeltdagForm.gjentagelse.helMåned': 'Alle dagar i {månedNavn}',
    'tidEnkeltdagForm.gjentagelse.delAvMåned': 'Alle dagar i {månedNavn}',
    'tidEnkeltdagForm.gjentagelse.dagerFremover': 'Alle {dagerNavn} frå og med {fra}',
    'tidEnkeltdagForm.gjentagelse.periode': '({fra} - {til})',
    'tidEnkeltdagForm.stoppGjentagelse.label': 'Vel ein annan til og med dato',
    'tidEnkeltdagForm.stopDato.label': 'Vel til og med dato',
    'tidEnkeltdagForm.validation.gjentagelse.noValue':
        'Du må velje kva fleire dagar tida skal gjelde, eller velje bort valet om at det gjeld fleire dagar.',
    'tidEnkeltdagForm.validation.stopDato.dateHasNoValue': 'Du må fylle ut til og med dato.',
    'tidEnkeltdagForm.validation.stopDato.dateHasInvalidFormat':
        'Du må oppgje til og med dato i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'tidEnkeltdagForm.validation.stopDato.dateIsBeforeMin': 'Du kan ikkje setje til og med dato til før frå-datoen.',
    'tidEnkeltdagForm.validation.stopDato.dateIsNotWeekday':
        'Til og med datoen må vere ein laurdag eller sundag. Skriv inn eller vel dato frå kalenderen.',
    'tidEnkeltdagForm.validation.stopDato.dateIsAfterMax':
        'Til og med dato kan ikkje vere etter perioden du søkjer for.',
    'tidEnkeltdagForm.validation.tid.timeHasNoValue': 'Du må fylle ut timar og minutt.',
    'tidEnkeltdagForm.validation.tid.hoursAreInvalid': 'Talet på timar er ikkje eit gyldig tal.',
    'tidEnkeltdagForm.validation.tid.hoursAreNegative': 'Talet på timar kan ikkje vere eit negativt tal.',
    'tidEnkeltdagForm.validation.tid.minutesAreInvalid': 'Talet på minutt er ikkje eit gyldig tal.',
    'tidEnkeltdagForm.validation.tid.minutesAreNegative': 'Talet på minutt kan ikkje vere eit negativt tal.',
    'tidEnkeltdagForm.validation.tid.tooManyHours':
        'Talet på timar og minutt kan ikkje overstige {maksTimer} timar og {maksMinutter} minutt.',
    'tidEnkeltdagForm.validation.tid.tooManyMinutes':
        'Talet på timar og minutt kan ikkje overstige {maksTimer} timar og {maksMinutter} minutt.',
    'tidEnkeltdagForm.validation.tid.durationIsTooLong':
        'Talet på timar og minutt kan ikkje overstige {maksTimer} timar og {maksMinutter} minutt.',
    'tidEnkeltdagForm.validation.tid.durationIsTooShort':
        'Talet på timar og minutt kan ikkje vere mindre enn {minTimer} timar og {minMinutter} minutt.',

    'calendarGrid.Mandag': 'Måndag',
    'calendarGrid.Tirsdag': 'Tysdag',
    'calendarGrid.Onsdag': 'Onsdag',
    'calendarGrid.Torsdag': 'Torsdag',
    'calendarGrid.Fredag': 'Fredag',
    'calendarGrid.uke': 'veke',
    'calendarGrid.Uke': 'Veke',
    'calendarGrid.måned': 'månad',
    'calendarGrid.Måned': 'Månad',
};
