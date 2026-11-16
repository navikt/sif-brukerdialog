import { BistandsvilkårIkkeOppfyltÅrsak, BostedsvilkårIkkeOppfyltÅrsak } from '@sif/ung-brukerdialog-api';
import { dateFormatter, ISODate } from '@sif/utils';

/** Bosted opphør */
const bostedVilkårOpphørOppgaveTekster = {
    IKKE_BOSATTADRESSE_I_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune, og at du heller ikke er folkeregistrert der. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
        'Vi har fått opplysninger om at du fra {fom} har studie- eller arbeidssted utenfor Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    ANNET: 'Vi har fått opplysninger om at du fra {fom} ikke lenger bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
};

const getBostedVilkårOpphørOppgaveVarseltekst = (fom: ISODate, årsak: BostedsvilkårIkkeOppfyltÅrsak): string => {
    const formatertFom = dateFormatter.compact(fom);
    const tekst = bostedVilkårOpphørOppgaveTekster[årsak];
    return tekst.replace('{fom}', formatertFom);
};

/** Bosted periode */
const bostedVilkårPeriodeOppgaveTekster = {
    IKKE_BOSATTADRESSE_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune, og at du heller ikke er folkeregistrert der. Du må ha bostedsadresse i Trondheim kommune for å få aktivitetspenger.',
    STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
        'Vi har fått opplysninger om at du i perioden {periode} ikke har studie- eller arbeidssted i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
    ANNET: 'Vi har fått opplysninger om at du i perioden {periode} ikke bor i Trondheim kommune. Du må bo i Trondheim kommune for å få aktivitetspenger.',
};

const getBostedVilkårPeriodeOppgaveVarseltekst = (
    periode: { from: ISODate; to: ISODate },
    årsak: BostedsvilkårIkkeOppfyltÅrsak,
): string => {
    const formatertFom = dateFormatter.compact(periode.from);
    const formatertTom = dateFormatter.compact(periode.to);
    const periodeTekst = `${formatertFom} - ${formatertTom}`;
    const tekst = bostedVilkårPeriodeOppgaveTekster[årsak];
    return tekst.replace('{periode}', periodeTekst);
};

const getAndreLivsoppholdsytelserOppgaveVarseltekst = (periode: { from: ISODate; to: ISODate }): string => {
    const formatertFom = dateFormatter.compact(periode.from);
    const formatertTom = dateFormatter.compact(periode.to);
    const periodeTekst = `${formatertFom} - ${formatertTom}`;
    return 'Vi har fått opplysninger om at du i perioden {periode} mottar arbeidsavklaringspenger. Du kan ikke få aktivitetspenger samtidig som du mottar arbeidsavklaringspenger.'.replace(
        '{periode}',
        periodeTekst,
    );
};

const getAndreLivsoppholdsytelserOpphørOppgaveVarseltekst = (fom: ISODate): string => {
    const formatertFom = dateFormatter.compact(fom);
    return 'Vi har fått opplysninger om at du fra {fom} mottar arbeidsavklaringspenger. Du kan ikke få aktivitetspenger samtidig som du mottar arbeidsavklaringspenger.'.replace(
        '{fom}',
        formatertFom,
    );
};

/** Aktivitet og bistand: tekstene følger backendens maler (bekreft_aktivitet.hbs og bekreft_bistand.hbs). */
const getAktivitetOppgaveVarseltekst = (fom: ISODate, tom?: ISODate): string => {
    const tidsrom = tom
        ? `i perioden ${dateFormatter.full(fom)} til ${dateFormatter.full(tom)} ikke er`
        : `fra ${dateFormatter.full(fom)} ikke lenger er`;
    return `Vi har fått opplysninger om at du ${tidsrom} i aktivitet. Du må være i aktivitet for å få aktivitetspenger.`;
};

const getBistandOppgaveVarseltekst = (årsak: BistandsvilkårIkkeOppfyltÅrsak, fom: ISODate, tom?: ISODate): string => {
    const lenger = tom ? '' : 'lenger ';
    const bortfall = tom
        ? `Det betyr at du i perioden ${dateFormatter.full(fom)} til ${dateFormatter.full(tom)} ikke får aktivitetspenger.`
        : `Det betyr at du fra ${dateFormatter.full(fom)} ikke lenger får aktivitetspenger.`;
    switch (årsak) {
        case BistandsvilkårIkkeOppfyltÅrsak.IKKE_14A_VEDTAK: {
            const tidsrom = tom
                ? `i perioden ${dateFormatter.full(fom)} til ${dateFormatter.full(tom)} ikke har`
                : `fra ${dateFormatter.full(fom)} ikke lenger har`;
            return `Vi har fått opplysninger om at du ${tidsrom} et vedtak fra Nav om behov for bistand til å komme i arbeid. Du må ha et slikt vedtak for å få aktivitetspenger.`;
        }
        case BistandsvilkårIkkeOppfyltÅrsak.KOMMET_I_UTDANNING:
            return `Vi har fått opplysninger om at du har begynt på en utdanning og ikke ${lenger}trenger hjelp fra Nav til å få jobb eller utdanning. ${bortfall}`;
        case BistandsvilkårIkkeOppfyltÅrsak.KOMMET_I_ARBEID:
            return `Vi har fått opplysninger om at du har begynt å jobbe og ikke ${lenger}trenger hjelp fra Nav til å få jobb eller utdanning. ${bortfall}`;
        default:
            return `Vi har fått opplysninger om at du ikke ${lenger}trenger hjelp fra Nav til å få jobb eller utdanning. ${bortfall}`;
    }
};

export const mockVarseltekster = {
    getBostedVilkårOpphørOppgaveVarseltekst,
    getBostedVilkårPeriodeOppgaveVarseltekst,
    getAndreLivsoppholdsytelserOppgaveVarseltekst,
    getAndreLivsoppholdsytelserOpphørOppgaveVarseltekst,
    getAktivitetOppgaveVarseltekst,
    getBistandOppgaveVarseltekst,
};
