import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { BarnSøknadsdata } from '@app/types/Soknadsdata';
import { useAppContext } from '@app/context/AppContext';
import { BodyLong, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { AriaLiveRegion, ExternalLink, FormLayout, RegistrerteBarnListe, SifInfoCard } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

import getLenker from '../../lenker';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';
import { BarnFormFields, BarnFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BarnFormValues>();

const stepId = SøknadStepId.BARN;

export const BarnForm = () => {
    const { validateField } = useSifValidate('barnForm');
    const { text } = useAppIntl();
    const { barn: registrerteBarn } = useAppContext();

    const { lagretData, commit, draftFormValues } = useStepData<BarnSøknadsdata, BarnFormValues>(stepId);
    const methods = useForm<BarnFormValues>({ defaultValues: draftFormValues ?? toBarnFormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: BarnFormValues) => commit(toBarnSøknadsdata(data));

    const infoStemmer = methods.watch(BarnFormFields.informasjonStemmer);

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
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
                                registrerteBarn.length === 0
                                    ? 'barnSteg.spørsmål.ingenBarn'
                                    : 'barnSteg.spørsmål.harBarn',
                                {
                                    antallBarn: registrerteBarn.length,
                                },
                            )}
                            validate={validateField(BarnFormFields.informasjonStemmer, getYesOrNoValidator())}
                        />
                        <AriaLiveRegion visible={infoStemmer === YesOrNo.NO}>
                            <FormLayout.QuestionRelatedMessage>
                                <SifInfoCard>
                                    <Heading level="3" size="small" spacing>
                                        <AppText id="barnSteg.opplysninger.info.tittel" />
                                    </Heading>
                                    <BodyLong>
                                        <AppText
                                            id="barnSteg.opplysninger.info.text"
                                            values={{
                                                Lenke: (children) => (
                                                    <ExternalLink href={getLenker().skatteetatenForside}>
                                                        {children}
                                                    </ExternalLink>
                                                ),
                                            }}
                                        />
                                    </BodyLong>
                                </SifInfoCard>
                            </FormLayout.QuestionRelatedMessage>
                        </AriaLiveRegion>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
