import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledning,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidsgivereSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!arbeidsgivere) {
        return undefined;
    }
    return Object.keys(arbeidsgivere)
        .filter((key) => arbeidsgivere[key].ansattISøknadsperiode === false)
        .map((key) => {
            return {
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                orgnr: key,
            };
        });
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledning => {
    return {
        soknadDialogCommitSha: getCommitShaFromEnv(),
        annet: {
            arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
                søknadsdata.arbeid?.arbeidsgivere
            ),
        },
    };
};
