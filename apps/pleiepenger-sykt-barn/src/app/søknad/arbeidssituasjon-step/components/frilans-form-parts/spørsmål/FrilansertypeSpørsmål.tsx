import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FrilansFormField, Frilanstype } from '../../../../../types/søknad-form-values/FrilansFormValues';
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
                    label: 'Jeg jobber både som frilanser og mottar honorar',
                    value: Frilanstype.FRILANS_HONORAR,
                },
                {
                    label: 'Jeg mottar honorar',
                    value: Frilanstype.HONORAR,
                },
            ]}
        />
    );
};

export default FrilansertypeSpørsmål;
