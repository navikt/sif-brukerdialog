import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { BostedUtlandFormFields, BostedUtlandFormValues } from '../types';
import { AppText, useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

interface Props {}

export const HarBoddINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
    return (
        <YesOrNoQuestion
            name={BostedUtlandFormFields.harBoddINorge}
            legend={text('bostedUtlandSteg.spørsmål.harBoddINorge')}
            validate={validateField(BostedUtlandFormFields.harBoddINorge, getYesOrNoValidator())}
            description={
                <ReadMore header={text('bostedUtlandSteg.spørsmål.harBoddINorge.readMore.tittel')}>
                    <AppText id="bostedUtlandSteg.spørsmål.harBoddINorge.readMore.tekst" />
                </ReadMore>
            }
        />
    );
};
