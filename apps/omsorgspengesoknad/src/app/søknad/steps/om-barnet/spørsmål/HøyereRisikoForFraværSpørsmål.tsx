import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

const { YesOrNoQuestion } = omBarnetFormComponents;

const HøyereRisikoForFraværSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <YesOrNoQuestion
            name={OmBarnetFormFields.høyereRisikoForFravær}
            legend={text('steg.omBarnet.spm.høyereRisikoForFravær.label')}
            validate={getYesOrNoValidator()}
        />
    );
};

export default HøyereRisikoForFraværSpørsmål;
