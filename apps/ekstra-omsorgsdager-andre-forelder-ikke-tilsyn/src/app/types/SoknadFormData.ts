import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { AndreBarn } from '../pre-common/forms/barn/types';

export enum AnnenForeldrenSituasjon {
    'sykdom' = 'SYKDOM',
    'innlagtIHelseinstitusjon' = 'INNLAGT_I_HELSEINSTITUSJON',
    'fengsel' = 'FENGSEL',
    'utøverVerneplikt' = 'UTØVER_VERNEPLIKT',
    'annet' = 'ANNET',
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    annenForelderNavn = 'annenForelderNavn',
    annenForelderEtternavn = 'annenForelderEtternavn',
    annenForelderFnr = 'annenForelderFnr',
    annenForelderSituasjon = 'annenForelderSituasjon',
    annenForelderSituasjonBeskrivelse = 'annenForelderSituasjonBeskrivelse',
    annenForelderPeriodeFom = 'annenForelderPeriodeFom',
    annenForelderPeriodeTom = 'annenForelderPeriodeTom',
    annenForelderPeriodeVetIkkeTom = 'annenForelderPeriodeVetIkkeTom',
    annenForelderPeriodeMer6Maneder = 'annenForelderPeriodeMer6Maneder',
    andreBarn = 'andreBarn',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.annenForelderNavn]: string;
    [SoknadFormField.annenForelderFnr]: string;
    [SoknadFormField.annenForelderSituasjon]?: AnnenForeldrenSituasjon;
    [SoknadFormField.annenForelderSituasjonBeskrivelse]: string;
    [SoknadFormField.annenForelderPeriodeFom]: string;
    [SoknadFormField.annenForelderPeriodeTom]?: string;
    [SoknadFormField.annenForelderPeriodeVetIkkeTom]?: boolean;
    [SoknadFormField.annenForelderPeriodeMer6Maneder]: YesOrNo;
    [SoknadFormField.andreBarn]: AndreBarn[];
}
