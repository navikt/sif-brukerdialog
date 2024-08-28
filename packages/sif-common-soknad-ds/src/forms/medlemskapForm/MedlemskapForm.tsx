import { Box, Link, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { getDateToday } from '@navikt/sif-common-utils';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import { SoknadText } from '../../i18n/soknad.messages';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import { getMedlemskapDateRanges } from './medlemskapUtils';

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

const { Form, YesOrNoQuestion } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues, ValidationError>();

interface Props {
    values?: Partial<MedlemskapFormValues> | undefined;
    isSubmitting: boolean;
    medlemskapInfoUrl: string;
    goBack?: () => void;
}

const MedlemskapForm = ({ values = {}, isSubmitting, goBack, medlemskapInfoUrl }: Props) => {
    const intl = useIntl();
    const { text } = useSoknadIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemskapDateRanges(getDateToday());

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'medlemskapForm.validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <VStack gap="10">
                <SifGuidePanel>
                    <SoknadText
                        id="medlemskapForm.info"
                        values={{
                            Lenke: (children: React.ReactNode) => (
                                <Link href={medlemskapInfoUrl} target="_blank">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </SifGuidePanel>

                <VStack gap="3">
                    <YesOrNoQuestion
                        legend={text('medlemskapForm.annetLandSiste12.spm')}
                        name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                        validate={getYesOrNoValidator()}
                        description={
                            <ExpandableInfo title={text('medlemskapForm.hvaBetyrDette')}>
                                <SoknadText id="medlemskapForm.annetLandSiste12.hjelp" />
                            </ExpandableInfo>
                        }
                        data-testid="medlemskap-annetLandSiste12"
                    />

                    {values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                        <Box padding="4" background="bg-subtle" borderRadius="medium">
                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                                minDate={siste12Måneder.from}
                                maxDate={siste12Måneder.to}
                                labels={{
                                    addLabel: text('medlemskapForm.utenlandsopphold.leggTilLabel'),
                                    listTitle: text('medlemskapForm.annetLandSiste12.listeTittel'),
                                    modalTitle: text('medlemskapForm.annetLandSiste12.listeTittel'),
                                }}
                                validate={validateUtenlandsoppholdSiste12Mnd}
                            />
                        </Box>
                    )}
                </VStack>

                <VStack gap="3">
                    <YesOrNoQuestion
                        legend={text('medlemskapForm.annetLandNeste12.spm')}
                        name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                        validate={getYesOrNoValidator()}
                        description={
                            <ExpandableInfo title={text('medlemskapForm.hvaBetyrDette')}>
                                <SoknadText id="medlemskapForm.annetLandNeste12.hjelp" />
                            </ExpandableInfo>
                        }
                        data-testid="medlemskap-annetLandNeste12"
                    />

                    {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                        <Box padding="4" background="bg-subtle" borderRadius="medium">
                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                name={MedlemskapFormFields.utenlandsoppholdNeste12Mnd}
                                minDate={neste12Måneder.from}
                                maxDate={neste12Måneder.to}
                                labels={{
                                    addLabel: text('medlemskapForm.utenlandsopphold.leggTilLabel'),
                                    listTitle: text('medlemskapForm.annetLandNeste12.listeTittel'),
                                    modalTitle: text('medlemskapForm.annetLandNeste12.listeTittel'),
                                }}
                                validate={validateUtenlandsoppholdNeste12Mnd}
                            />
                        </Box>
                    )}
                </VStack>
            </VStack>
        </Form>
    );
};
export default MedlemskapForm;
