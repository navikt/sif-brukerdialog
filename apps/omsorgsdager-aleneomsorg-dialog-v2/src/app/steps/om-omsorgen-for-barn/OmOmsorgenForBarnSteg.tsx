import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import type { OmOmsorgenForBarnSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { Heading } from '@navikt/ds-react';
import { YesOrNo } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import type { AnnetBarn } from '@sif/soknad-forms';
import { FormLayout, RegistrerteBarnListe, SifInfoCard } from '@sif/soknad-ui/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
    fjernValgForUkjenteBarn,
    toOmOmsorgenForBarnFormValues,
    toOmOmsorgenForBarnSøknadsdata,
} from './omOmsorgenForBarnStegUtils';
import { AndreBarnSpørsmål } from './spørsmål/AndreBarnSpørsmål';
import { HarAleneomsorgForSpørsmål } from './spørsmål/HarAleneomsorgForSpørsmål';
import { HarAvtaleOmDeltBostedSpørsmål } from './spørsmål/HarAvtaleOmDeltBostedSpørsmål';
import type { OmOmsorgenForBarnFormValues } from './types';

const stepId = SøknadStepId.OM_OMSORGEN_FOR_BARN;

export const OmOmsorgenForBarnSteg = () => {
    const { søker, registrerteBarn } = useAppContext();
    const { text } = useAppIntl();

    const { lagretData, draftFormValues, commit } = useStepData<
        OmOmsorgenForBarnSøknadsdata,
        OmOmsorgenForBarnFormValues
    >(stepId);
    const methods = useForm<OmOmsorgenForBarnFormValues>({
        defaultValues: draftFormValues ?? toOmOmsorgenForBarnFormValues(lagretData),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { clearErrors, getValues, setValue, watch } = methods;
    const { annetBarn = [], avtaleOmDeltBosted, harAleneomsorgFor = [] } = watch();
    const alleBarn = [...registrerteBarn, ...annetBarn];
    const harBarn = alleBarn.length > 0;
    const harIkkeAleneomsorgForNoenBarn = harAleneomsorgFor.length === 0;
    const harAleneomsorgForNøyaktigEttBarn = harAleneomsorgFor.length === 1;
    const harAvtaleOmDeltBosted = avtaleOmDeltBosted === YesOrNo.YES;
    const harSvartPåOmManHarAvtaleOmDeltBosted = avtaleOmDeltBosted !== YesOrNo.UNANSWERED;

    useEffect(() => {
        if (!harBarn) {
            clearErrors(['harAleneomsorgFor', 'avtaleOmDeltBosted']);
        }
    }, [clearErrors, harBarn]);

    const onAnnetBarnChange = (nyeAnnetBarn: AnnetBarn[]) => {
        setValue('annetBarn', nyeAnnetBarn);
        setValue(
            'harAleneomsorgFor',
            fjernValgForUkjenteBarn(getValues('harAleneomsorgFor') ?? [], [...registrerteBarn, ...nyeAnnetBarn]),
        );
    };

    const onSubmit = async (values: OmOmsorgenForBarnFormValues) => {
        const søknadsdata = toOmOmsorgenForBarnSøknadsdata(values);
        if (!søknadsdata) {
            throw new Error('OmOmsorgenForBarnSteg: mangler nødvendig data etter validering');
        }
        await commit(søknadsdata);
    };

    const advarselKey =
        harIkkeAleneomsorgForNoenBarn && harSvartPåOmManHarAvtaleOmDeltBosted
            ? 'steg.omOmsorgenForBarna.deltBosted.velgMinstEttBarnMedDeltBostedAdvarsel'
            : harAvtaleOmDeltBosted
              ? 'steg.omOmsorgenForBarn.alleBarnMedDeltBosted'
              : undefined;

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                submitDisabled={harIkkeAleneomsorgForNoenBarn || harAvtaleOmDeltBosted}>
                <FormLayout.Content>
                    <FormLayout.Questions>
                        {registrerteBarn.length > 0 ? (
                            <RegistrerteBarnListe
                                listetittel={text('steg.omOmsorgenForBarn.dineBarn.seksjonsTittel')}
                                registrerteBarn={registrerteBarn}
                            />
                        ) : (
                            <Heading level="2" size="medium">
                                {text('steg.omOmsorgenForBarn.dineBarn.seksjonsTittel')}
                            </Heading>
                        )}
                        <div>
                            <Heading level="3" size="xsmall" spacing={true}>
                                {text(
                                    annetBarn.length === 0
                                        ? 'steg.omOmsorgenForBarn.info.spm.andreBarn'
                                        : 'steg.omOmsorgenForBarn.info.spm.flereBarn',
                                )}
                            </Heading>
                            {text('steg.omOmsorgenForBarn.info.spm.text')}
                        </div>
                        {annetBarn.length > 0 && (
                            <Heading level="3" size="xsmall" spacing={true}>
                                {text('steg.omOmsorgenForBarn.annetBarnListAndDialog.listTitle')}
                            </Heading>
                        )}
                        <AndreBarnSpørsmål
                            annetBarn={annetBarn}
                            søkerFødselsnummer={søker.fødselsnummer}
                            onChange={onAnnetBarnChange}
                        />
                    </FormLayout.Questions>

                    {harBarn && (
                        <>
                            <FormLayout.Section title={text('steg.omOmsorgenForBarn.aleneomsorg.seksjonsTittel')}>
                                <HarAleneomsorgForSpørsmål barn={alleBarn} />
                            </FormLayout.Section>

                            <FormLayout.Section title={text('steg.omOmsorgenForBarn.deltBosted.seksjonsTittel')}>
                                <FormLayout.Questions>
                                    <HarAvtaleOmDeltBostedSpørsmål
                                        harNøyaktigEttBarn={harAleneomsorgForNøyaktigEttBarn}
                                    />
                                    {advarselKey && (
                                        <FormLayout.QuestionRelatedMessage>
                                            <SifInfoCard variant="warning">{text(advarselKey)}</SifInfoCard>
                                        </FormLayout.QuestionRelatedMessage>
                                    )}
                                </FormLayout.Questions>
                            </FormLayout.Section>
                        </>
                    )}

                    {!harBarn && (
                        <SifInfoCard variant="warning">{text('steg.omOmsorgenForBarn.ingenbarn')}</SifInfoCard>
                    )}
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
