import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnenForeldrenSituasjon } from '../../../types/AnnenForeldrenSituasjon';
import { AnnenForelderenSituasjonSøknadsdata } from '../../../types/søknadsdata/AnnenForelderenSituasjonSøknadsdata';
import { OmAnnenForelderSøknadsdata } from '../../../types/søknadsdata/OmAnnenForelderSøknadsdata';
import {
    AnnenForelderToApiData,
    getApiDataAnnenForelderFromSøknadsdata,
} from '../getApiDataAnnenForelderFromSøknadsdata';

describe('getApiDataAnnenForelderFromSøknadsdata', () => {
    const omAnnenForelder: OmAnnenForelderSøknadsdata = {
        type: 'omAnnenForelder',
        annenForelderNavn: 'John Doe',
        annenForelderFnr: '12345678910',
    };

    const annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata = {
        type: 'sykdomAnnetFomTom',
        annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
        annenForelderSituasjonBeskrivelse: 'Beskrivelse av situasjon',
        annenForelderPeriodeFom: '2022-02-24',
        annenForelderPeriodeTom: '2022-02-28',
        annenForelderPeriodeVetIkkeTom: false,
    };

    it('should return expected data for "sykdomAnnetFomTom" type', () => {
        const result = getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderenSituasjon);

        const expected: AnnenForelderToApiData = {
            annenForelder: {
                navn: 'John Doe',
                fnr: '12345678910',
                situasjon: AnnenForeldrenSituasjon.sykdom,
                situasjonBeskrivelse: 'Beskrivelse av situasjon',
                periodeFraOgMed: '2022-02-24',
                periodeTilOgMed: '2022-02-28',
            },
        };

        expect(result).toEqual(expected);
    });

    it('should return expected data for "sykdomAnnetFom" type', () => {
        const annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata = {
            type: 'sykdomAnnetFom',
            annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
            annenForelderSituasjonBeskrivelse: 'Beskrivelse av situasjon',
            annenForelderPeriodeFom: '2022-02-24',
            annenForelderPeriodeVetIkkeTom: true,
            annenForelderPeriodeMer6Maneder: YesOrNo.YES,
        };

        const result = getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderenSituasjon);

        const expected: AnnenForelderToApiData = {
            annenForelder: {
                navn: 'John Doe',
                fnr: '12345678910',
                situasjon: AnnenForeldrenSituasjon.sykdom,
                situasjonBeskrivelse: 'Beskrivelse av situasjon',
                periodeFraOgMed: '2022-02-24',
                periodeOver6Måneder: true,
            },
        };

        expect(result).toEqual(expected);
    });

    it('should return correct API data for innlagtIHelseinstitusjon with fom and tom', () => {
        const annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata = {
            type: 'helseinstitusjonFomTom',
            annenForelderSituasjon: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
            annenForelderPeriodeFom: '2022-01-01',
            annenForelderPeriodeTom: '2022-02-28',
            annenForelderPeriodeVetIkkeTom: false,
        };
        const apiData = getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderenSituasjon);
        expect(apiData).toEqual({
            annenForelder: {
                navn: 'John Doe',
                fnr: '12345678910',
                situasjon: 'INNLAGT_I_HELSEINSTITUSJON',
                periodeFraOgMed: '2022-01-01',
                periodeTilOgMed: '2022-02-28',
            },
        });
    });

    it('should return correct API data for innlagtIHelseinstitusjon with fom', () => {
        const annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata = {
            type: 'helseinstitusjonFom',
            annenForelderSituasjon: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
            annenForelderPeriodeFom: '2022-01-01',
            annenForelderPeriodeVetIkkeTom: true,
            annenForelderPeriodeMer6Maneder: YesOrNo.YES,
        };
        const apiData = getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderenSituasjon);
        expect(apiData).toEqual({
            annenForelder: {
                navn: 'John Doe',
                fnr: '12345678910',
                situasjon: 'INNLAGT_I_HELSEINSTITUSJON',
                periodeFraOgMed: '2022-01-01',
                periodeOver6Måneder: true,
            },
        });
    });

    it('should return correct API data for fengselVerneplikt', () => {
        const annenForelderenSituasjon: AnnenForelderenSituasjonSøknadsdata = {
            type: 'fengselVerneplikt',
            annenForelderSituasjon: AnnenForeldrenSituasjon.fengsel,
            annenForelderPeriodeFom: '2023-02-01',
            annenForelderPeriodeTom: '2023-02-28',
        };

        const expectedApiData: AnnenForelderToApiData = {
            annenForelder: {
                navn: 'John Doe',
                fnr: '12345678910',
                situasjon: AnnenForeldrenSituasjon.fengsel,
                periodeFraOgMed: annenForelderenSituasjon.annenForelderPeriodeFom,
                periodeTilOgMed: annenForelderenSituasjon.annenForelderPeriodeTom,
            },
        };

        const result = getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderenSituasjon);
        expect(result).toEqual(expectedApiData);
    });
});
