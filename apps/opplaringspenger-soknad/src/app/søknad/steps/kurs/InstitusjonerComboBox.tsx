import { Institusjoner } from '../../../api/institusjonService';
import FormikCombobox from '@navikt/sif-common-formik-ds/src/components/formik-combobox/FormikCombobox';

interface Props {
    institusjoner: Institusjoner;
}

const InstitusjonerComboBox = ({ institusjoner }: Props) => {
    return (
        <FormikCombobox
            name={'insitusjoner'}
            allowNewValues={true}
            label="Hva er den aller kuleste Star Wars-filmen noensinne, helt objektivt?"
            options={institusjoner.map((institusjon) => ({ value: institusjon.navn, label: institusjon.navn }))}
            shouldAutocomplete
        />
    );
};

export default InstitusjonerComboBox;
