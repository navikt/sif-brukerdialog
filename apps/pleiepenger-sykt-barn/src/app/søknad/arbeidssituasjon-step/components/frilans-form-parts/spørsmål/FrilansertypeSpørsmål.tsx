import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField, Frilanstype } from '../../../../../types/FrilansFormData';
import { ArbFriFormComponents } from '../FrilanserFormPart';

const FrilansertypeSpørsmål = () => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.CheckboxGroup
            legend={intlHelper(intl, 'frilanser.type.tittel')}
            name={FrilansFormField.frilanstyper}
            data-testid="frilans-typer"
            validate={getCheckedValidator()}
            checkboxes={[
                {
                    label: intlHelper(intl, 'frilanser.type.FRILANSARBEID'),
                    value: Frilanstype.FRILANSARBEID,
                    'data-testid': 'frilans-typer_frilansarbeid',
                },

                {
                    label: intlHelper(intl, 'frilanser.type.HONORARARBEID'),
                    value: Frilanstype.HONORARARBEID,
                    'data-testid': 'frilans-typer_honorararbeid',
                },
            ]}
        />
    );
};

export default FrilansertypeSpørsmål;
