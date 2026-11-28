import { useAppIntl } from '@app/i18n';
import type { RegistrertBarn } from '@sif/api/k9-brukerdialog-prosessering';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import type { AnnetBarn } from '@sif/soknad-forms';
import { getListValidator } from '@sif/validation';

import { getBarnOptions } from '../omOmsorgenForBarnStegUtils';
import type { OmOmsorgenForBarnFormValues } from '../types';

interface Props {
    barn: Array<RegistrertBarn | AnnetBarn>;
}

const { CheckboxGroup } = createSifFormComponents<OmOmsorgenForBarnFormValues>();

export const HarAleneomsorgForSpørsmål = ({ barn }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('omOmsorgenForBarnForm');
    const options = getBarnOptions(barn, (dato, navn) =>
        text('steg.omOmsorgenForBarn.form.fødtNavn', { dato, navn }),
    );

    return (
        <CheckboxGroup
            legend={text('steg.omOmsorgenForBarn.form.spm.hvilkeAvBarnaAleneomsorg')}
            name="harAleneomsorgFor"
            checkboxes={options}
            validate={validateField('harAleneomsorgFor', getListValidator({ required: true }))}
        />
    );
};
