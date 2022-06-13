import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export enum IntroFormField {
    'erArbeidstakerSnEllerFrilanser' = 'erArbeidstakerSnEllerFrilanser',
    'harAleneomsorg' = 'harAleneomsorg',
    'mottakerErEktefelleEllerSamboer' = 'mottakerErEktefelleEllerSamboer',
    'mottakersArbeidssituasjonErOk' = 'mottakersArbeidssituasjonErOk',
    'korona' = 'korona',
    'mottakerSamværsforelder' = 'mottakerSamværsforelder',
}

export interface IntroFormData {
    [IntroFormField.erArbeidstakerSnEllerFrilanser]: YesOrNo;
    [IntroFormField.harAleneomsorg]: YesOrNo;
    [IntroFormField.mottakerErEktefelleEllerSamboer]: YesOrNo;
    [IntroFormField.mottakersArbeidssituasjonErOk]: YesOrNo;
    [IntroFormField.korona]: YesOrNo;
    [IntroFormField.mottakerSamværsforelder]: YesOrNo;
}

export const introFormInitialValues: Partial<IntroFormData> = {
    [IntroFormField.erArbeidstakerSnEllerFrilanser]: YesOrNo.UNANSWERED,
    [IntroFormField.harAleneomsorg]: YesOrNo.UNANSWERED,
    [IntroFormField.mottakerErEktefelleEllerSamboer]: YesOrNo.UNANSWERED,
    [IntroFormField.mottakersArbeidssituasjonErOk]: YesOrNo.UNANSWERED,
    [IntroFormField.korona]: YesOrNo.UNANSWERED,
    [IntroFormField.mottakerSamværsforelder]: YesOrNo.UNANSWERED,
};
