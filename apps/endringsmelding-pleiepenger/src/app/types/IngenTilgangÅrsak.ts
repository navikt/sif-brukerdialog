export enum IngenTilgangÅrsak {
    harIngenSak = 'harIngenSak',
    søknadsperioderUtenforTillattEndringsperiode = 'søknadsperioderUtenforTillattEndringsperiode',
    harMerEnnEnSak = 'harMerEnnEnSak',
    harIngenPerioder = 'harIngenPerioder',
    harArbeidstidSomSelvstendigNæringsdrivende = 'harArbeidstidSomSelvstendigNæringsdrivende',
    enArbeidsgiverToAnsettelserSammeUkeMedOpphold = 'enArbeidsgiverToAnsettelserSammeUkeMedOpphold',
    harFlereAnsettelsesforholdHosUkjentArbeidsgiver = 'harFlereAnsettelsesforholdHosUkjentArbeidsgiver',
    barnManglerIdentitetsnummer = 'barnManglerIdentitetsnummer',
    /** Frontend kan ikke lese saken backend har gitt tilgang til. */
    harUgyldigK9FormatSak = 'harUgyldigK9FormatSak',
    /** Årsak fra backend som frontend ikke kjenner. Vises med generell melding. */
    ukjent = 'ukjent',
}
