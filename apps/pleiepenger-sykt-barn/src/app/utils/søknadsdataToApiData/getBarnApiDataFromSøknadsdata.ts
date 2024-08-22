import { RegistrerteBarn } from '../../types';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';

export type BarnApiData = Pick<
    SøknadApiData,
    'barn' | 'barnRelasjon' | 'barnRelasjonBeskrivelse' | '_barnetHarIkkeFnr'
>;

export const getBarnApiDataFromSøknadsdata = (
    registrerteBarn: RegistrerteBarn[],
    omBarnetSøknadsdata?: OmBarnetSøknadsdata,
): BarnApiData => {
    if (omBarnetSøknadsdata === undefined) {
        throw Error('omBarnetSøknadsdata undefined');
    }

    switch (omBarnetSøknadsdata?.type) {
        case 'registrerteBarn':
            // eslint-disable-next-line no-case-declarations
            const barnChosenFromList = registrerteBarn.find(
                (currentBarn) => currentBarn.aktørId === omBarnetSøknadsdata.aktørId,
            );

            if (barnChosenFromList === undefined) {
                throw Error('barnChosenFromList undefined');
            }
            // eslint-disable-next-line no-case-declarations
            const { fornavn, etternavn, mellomnavn, aktørId, harSammeAdresse: sammeAdresse } = barnChosenFromList;

            return {
                barn: {
                    navn: formatName(fornavn, etternavn, mellomnavn),
                    aktørId,
                    fødselsdato: dateToISODate(barnChosenFromList.fødselsdato),
                    sammeAdresse: sammeAdresse,
                },
            };
        case 'annetBarn':
            return {
                barn: {
                    navn: omBarnetSøknadsdata.barnetsNavn,
                    fødselsnummer: omBarnetSøknadsdata.barnetsFødselsnummer,
                },
                barnRelasjon: omBarnetSøknadsdata.relasjonTilBarnet,
                barnRelasjonBeskrivelse: omBarnetSøknadsdata.relasjonTilBarnetBeskrivelse,
            };

        case 'annetBarnUtenFnr':
            return {
                barn: {
                    navn: omBarnetSøknadsdata.barnetsNavn,
                    årsakManglerIdentitetsnummer: omBarnetSøknadsdata.årsakManglerIdentitetsnummer,
                    fødselsdato: omBarnetSøknadsdata.barnetsFødselsdato,
                },
                barnRelasjon: omBarnetSøknadsdata.relasjonTilBarnet,
                barnRelasjonBeskrivelse: omBarnetSøknadsdata.relasjonTilBarnetBeskrivelse,
                _barnetHarIkkeFnr: true,
            };
    }
};
