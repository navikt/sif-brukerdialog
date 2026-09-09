import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {
    harJobbetINorge?: boolean;
}

export const HarJobbetUtenforNorgeSporsmal = ({ harJobbetINorge }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
    return harJobbetINorge ? (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge')}
            description={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge.info')}
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    ) : (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')}
            description={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge.info')}
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
