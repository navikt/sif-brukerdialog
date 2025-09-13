import { DateRange } from '@navikt/sif-common-formik-ds';
import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/src/forms/virksomhet/mapVirksomhetToApiData';
import { ArbeidsforholdApiData, SelvstendigNæringsdrivendeApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';

export const getSelvstendigApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    dagerMedPleie: Date[],
    skalJobbeIPerioden: boolean,
    selvstendig?: ArbeidSelvstendigSøknadsdata,
    arbeidIperiode?: ArbeidIPeriodeSøknadsdata,
): SelvstendigNæringsdrivendeApiData | undefined => {
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
                arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(
                    skalJobbeIPerioden,
                    arbeidIperiode,
                    søknadsperiode,
                    jobberNormaltTimer,
                    dagerMedPleie,
                ),
            };

            return { virksomhet: virksomhetApi, arbeidsforhold };
        }
    }
};
