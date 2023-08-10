import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidssituasjonArbeidsgivereSøknadsdata } from '../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    ansattSøknadsdata?: ArbeidssituasjonArbeidsgivereSøknadsdata
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!ansattSøknadsdata || ansattSøknadsdata.size === 0) {
        return undefined;
    }
    const avsluttetFørSøknadsperiode: ArbeidsforholdAvsluttetFørSøknadsperiode[] = [];
    ansattSøknadsdata.forEach((ansatt) => {
        if (ansatt.type !== 'sluttetFørSøknadsperiode') {
            avsluttetFørSøknadsperiode.push({
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                navn: ansatt.arbeidsgiver.navn,
                orgnr: ansatt.arbeidsgiver.organisasjonsnummer,
            });
        }
    });
    return avsluttetFørSøknadsperiode;
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {
        arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
            søknadsdata.arbeidssituasjon?.arbeidsgivere
        ),
    };
};
