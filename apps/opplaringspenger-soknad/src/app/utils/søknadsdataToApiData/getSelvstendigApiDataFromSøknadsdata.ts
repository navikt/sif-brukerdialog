import { DateRange } from '@navikt/sif-common-formik-ds';
import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/src/forms/virksomhet/mapVirksomhetToApiData';

import { ArbeidsforholdApiData, SelvstendigNæringsdrivendeApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { getFraværIPeriodeApiDataFromSøknadsdata } from './getFraværIPeriodeApiDataFromSøknadsdata';

export const getSelvstendigApiDataFromSøknadsdata = (props: {
    søknadsperiode: DateRange;
    dagerMedOpplæring: Date[];
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    arbeidIperiode: ArbeidIPeriodeSøknadsdata | undefined;
}): SelvstendigNæringsdrivendeApiData | undefined => {
    const { søknadsperiode, dagerMedOpplæring, selvstendig, arbeidIperiode } = props;
    if (!selvstendig) {
        return undefined;
    }

    switch (selvstendig.type) {
        case 'erIkkeSN':
            return undefined;

        case 'erSN': {
            const { virksomhet, harFlereVirksomheter, jobberNormaltTimer } = selvstendig;
            const virksomhetApi = mapVirksomhetToVirksomhetApiData('nb', virksomhet, harFlereVirksomheter);
            const arbeidsforhold: ArbeidsforholdApiData = {
                jobberNormaltTimer,
                arbeidIPeriode: getFraværIPeriodeApiDataFromSøknadsdata({
                    arbeidIPeriodeSøknadsdata: arbeidIperiode,
                    periode: søknadsperiode,
                    jobberNormaltTimer,
                    valgteDatoer: dagerMedOpplæring,
                }),
            };

            return { virksomhet: virksomhetApi, arbeidsforhold };
        }
    }
};
