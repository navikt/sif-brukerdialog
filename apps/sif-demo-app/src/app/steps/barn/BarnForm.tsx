import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { BarnSøknadsdata } from '@app/types/Soknadsdata';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useSifValidate } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { VelgRegistrertBarnPanel } from '@sif/soknad-forms';
import { useForm } from 'react-hook-form';

import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';
import { BarnFormFields, BarnFormValues } from './types';

const stepId = SøknadStepId.BARN;

export const BarnForm = () => {
    const { validateField } = useSifValidate('barnForm');
    const { text } = useAppIntl();
    const { barn: registrerteBarn } = useAppContext();

    const { lagretData, commit, draftFormValues } = useStepData<BarnSøknadsdata, BarnFormValues>(stepId);
    const methods = useForm<BarnFormValues>({ defaultValues: draftFormValues ?? toBarnFormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: BarnFormValues) => {
        const søknadsdata = toBarnSøknadsdata(data);
        if (!søknadsdata || !registrerteBarn.some((barn) => barn.aktørId === søknadsdata.barnetSøknadenGjelder)) {
            throw new Error('Barn: mangler valgt registrert barn etter validering');
        }
        return commit(søknadsdata);
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <VelgRegistrertBarnPanel<BarnFormValues>
                    name={BarnFormFields.barnetSøknadenGjelder}
                    registrerteBarn={registrerteBarn}
                    label={text('barnSteg.spørsmål.barnetSøknadenGjelder')}
                    validate={validateField(BarnFormFields.barnetSøknadenGjelder, getRequiredFieldValidator())}
                />
            </SøknadStepForm>
        </SøknadStep>
    );
};
