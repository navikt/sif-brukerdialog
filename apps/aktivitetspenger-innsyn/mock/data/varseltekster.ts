import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
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

export const mockVarseltekster = {
    getBostedVilkårOpphørOppgaveVarseltekst,
    getBostedVilkårPeriodeOppgaveVarseltekst,
};
