import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { BarnSøknadsdata } from '@app/types/Soknadsdata';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { AriaLiveRegion, ExternalLink, FormLayout, RegistrerteBarnListe } from '@sif/soknad-ui/components';

import getLenker from '../../lenker';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';
import { BarnFormFields, BarnFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BarnFormValues>();

const stepId = SøknadStepId.BARN;

interface Props {
    registrerteBarn: RegistrertBarn[];
}

export const BarnForm = ({ registrerteBarn }: Props) => {
    const { validateField } = useSifValidate('barnForm');
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
                <FormLayout.Questions>
                    {registrerteBarn.length > 0 && (
                        <RegistrerteBarnListe
                            headingProps={{ size: 'small' }}
                            listetittel={text('barnSteg.registrerteBarn.tittel')}
                            registrerteBarn={registrerteBarn}
                        />
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
