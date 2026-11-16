import { BostedsvilkårIkkeOppfyltÅrsak } from '@sif/ung-brukerdialog-api';
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

/** Hentet fra ekte respons fra backend (BISTAND_OPPHØR, KOMMET_I_ARBEID). */
const getBistandOpphørOppgaveVarseltekst = (fom: ISODate): string =>
    `Vi har fått opplysninger om at du har begynt å jobbe og ikke lenger trenger hjelp fra Nav til å få jobb eller utdanning. Det betyr at du fra ${dateFormatter.full(fom)} ikke lenger får aktivitetspenger.`;

/** Plassholder til vi har eksempel på varseltekst fra backend. */
const getPlassholderVarseltekst = (vilkår: string, variant: 'periode' | 'opphør'): string =>
    `Mock av varseltekst fra backend for ${vilkår} (${variant}).`;

export const mockVarseltekster = {
    getBostedVilkårOpphørOppgaveVarseltekst,
    getBostedVilkårPeriodeOppgaveVarseltekst,
    getAndreLivsoppholdsytelserOppgaveVarseltekst,
    getAndreLivsoppholdsytelserOpphørOppgaveVarseltekst,
    getBistandOpphørOppgaveVarseltekst,
    getPlassholderVarseltekst,
};
