import { Link, VStack } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDateToday } from '@navikt/sif-common-utils';
import { getYesOrNoValidator, ValidateYesOrNoError } from '@navikt/sif-validation';
import { MedlemskapFormMessageKeys, MedlemskapFormText, useMedlemskapFormIntl } from '../i18n';
import { getMedlemskapDateRanges } from '../utils';
import {
    MedlemskapFormErrorKeys,
    validateUtenlandsoppholdNeste12Mnd,
    validateUtenlandsoppholdSiste12Mnd,
} from '../utils/medlemskapFieldValidations';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: UtenlandsoppholdEnkel[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: UtenlandsoppholdEnkel[];
}

export const MedlemskapFormErrors: Record<MedlemskapFormFields, { [key: string]: MedlemskapFormMessageKeys }> = {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            '@forms.medlemskapForm.validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered',
    },
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            '@forms.medlemskapForm.validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered',
    },
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: {
        [MedlemskapFormErrorKeys.utenlandsopphold_ikke_registrert]:
            '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert',
        [MedlemskapFormErrorKeys.utenlandsopphold_overlapper]:
            '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper',
        [MedlemskapFormErrorKeys.utenlandsopphold_utenfor_periode]:
            '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode',
    },
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: {
        [MedlemskapFormErrorKeys.utenlandsopphold_ikke_registrert]:
            '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert',
        [MedlemskapFormErrorKeys.utenlandsopphold_overlapper]:
            '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper',
        [MedlemskapFormErrorKeys.utenlandsopphold_utenfor_periode]:
            '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode',
    },
};

const { Form, YesOrNoQuestion } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues, ValidationError>();

interface Props {
    values?: Partial<MedlemskapFormValues> | undefined;
    isSubmitting: boolean;
    medlemskapInfoUrl: string;
    goBack?: () => void;
}

const MedlemskapForm = ({ values = {}, isSubmitting, goBack, medlemskapInfoUrl }: Props) => {
    const { text, intl } = useMedlemskapFormIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemskapDateRanges(getDateToday());

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, '@forms.medlemskapForm.validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <VStack gap="10">
                <SifGuidePanel>
                    <MedlemskapFormText
                        id="@forms.medlemskapForm.info"
                        values={{
                            Lenke: (children: React.ReactNode) => (
                                <Link key="link" href={medlemskapInfoUrl} target="_blank">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </SifGuidePanel>

                <FormLayout.Questions>
                    <YesOrNoQuestion
                        legend={text('@forms.medlemskapForm.annetLandSiste12.spm')}
                        name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                        validate={getYesOrNoValidator()}
                        description={
                            <ExpandableInfo title={text('@forms.medlemskapForm.hvaBetyrDette')}>
                                <MedlemskapFormText id="@forms.medlemskapForm.annetLandSiste12.hjelp" />
                            </ExpandableInfo>
                        }
                    />

                    {values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                        <FormLayout.Panel bleedTop={true}>
                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                                minDate={siste12Måneder.from}
                                maxDate={siste12Måneder.to}
                                labels={{
                                    addLabel: text('@forms.medlemskapForm.utenlandsopphold.leggTilLabel'),
                                    listTitle: text('@forms.medlemskapForm.annetLandSiste12.listeTittel'),
                                    modalTitle: text('@forms.medlemskapForm.annetLandSiste12.listeTittel'),
                                }}
                                validate={validateUtenlandsoppholdSiste12Mnd}
                            />
                        </FormLayout.Panel>
                    )}
                    <YesOrNoQuestion
                        legend={text('@forms.medlemskapForm.annetLandNeste12.spm')}
                        name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                        validate={getYesOrNoValidator()}
                        description={
                            <ExpandableInfo title={text('@forms.medlemskapForm.hvaBetyrDette')}>
                                <MedlemskapFormText id="@forms.medlemskapForm.annetLandNeste12.hjelp" />
                            </ExpandableInfo>
                        }
                    />

                    {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                        <FormLayout.Panel bleedTop={true}>
                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                name={MedlemskapFormFields.utenlandsoppholdNeste12Mnd}
                                minDate={neste12Måneder.from}
                                maxDate={neste12Måneder.to}
                                labels={{
                                    addLabel: text('@forms.medlemskapForm.utenlandsopphold.leggTilLabel'),
                                    listTitle: text('@forms.medlemskapForm.annetLandNeste12.listeTittel'),
                                    modalTitle: text('@forms.medlemskapForm.annetLandNeste12.listeTittel'),
                                }}
                                validate={validateUtenlandsoppholdNeste12Mnd}
                            />
                        </FormLayout.Panel>
                    )}
                </FormLayout.Questions>
            </VStack>
        </Form>
    );
};
export default MedlemskapForm;
