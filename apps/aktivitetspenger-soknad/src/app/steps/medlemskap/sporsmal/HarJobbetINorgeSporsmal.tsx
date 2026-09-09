import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {}

export const HarJobbetINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetINorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorge')}
            description={
                <ReadMore header={text('medlemskapSteg.readMore.ytelserINorge.tittel')}>
                    {text('medlemskapSteg.readMore.ytelserINorge.tekst')}
                </ReadMore>
            }
            validate={validateField(MedlemskapFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
