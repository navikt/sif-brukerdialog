import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/mapVirksomhetToApiData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { ArbeidsforholdApiData, SelvstendigNæringsdrivendeApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';

export const getSelvstendigApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    selvstendig?: ArbeidSelvstendigSøknadsdata,
    arbeidIperiode?: ArbeidIPeriodeSøknadsdata,
): SelvstendigNæringsdrivendeApiData | undefined => {
    if (!selvstendig || !arbeidIperiode) {
        return undefined;
    }

    switch (selvstendig.type) {
        case 'erIkkeSN':
            return undefined;

        case 'erSN':
            const { virksomhet, harFlereVirksomheter, jobberNormaltTimer } = selvstendig;
            const virksomhetApi = mapVirksomhetToVirksomhetApiData('nb', virksomhet, harFlereVirksomheter);
            const arbeidsforhold: ArbeidsforholdApiData = {
                jobberNormaltTimer,
                arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(
                    arbeidIperiode,
                    søknadsperiode,
                    jobberNormaltTimer,
                ),
            };

            return { virksomhet: virksomhetApi, arbeidsforhold };
    }
};
