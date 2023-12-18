import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { AnnenForelderenSituasjonSøknadsdata, OmAnnenForelderSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export type AnnenForelderToApiData = Pick<SøknadApiData, 'annenForelder'>;

export const getApiDataAnnenForelderFromSøknadsdata = (
    omAnnenForelder: OmAnnenForelderSøknadsdata,
    annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata,
): AnnenForelderToApiData => {
    const fellesInfo = {
        navn: omAnnenForelder.annenForelderNavn,
        fnr: omAnnenForelder.annenForelderFnr,
        situasjon: annenForelderenSituasjon.annenForelderSituasjon,
        periodeFraOgMed: annenForelderenSituasjon.annenForelderPeriodeFom,
    };

    switch (annenForelderenSituasjon.type) {
        case 'sykdomAnnetFomTom':
            return {
                annenForelder: {
                    ...fellesInfo,
                    situasjonBeskrivelse: annenForelderenSituasjon.annenForelderSituasjonBeskrivelse,
                    periodeTilOgMed: annenForelderenSituasjon.annenForelderPeriodeTom,
                },
            };
        case 'sykdomAnnetFom':
            return {
                annenForelder: {
                    ...fellesInfo,
                    situasjonBeskrivelse: annenForelderenSituasjon.annenForelderSituasjonBeskrivelse,
                    periodeOver6Måneder: annenForelderenSituasjon.annenForelderPeriodeMer6Maneder === YesOrNo.YES,
                },
            };
        case 'helseinstitusjonFomTom':
            return {
                annenForelder: {
                    ...fellesInfo,
                    periodeTilOgMed: annenForelderenSituasjon.annenForelderPeriodeTom,
                },
            };
        case 'helseinstitusjonFom':
            return {
                annenForelder: {
                    ...fellesInfo,
                    periodeOver6Måneder: annenForelderenSituasjon.annenForelderPeriodeMer6Maneder === YesOrNo.YES,
                },
            };
        case 'fengselVerneplikt':
            return {
                annenForelder: {
                    ...fellesInfo,
                    periodeTilOgMed: annenForelderenSituasjon.annenForelderPeriodeTom,
                },
            };
    }
};
