import { Virksomhet, VirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { booleanToYesOrNo, booleanToYesOrNoOrUnanswered } from '../booleanToYesOrNo';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const mapVirksomhetApiDataToVirksomhet = ({
    fraOgMed,
    tilOgMed,
    erNyoppstartet,
    navnPåVirksomheten,
    næringstyper,
    registrertINorge,
    fiskerErPåBladB,
    næringsinntekt,
    organisasjonsnummer,
    registrertIUtlandet,
    regnskapsfører,
    varigEndring,
    yrkesaktivSisteTreFerdigliknedeÅrene,
}: VirksomhetApiData): Virksomhet => {
    const erPågående = tilOgMed === undefined;
    const virksomhet: Virksomhet = {
        næringstype: næringstyper[0],
        navnPåVirksomheten,
        fiskerErPåBladB: booleanToYesOrNoOrUnanswered(fiskerErPåBladB),
        registrertINorge: booleanToYesOrNo(registrertINorge),
        fom: ISODateToDate(fraOgMed),
        tom: tilOgMed ? ISODateToDate(tilOgMed) : undefined,
        erPågående,
        harRegnskapsfører: booleanToYesOrNo(regnskapsfører !== undefined),
    };
    if (regnskapsfører) {
        virksomhet.regnskapsfører_navn = regnskapsfører.navn;
        virksomhet.regnskapsfører_telefon = regnskapsfører.telefon;
    }
    if (registrertINorge) {
        virksomhet.organisasjonsnummer = organisasjonsnummer;
    }
    if (registrertIUtlandet) {
        virksomhet.registrertILand = registrertIUtlandet.landkode;
    }
    if (erNyoppstartet) {
        virksomhet.næringsinntekt = næringsinntekt;
    }
    if (varigEndring) {
        virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår = YesOrNo.YES;
        virksomhet.varigEndringINæringsinntekt_dato = ISODateToDate(varigEndring.dato);
        virksomhet.varigEndringINæringsinntekt_forklaring = varigEndring.forklaring;
        virksomhet.varigEndringINæringsinntekt_inntektEtterEndring = varigEndring.inntektEtterEndring;
    }
    if (yrkesaktivSisteTreFerdigliknedeÅrene) {
        virksomhet.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = YesOrNo.YES;
        virksomhet.blittYrkesaktivDato = ISODateToDate(yrkesaktivSisteTreFerdigliknedeÅrene.oppstartsdato);
    }
    return virksomhet;
};
