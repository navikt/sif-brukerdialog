import { getYesOrNoValidator } from '@navikt/sif-validation';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

const { YesOrNoQuestion } = omBarnetFormComponents;

const KroniskEllerFunksjonshemningSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <YesOrNoQuestion
            name={OmBarnetFormFields.kroniskEllerFunksjonshemming}
            legend={text('steg.omBarnet.spm.kroniskEllerFunksjonshemning.label')}
            validate={getYesOrNoValidator()}
        />
    );
};

export default KroniskEllerFunksjonshemningSpørsmål;
