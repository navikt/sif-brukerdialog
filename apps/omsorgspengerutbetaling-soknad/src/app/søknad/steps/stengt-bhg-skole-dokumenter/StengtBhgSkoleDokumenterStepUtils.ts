import { StengtBhgSkoleDokumenterSøknadsdata } from '../../../types/søknadsdata/StengtBhgSkoleDokumenterSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getUploadedAttachments } from '../../../utils/attachmentUtils';
import { StengtBhgSkoleDokumenterFormFields, StengtBhgSkoleDokumenterFormValues } from './StengtBhgSkoleDokumenterForm';

export const getStengtBhgSkoleDokumenterStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: StengtBhgSkoleDokumenterFormValues
): StengtBhgSkoleDokumenterFormValues => {
    if (formValues) {
        return formValues;
    }
    const {} = søknadsdata.vedlegg_stengtSkoleBhg || {};
    return {
        vedlegg: [...(søknadsdata.vedlegg_stengtSkoleBhg?.vedlegg || [])],
    };
};

export const getStengtBhgSkoleDokumenterSøknadsdataFromFormValues = (
    values: StengtBhgSkoleDokumenterFormValues
): StengtBhgSkoleDokumenterSøknadsdata => {
    return {
        vedlegg: getUploadedAttachments(values[StengtBhgSkoleDokumenterFormFields.vedlegg] || []),
    };
};
