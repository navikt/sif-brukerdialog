/**
 * Felles overrides for skjemanavn i alle codegen-pakker (FQN -> kort navn).
 * Brukes av createSchemaNameResolver i codegenUtils.js (samme mappe) der siste ledd i Java-klassenavnet kolliderer.
 * Varianten som allerede var i bruk, beholder det korte navnet.
 */
export const schemaNameOverrides = {
    'no.nav.k9.kodeverk.behandling.FagsakYtelseType': 'K9FagsakYtelseType',
    'no.nav.k9.søknad.felles.personopplysninger.Utenlandsopphold': 'FellesUtenlandsopphold',
    'no.nav.k9.søknad.felles.personopplysninger.Utenlandsopphold.UtenlandsoppholdPeriodeInfo':
        'FellesUtenlandsoppholdPeriodeInfo',
    'no.nav.k9.søknad.ytelse.psb.v1.DataBruktTilUtledning': 'PsbDataBruktTilUtledning',
};
