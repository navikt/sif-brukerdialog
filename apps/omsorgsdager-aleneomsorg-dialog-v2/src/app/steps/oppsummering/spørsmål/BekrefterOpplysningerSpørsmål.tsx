import { AppText } from '@app/i18n';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getCheckedValidator } from '@sif/validation';

export type OppsummeringFormValues = {
    bekrefterOpplysninger: boolean;
};

const { Checkbox } = createSifFormComponents<OppsummeringFormValues>();

export const BekrefterOpplysningerSpørsmål = ({ disabled }: { disabled?: boolean }) => {
    const { validateField } = useSifValidate('oppsummeringForm');

    return (
        <Checkbox
            name="bekrefterOpplysninger"
            disabled={disabled}
            validate={validateField('bekrefterOpplysninger', getCheckedValidator())}>
            <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
        </Checkbox>
    );
};
