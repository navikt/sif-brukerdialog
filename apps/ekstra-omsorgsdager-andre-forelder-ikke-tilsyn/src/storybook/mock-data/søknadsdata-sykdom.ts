import { AnnenForeldrenSituasjon } from '../../app/types/AnnenForeldrenSituasjon';
import { Søknadsdata } from '../../app/types/søknadsdata/Søknadsdata';

export const søknadsdataSykdom: Søknadsdata = {
    id: 'f7890e66-64f3-41ce-ad0f-da0874e0925d',
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
    omAnnenForelder: {
        type: 'omAnnenForelder',
        annenForelderNavn: 'Tore Tang',
        annenForelderFnr: '27857798800',
    },
    annenForelderSituasjon: {
        type: 'sykdomAnnetFomTom',
        annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
        annenForelderPeriodeFom: '2024-04-03',
        annenForelderPeriodeTom: '2024-04-05',
        annenForelderSituasjonBeskrivelse: 'Veldig syk',
        annenForelderPeriodeVetIkkeTom: false,
    },
    omBarna: {
        type: 'andreBarn',
        andreBarn: [],
    },
};
