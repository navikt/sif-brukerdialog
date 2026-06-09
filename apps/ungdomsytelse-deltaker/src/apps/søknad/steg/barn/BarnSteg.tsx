import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { AriaLiveRegion, ExternalLink, FormLayout } from '@sif/soknad-ui/components';

import { SøknadStepId } from '../../setup/config/SøknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '../../setup/hooks';
import { useSøknadState } from '../../setup/hooks/useSøknadState';
import { AppForm } from '../../setup/soknad/AppForm';
import { SøknadStep } from '../../setup/soknad/SøknadStep';
import BarnInfo from './BarnInfo';
import { BarnFormFields, BarnFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BarnFormValues>();

const stepId = SøknadStepId.BARN;

const BarnSteg = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('barnSteg');
    const { barn } = useSøknadState();

    const defaultValues = useStepDefaultValues<BarnFormValues, { barnStemmer: YesOrNo }>({
        stepId,
        toFormValues: (s) => ({ barnStemmer: s?.barnStemmer }),
    });
    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, { barnStemmer: YesOrNo }>({
        stepId,
        toSøknadsdata: (values) => ({ barnStemmer: values.barnStemmer! }),
    });
    const methods = useSøknadRhfForm(stepId, defaultValues);
    const barnStemmer = methods.watch(BarnFormFields.barnStemmer);

    return (
        <SøknadStep stepId={stepId}>
            <FormLayout.Guide>
                <AppText id="barnSteg.beskrivelse" />
            </FormLayout.Guide>
            <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
                <FormLayout.Questions>
                    <VStack gap="space-16">
                        <Heading level="2" size="xsmall">
                            {text('barnSteg.registrerteBarn.tittel')}
                        </Heading>
                        <BarnInfo barn={barn} />
                    </VStack>
                    <YesOrNoQuestion
                        name={BarnFormFields.barnStemmer}
                        legend={text(barn.length === 0 ? 'barnSteg.spørsmål.ingenBarn' : 'barnSteg.spørsmål.harBarn', {
                            antallBarn: barn.length,
                        })}
                        labels={{
                            yes: text('barnSteg.barnStemmer.ja.label'),
                            no: text('barnSteg.barnStemmer.nei.label'),
                        }}
                        validate={validateField(BarnFormFields.barnStemmer, getYesOrNoValidator())}
                    />
                    <AriaLiveRegion visible={barnStemmer === YesOrNo.NO}>
                        <FormLayout.QuestionRelatedMessage>
                            <Alert variant="info">
                                <Heading level="3" size="small" spacing>
                                    <AppText id="barnSteg.opplysninger.info.tittel" />
                                </Heading>
                                <BodyLong>
                                    <AppText
                                        id="barnSteg.opplysninger.info.text"
                                        values={{
                                            Lenke: (children) => (
                                                <ExternalLink href={getLenker().skatteetaten}>{children}</ExternalLink>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </Alert>
                        </FormLayout.QuestionRelatedMessage>
                    </AriaLiveRegion>
                </FormLayout.Questions>
            </AppForm>
        </SøknadStep>
    );
};

export default BarnSteg;
