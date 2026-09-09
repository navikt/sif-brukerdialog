import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { BostedUtlandFormFields, BostedUtlandFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

interface Props {
    harJobbetINorge?: boolean;
}

export const HarJobbetUtenforNorgeSporsmal = ({ harJobbetINorge }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
    return harJobbetINorge ? (
        <YesOrNoQuestion
            name={BostedUtlandFormFields.harJobbetUtenforNorge}
            legend={text('bostedUtlandSteg.spørsmål.harJobbetINorgeOgUtenforNorge')}
            description={text('bostedUtlandSteg.spørsmål.harJobbetUtenforNorge.info')}
            validate={validateField(BostedUtlandFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    ) : (
        <YesOrNoQuestion
            name={BostedUtlandFormFields.harJobbetUtenforNorge}
            legend={text('bostedUtlandSteg.spørsmål.harJobbetUtenforNorge')}
            description={text('bostedUtlandSteg.spørsmål.harJobbetUtenforNorge.info')}
            validate={validateField(BostedUtlandFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
