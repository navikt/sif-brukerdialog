import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { KontonummerSøknadsdata } from '@app/types/Soknadsdata';
import { useAppContext } from '@app/context/AppContext';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { HarKontonummerEnum } from '@sif/api/ung-deltaker';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { AriaLiveRegion, ExternalLink, SifInfoCard } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

import getLenker from '../../lenker';
import { toKontonummerFormValues, toKontonummerSøknadsdata } from './kontonummerStegUtils';
import { KontonummerFormFields, KontonummerFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<KontonummerFormValues>();

const stepId = SøknadStepId.KONTONUMMER;

export const KontonummerForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('kontonummerForm');
    const { kontoInfo: kontonummerInfo } = useAppContext();

    const { lagretData, commit, draftFormValues } = useStepData<KontonummerSøknadsdata, KontonummerFormValues>(stepId);
    const methods = useForm<KontonummerFormValues>({
        defaultValues: draftFormValues ?? toKontonummerFormValues(lagretData),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: KontonummerFormValues) => commit(toKontonummerSøknadsdata(data));

    const kontonummerErRiktig = methods.watch(KontonummerFormFields.kontonummerErRiktig);

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <FormLayout.Questions>
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.JA && (
                        <>
                            <YesOrNoQuestion
                                name={KontonummerFormFields.kontonummerErRiktig}
                                legend={text('kontonummerSteg.spørsmål.kontonummerErRiktig', {
                                    kontonummer: kontonummerInfo.formatertKontonummer,
                                })}
                                validate={validateField(
                                    KontonummerFormFields.kontonummerErRiktig,
                                    getYesOrNoValidator(),
                                )}
                            />
                            <AriaLiveRegion visible={kontonummerErRiktig === YesOrNo.NO}>
                                <FormLayout.QuestionRelatedMessage>
                                    <SifInfoCard>
                                        <BodyShort spacing>
                                            <AppText
                                                id="kontonummerSteg.kontonummer.stemmerIkke.info"
                                                values={{
                                                    Lenke: (children) => (
                                                        <ExternalLink href={getLenker().navPersonopplysninger}>
                                                            {children}
                                                        </ExternalLink>
                                                    ),
                                                }}
                                            />
                                        </BodyShort>
                                        <BodyShort>
                                            <AppText id="kontonummerSteg.kontonummer.stemmerIkke.info.2" />
                                        </BodyShort>
                                    </SifInfoCard>
                                </FormLayout.QuestionRelatedMessage>
                            </AriaLiveRegion>
                        </>
                    )}
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.NEI && (
                        <SifInfoCard variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.harIkkeKontonummer.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().navEndreKontonummer}>
                                                {children}
                                            </ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.3" />
                            </BodyLong>
                        </SifInfoCard>
                    )}
                    {kontonummerInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                        <SifInfoCard variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.kontonummerInfoMangler.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().navEndreKontonummer}>
                                                {children}
                                            </ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.3" />
                            </BodyLong>
                        </SifInfoCard>
                    )}
                </FormLayout.Questions>
            </SøknadStepForm>
        </SøknadStep>
    );
};
