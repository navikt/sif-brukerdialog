import { useAppContext } from '@app/context/AppContext';
import { AppText } from '@app/i18n';
import type { Søknadsdata, TidspunktForAleneomsorgSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { VStack } from '@navikt/ds-react';
import {
    SøknadStep,
    SøknadStepForm,
    useSaveSøknadFormValues,
    useSøknadsdata,
    useStepData,
} from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui/components';
import { formatName } from '@sif/utils';
import { useForm } from 'react-hook-form';

import {
    toTidspunktForAleneomsorgFormValues,
    toTidspunktForAleneomsorgSøknadsdata,
} from './tidspunktForAleneomsorgStegUtils';
import { TidspunktForBarn } from './TidspunktForBarn';
import type { BarnMedAleneomsorg, TidspunktForAleneomsorgFormValues } from './types';

const stepId = SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG;

export const TidspunktForAleneomsorgSteg = () => {
    const { registrerteBarn } = useAppContext();
    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const { lagretData, draftFormValues, commit } = useStepData<
        TidspunktForAleneomsorgSøknadsdata,
        TidspunktForAleneomsorgFormValues
    >(stepId);
    const omOmsorgenForBarn = søknadsdata[SøknadStepId.OM_OMSORGEN_FOR_BARN];
    const valgteBarn = omOmsorgenForBarn?.harAleneomsorgFor ?? [];
    const barnMedAleneomsorg: BarnMedAleneomsorg[] = [
        ...registrerteBarn
            .filter((barn) => valgteBarn.includes(barn.aktørId))
            .map((barn) => ({ id: barn.aktørId, navn: formatName(barn) })),
        ...(omOmsorgenForBarn?.annetBarn ?? [])
            .filter((barn) => valgteBarn.includes(barn.fnr))
            .map((barn) => ({ id: barn.fnr, navn: barn.navn })),
    ];
    const methods = useForm<TidspunktForAleneomsorgFormValues>({
        defaultValues: toTidspunktForAleneomsorgFormValues(lagretData, barnMedAleneomsorg, draftFormValues),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = async (values: TidspunktForAleneomsorgFormValues) => {
        const data = toTidspunktForAleneomsorgSøknadsdata(values, barnMedAleneomsorg);
        if (!data) {
            throw new Error('TidspunktForAleneomsorgSteg: mangler nødvendig data etter validering');
        }
        await commit(data);
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit}>
                <FormLayout.Content>
                    <FormLayout.Guide>
                        <AppText id="step.tidspunktForAleneomsorg.stepIntro" />
                    </FormLayout.Guide>
                    <VStack gap="space-32">
                        {barnMedAleneomsorg.map((barn) => (
                            <TidspunktForBarn key={barn.id} barn={barn} />
                        ))}
                    </VStack>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
