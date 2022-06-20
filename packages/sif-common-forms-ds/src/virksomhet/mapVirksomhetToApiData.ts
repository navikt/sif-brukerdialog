import { formatDateToApiFormat } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { YesOrNo, getCountryName } from '@navikt/sif-common-formik-ds/lib';
import { Virksomhet, VirksomhetApiData } from './types';
import { erFiskerNæringstype, erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

export const mapVirksomhetToVirksomhetApiData = (
    locale: string,
    virksomhet: Virksomhet,
    harFlereVirksomheter?: boolean,
    harBesvartFiskerPåBladB?: boolean
): VirksomhetApiData => {
    const registrertINorge = virksomhet.registrertINorge === YesOrNo.YES;
    const harRegnskapsfører = virksomhet.harRegnskapsfører === YesOrNo.YES;
    const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(virksomhet.fom);

    const data: VirksomhetApiData = {
        næringstyper: [virksomhet.næringstype],
        navnPåVirksomheten: virksomhet.navnPåVirksomheten,
        registrertINorge,
        ...(registrertINorge
            ? {
                  organisasjonsnummer: virksomhet.organisasjonsnummer,
              }
            : {
                  registrertIUtlandet: virksomhet.registrertILand
                      ? {
                            landkode: virksomhet.registrertILand,
                            landnavn: getCountryName(virksomhet.registrertILand, locale),
                        }
                      : undefined,
              }),
        fraOgMed: formatDateToApiFormat(virksomhet.fom),
        tilOgMed: virksomhet.erPågående || virksomhet.tom === undefined ? null : formatDateToApiFormat(virksomhet.tom),
        erNyoppstartet,
        harFlereAktiveVirksomheter: harFlereVirksomheter === true ? true : false,
    };

    if (erFiskerNæringstype(virksomhet.næringstype) && harBesvartFiskerPåBladB !== true) {
        data.fiskerErPåBladB = virksomhet.fiskerErPåBladB === YesOrNo.YES;
    }

    /** Bedrift regnet som nyoppstartet  */
    if (erNyoppstartet === true) {
        data.næringsinntekt = virksomhet.næringsinntekt;
        const harBlittAktiv = virksomhet.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.YES;
        if (harBlittAktiv && virksomhet.blittYrkesaktivDato) {
            data.yrkesaktivSisteTreFerdigliknedeÅrene = {
                oppstartsdato: formatDateToApiFormat(virksomhet.blittYrkesaktivDato),
            };
        }
    }

    /** Bedrift ikke regnet som nyoppstartet  */
    if (erNyoppstartet === false) {
        const harHattVarigEndring = virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES;
        const {
            varigEndringINæringsinntekt_dato,
            varigEndringINæringsinntekt_forklaring,
            varigEndringINæringsinntekt_inntektEtterEndring,
        } = virksomhet;
        if (
            harHattVarigEndring &&
            varigEndringINæringsinntekt_dato &&
            varigEndringINæringsinntekt_inntektEtterEndring !== undefined &&
            varigEndringINæringsinntekt_forklaring
        ) {
            data.varigEndring = {
                dato: formatDateToApiFormat(varigEndringINæringsinntekt_dato),
                forklaring: varigEndringINæringsinntekt_forklaring,
                inntektEtterEndring: varigEndringINæringsinntekt_inntektEtterEndring,
            };
        }
    }

    if (harRegnskapsfører && virksomhet.regnskapsfører_navn && virksomhet.regnskapsfører_telefon) {
        data.regnskapsfører = {
            navn: virksomhet.regnskapsfører_navn,
            telefon: virksomhet.regnskapsfører_telefon,
        };
    }

    return data;
};
