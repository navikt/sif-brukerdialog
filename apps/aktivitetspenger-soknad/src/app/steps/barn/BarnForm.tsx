import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { Alert, BodyLong, Button, Heading, VStack } from '@navikt/ds-react';
import { FormLayout, RegistrerteBarnListe, RegistrerteBarnListeHeading } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import * as Sentry from '@sentry/react';
import { RegistrertBarn } from '@sif/api';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import { AriaLiveRegion, ExternalLink } from '@sif/soknad-ui/components';

import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export enum BarnFormFields {
    informasjonStemmer = 'informasjonStemmer',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.informasjonStemmer]?: YesOrNo;
}

const { YesOrNoQuestion } = createSifFormComponents<BarnFormValues>();

const stepId = SøknadStepId.BARN;

interface Props {
    registrerteBarn: RegistrertBarn[];
}

export const BarnForm = ({ registrerteBarn }: Props) => {
    const { validateField } = useSifValidate();
    const { text } = useAppIntl();

    const defaultValues = useStepDefaultValues<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toFormValues: toBarnFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toSøknadsdata: toBarnSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const infoStemmer = methods.watch(BarnFormFields.informasjonStemmer);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    onClick={() => Sentry.captureException(new Error('Test Sentry error fra BarnForm'))}>
                    Test Sentry-feil
                </Button>
                <FormLayout.Questions>
                    {registrerteBarn.length > 0 && (
                        <VStack gap="space-8">
                            <RegistrerteBarnListeHeading size="small" level="2">
                                {text('barnSteg.registrerteBarn.tittel')}
                            </RegistrerteBarnListeHeading>
                            <RegistrerteBarnListe registrerteBarn={registrerteBarn} />
                        </VStack>
                    )}
                    <YesOrNoQuestion
                        name={BarnFormFields.informasjonStemmer}
                        legend={text(
                            registrerteBarn.length === 0 ? 'barnSteg.spørsmål.ingenBarn' : 'barnSteg.spørsmål.harBarn',
                            {
                                antallBarn: registrerteBarn.length,
                            },
                        )}
                        validate={validateField(BarnFormFields.informasjonStemmer, getYesOrNoValidator())}
                    />
                    <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
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
            </FormLayout.Content>
        </AppForm>
    );
};
