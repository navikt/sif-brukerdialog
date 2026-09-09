import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {}

export const HarJobbetINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetINorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorge')}
            validate={validateField(MedlemskapFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
