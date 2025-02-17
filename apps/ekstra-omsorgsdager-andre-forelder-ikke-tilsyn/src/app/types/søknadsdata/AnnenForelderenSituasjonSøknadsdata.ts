import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnenForeldrenSituasjon } from '../AnnenForeldrenSituasjon';

interface AnnenForelderenSituasjonSøknadsdataBase {
    annenForelderSituasjon: AnnenForeldrenSituasjon;
    annenForelderPeriodeFom: string;
}

export interface AnnenForelderenSituasjonSøknadsdataSykdomAnnetFomTom extends AnnenForelderenSituasjonSøknadsdataBase {
    type: 'sykdomAnnetFomTom';
    annenForelderSituasjonBeskrivelse: string;
    annenForelderPeriodeTom: string;
    annenForelderPeriodeVetIkkeTom: false;
}

// vet ikke hvor lenge perioden vil vare
export interface AnnenForelderenSituasjonSøknadsdataSykdomAnnetFom extends AnnenForelderenSituasjonSøknadsdataBase {
    type: 'sykdomAnnetFom';
    annenForelderSituasjonBeskrivelse: string;
    annenForelderPeriodeVetIkkeTom: true;
    annenForelderPeriodeMer6Maneder: YesOrNo;
}

export interface AnnenForelderenSituasjonSøknadsdataHelseinstitusjonFomTom
    extends AnnenForelderenSituasjonSøknadsdataBase {
    type: 'helseinstitusjonFomTom';
    annenForelderPeriodeTom: string;
    annenForelderPeriodeVetIkkeTom: false;
}

// vet ikke hvor lenge perioden vil vare
export interface AnnenForelderenSituasjonSøknadsdataHelseinstitusjonFom
    extends AnnenForelderenSituasjonSøknadsdataBase {
    type: 'helseinstitusjonFom';
    annenForelderPeriodeVetIkkeTom: true;
    annenForelderPeriodeMer6Maneder: YesOrNo;
}

export interface AnnenForelderenSituasjonSøknadsdataFengselVerneplikt extends AnnenForelderenSituasjonSøknadsdataBase {
    type: 'fengselVerneplikt';
    annenForelderPeriodeTom: string;
}

export type AnnenForelderenSituasjonSøknadsdata =
    | AnnenForelderenSituasjonSøknadsdataSykdomAnnetFomTom
    | AnnenForelderenSituasjonSøknadsdataSykdomAnnetFom
    | AnnenForelderenSituasjonSøknadsdataHelseinstitusjonFomTom
    | AnnenForelderenSituasjonSøknadsdataHelseinstitusjonFom
    | AnnenForelderenSituasjonSøknadsdataFengselVerneplikt;
