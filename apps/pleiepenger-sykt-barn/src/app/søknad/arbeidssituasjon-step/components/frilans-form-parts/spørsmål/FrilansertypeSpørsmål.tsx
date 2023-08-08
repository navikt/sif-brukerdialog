import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField, Frilanstype } from '../../../../../types/FrilansFormData';
import { ArbFriFormComponents } from '../FrilanserFormPart';

const FrilansertypeSpørsmål = () => {
    return (
        <ArbFriFormComponents.RadioGroup
            legend={'Hva er din situasjon?'}
            name={FrilansFormField.frilanstype}
            validate={getCheckedValidator()}
            radios={[
                {
                    label: 'Jeg jobber som frilanser',
                    value: Frilanstype.FRILANS,
                },

                {
                    label: 'Jeg jobber som frilanser og mottar honorar for verv',
                    value: Frilanstype.FRILANS_HONORAR,
                },
                {
                    label: 'Jeg mottar honorar for verv',
                    value: Frilanstype.HONORAR,
                },
            ]}
        />
    );
};

export default FrilansertypeSpørsmål;
