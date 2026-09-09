import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { BostedUtlandFormFields, BostedUtlandFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

interface Props {}

export const HarJobbetINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
    return (
        <YesOrNoQuestion
            name={BostedUtlandFormFields.harJobbetINorge}
            legend={text('bostedUtlandSteg.spørsmål.harJobbetINorge')}
            validate={validateField(BostedUtlandFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
