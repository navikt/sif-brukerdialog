import { RegistrertBarn } from '@navikt/sif-common-api';
import { VelgBarn_AnnetBarnValue, VelgBarnFormPart } from '@navikt/sif-common-forms-ds';
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
        <VelgBarnFormPart
            name={SoknadFormField.registrertBarnAktørId}
            legend={text('formPart.registrertBarn.spm')}
            headerLevel="2"
            description={
                <p>
                    <AppText id="formPart.registrertBarn.spm.description" />
                </p>
            }
            registrerteBarn={registrertBarn}
            validate={validateRegistrertBarnAktørId}
            inkluderAnnetBarn={true}
            annetBarnOptions={{
                value: VelgBarn_AnnetBarnValue,
                label: text('formPart.registrertBarn.gjelderAnnetBarn'),
            }}
        />
    );
};

export default RegistrertBarnPart;
