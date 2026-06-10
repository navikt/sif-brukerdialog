import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
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
import { HarKontonummerEnum } from '../oppsummering/oppsummeringUtils';
import { toKontonummerFormValues, toKontonummerSøknadsdata } from './kontonummerStegUtils';
import { KontonummerFormFields, KontonummerFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<KontonummerFormValues>();

const stepId = SøknadStepId.KONTONUMMER;

const KontonummerSteg = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('kontonummerSteg');
    const { kontoInfo } = useSøknadState();

    const defaultValues = useStepDefaultValues({
        stepId,
        toFormValues: toKontonummerFormValues,
    });
    const { onSubmit, isPending } = useStepSubmit({
        stepId,
        toSøknadsdata: toKontonummerSøknadsdata,
    });
    const methods = useSøknadRhfForm(stepId, defaultValues);
    const kontonummerErRiktig = methods.watch(KontonummerFormFields.kontonummerErRiktig);

    return (
        <SøknadStep stepId={stepId}>
            <FormLayout.Guide>
                <AppText id="kontonummerSteg.beskrivelse" />
            </FormLayout.Guide>
            <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
                <FormLayout.Questions>
                    {kontoInfo.harKontonummer === HarKontonummerEnum.JA && (
                        <>
                            <YesOrNoQuestion
                                name={KontonummerFormFields.kontonummerErRiktig}
                                legend={text('kontonummerSteg.kontonummer.spm', {
                                    kontonummer: kontoInfo.formatertKontonummer,
                                })}
                                labels={{
                                    yes: text('kontonummerSteg.kontonummer.ja.label'),
                                    no: text('kontonummerSteg.kontonummer.nei.label'),
                                }}
                                validate={validateField(
                                    KontonummerFormFields.kontonummerErRiktig,
                                    getYesOrNoValidator(),
                                )}
                            />
                            <AriaLiveRegion visible={kontonummerErRiktig === YesOrNo.NO}>
                                <FormLayout.QuestionRelatedMessage>
                                    <Alert variant="info">
                                        <BodyShort spacing>
                                            <AppText
                                                id="kontonummerSteg.kontonummer.stemmerIkke.info"
                                                values={{
                                                    Lenke: (children) => (
                                                        <ExternalLink href={getLenker().personopplysninger}>
                                                            {children}
                                                        </ExternalLink>
                                                    ),
                                                }}
                                            />
                                        </BodyShort>
                                        <BodyShort>
                                            <AppText id="kontonummerSteg.kontonummer.stemmerIkke.info.2" />
                                        </BodyShort>
                                    </Alert>
                                </FormLayout.QuestionRelatedMessage>
                            </AriaLiveRegion>
                        </>
                    )}
                    {kontoInfo.harKontonummer === HarKontonummerEnum.NEI && (
                        <Alert variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.harIkkeKontonummer.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().endreKontonummer}>{children}</ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.harIkkeKontonummer.info.3" />
                            </BodyLong>
                        </Alert>
                    )}
                    {kontoInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                        <Alert variant="warning">
                            <Heading level="3" size="small" spacing>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.1" />
                            </Heading>
                            <BodyLong spacing>
                                <AppText
                                    id="kontonummerSteg.kontonummerInfoMangler.info.2"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getLenker().endreKontonummer}>{children}</ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="kontonummerSteg.kontonummerInfoMangler.info.3" />
                            </BodyLong>
                        </Alert>
                    )}
                </FormLayout.Questions>
            </AppForm>
        </SøknadStep>
    );
};

export default KontonummerSteg;
