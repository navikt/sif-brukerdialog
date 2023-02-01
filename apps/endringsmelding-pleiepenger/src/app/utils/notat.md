Resultat:

-   Liste av uker
-   Alle uker er sammenhengende
-   Normalarbeidstid er smurt
-   Faktisk arbeidstid er smurt
-   Første og siste uke kan være ukomplett
-   Kontroller:
    -   Ansettelsesperiode
    -   Søknadsperiode?

```
Interface Arbeidsuke {
    periode: DateRange;
    arbeidsdager: DagerMedArbeidstid;
    timerNormalt: Duration;
    timerFaktisk: Duration;
}
```

Input

```
Arbeidsperiode {
    [ISODateRange]: {
        timerNormalt: Duration;
        timerFaktisk: Duration;
    }
}[]
```

#### Pseudo

-   Slå sammen alle arbeidsperioder som er sammenhengende
    -> "Perioder det er søkt om"

-   enklere å hente ut alle dager og så lage uker?

-   For hver `Arbeidsperiode`
    -   Del alle dager opp i uker
    -   Beregn smurt info + meta for hver uke
