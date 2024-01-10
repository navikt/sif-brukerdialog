import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnenForeldrenSituasjon } from '../../../../types/AnnenForeldrenSituasjon';
import { AnnenForelderenSituasjonSøknadsdata } from '../../../../types/søknadsdata/AnnenForelderenSituasjonSøknadsdata';
import { AnnenForelderenSituasjonFormValues } from '../AnnenForelderenSituasjonStep';
import { getAnnenForelderenSituasjonSøknadsdataFromFormValues } from '../annenForelderenSituasjonStepUtils';

describe('getAnnenForelderenSituasjonSøknadsdataFromFormValues', () => {
    it('should return undefined when neither annenForelderSituasjon nor annenForelderPeriodeFom are defined', () => {
        const values: AnnenForelderenSituasjonFormValues = { annenForelderPeriodeFom: 'undefined' };
        expect(getAnnenForelderenSituasjonSøknadsdataFromFormValues(values)).toBeUndefined();
    });

    it('should return undefined when annenForelderSituasjon is not defined but annenForelderPeriodeFom is defined', () => {
        const values: AnnenForelderenSituasjonFormValues = { annenForelderPeriodeFom: '2022-01-01' };
        expect(getAnnenForelderenSituasjonSøknadsdataFromFormValues(values)).toBeUndefined();
    });

    it('should return undefined when annenForelderSituasjon is defined but annenForelderSituasjonBeskrivelse is not defined for sykdom or annet', () => {
        const values: AnnenForelderenSituasjonFormValues = {
            annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
            annenForelderPeriodeFom: '2022-01-01',
        };
        expect(getAnnenForelderenSituasjonSøknadsdataFromFormValues(values)).toBeUndefined();
    });

    it('should return undefined when annenForelderSituasjon is defined and annenForelderSituasjonBeskrivelse is defined for fengsel or verneplikt', () => {
        const values: AnnenForelderenSituasjonFormValues = {
            annenForelderSituasjon: AnnenForeldrenSituasjon.fengsel,
            annenForelderPeriodeFom: '2022-01-01',
            annenForelderSituasjonBeskrivelse: 'beskrivelse',
        };
        expect(getAnnenForelderenSituasjonSøknadsdataFromFormValues(values)).toBeUndefined();
    });

    it('should return AnnenForelderenSituasjonSøknadsdataSykdomAnnetFom when annenForelderSituasjon is sykdom, annenForelderSituasjonBeskrivelse is defined, and annenForelderPeriodeVetIkkeTom is true', () => {
        const values: AnnenForelderenSituasjonFormValues = {
            annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
            annenForelderPeriodeFom: '2022-01-01',
            annenForelderSituasjonBeskrivelse: 'beskrivelse',
            annenForelderPeriodeVetIkkeTom: true,
            annenForelderPeriodeMer6Maneder: YesOrNo.YES,
        };
        const expected: AnnenForelderenSituasjonSøknadsdata = {
            type: 'sykdomAnnetFom',
            annenForelderSituasjonBeskrivelse: 'beskrivelse',
            annenForelderPeriodeVetIkkeTom: true,
            annenForelderPeriodeMer6Maneder: YesOrNo.YES,
            annenForelderSituasjon: AnnenForeldrenSituasjon.sykdom,
            annenForelderPeriodeFom: '2022-01-01',
        };
        expect(getAnnenForelderenSituasjonSøknadsdataFromFormValues(values)).toEqual(expected);
    });
});
