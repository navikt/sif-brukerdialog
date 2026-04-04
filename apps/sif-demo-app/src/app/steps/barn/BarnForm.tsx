import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { useSøknadRhfForm, useSøknadState, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useSifValidate } from '@sif/rhf';
import { VelgRegistrertBarnPanel } from '@sif/soknad-forms';

import { BarnSøknadsdata } from '../../types/Soknadsdata';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';
import { BarnFormFields, BarnFormValues } from './types';

const stepId = SøknadStepId.BARN;

export const BarnForm = () => {
    const { validateField } = useSifValidate('barnForm');
    const { text } = useAppIntl();
    const { barn: registrerteBarn } = useSøknadState();

    const defaultValues = useStepDefaultValues<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toFormValues: toBarnFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toSøknadsdata: (values) => {
            const søknadsdata = toBarnSøknadsdata(values);
            if (!søknadsdata || !registrerteBarn.some((barn) => barn.aktørId === søknadsdata.barnetSøknadenGjelder)) {
                throw new Error('Barn: mangler valgt registrert barn etter validering');
            }
            return søknadsdata;
        },
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <VelgRegistrertBarnPanel<BarnFormValues>
                name={BarnFormFields.barnetSøknadenGjelder}
                registrerteBarn={registrerteBarn}
                label={text('barnSteg.spørsmål.barnetSøknadenGjelder')}
                validate={validateField(BarnFormFields.barnetSøknadenGjelder, getRequiredFieldValidator())}
            />
        </AppForm>
    );
};
