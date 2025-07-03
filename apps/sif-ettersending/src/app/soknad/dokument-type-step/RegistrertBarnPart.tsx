import { RegistrertBarn } from '@navikt/sif-common-api';
import { AnnetBarnValue, VelgBarnInput } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';

interface Props {
    registrertBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ registrertBarn }: Props) => {
    const { text } = useAppIntl();

    const {
        values: { dokumentType },
    } = useFormikContext<SoknadFormData>();

    const validateRegistrertBarnAktørId = (value: string) => {
        return getRequiredFieldValidator()(value)
            ? {
                  key: `validation.registrertBarnAktørId.${dokumentType}.noValue`,
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

    if (registrertBarn.length === 0) {
        return null;
    }

    return (
        <>
            <VelgBarnInput
                name={SoknadFormField.registrertBarnAktørId}
                legend={text('step.dokumentType.registrertBarnPart.spm')}
                description={
                    <p>
                        <AppText id="step.dokumentType.registrertBarnPart.spm.description" />
                    </p>
                }
                registrerteBarn={registrertBarn}
                validate={validateRegistrertBarnAktørId}
                inkluderAnnetBarn={true}
                annetBarnOptions={{
                    value: AnnetBarnValue,
                    label: text('step.dokumentType.gjelderAnnetBarn'),
                }}
            />
        </>
    );
};

export default RegistrertBarnPart;
