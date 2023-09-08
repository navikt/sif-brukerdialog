import { ArbeidsgiverAnsattApiData } from '../../types/søknad-api-data/SøknadApiData';
import { ArbeidssituasjonArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { getArbeidsgiverApiDataFromSøknadsdata } from './getArbeidsgiverApiDataFromSøknadsdata';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    arbeidssituasjoner: ArbeidssituasjonArbeidsgivereSøknadsdata | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined,
): ArbeidsgiverAnsattApiData[] => {
    if (!arbeidssituasjoner || arbeidssituasjoner.size === 0) {
        return [];
    }
    const arbeidsgivereApiData: ArbeidsgiverAnsattApiData[] = [];
    arbeidssituasjoner.forEach((arbeidssituasjon) => {
        const arbeidIPeriode = arbeidstid?.arbeidsgivere.get(arbeidssituasjon.arbeidsgiver.id);
        arbeidsgivereApiData.push(getArbeidsgiverApiDataFromSøknadsdata(arbeidssituasjon, arbeidIPeriode));
    });
    return arbeidsgivereApiData;
};
