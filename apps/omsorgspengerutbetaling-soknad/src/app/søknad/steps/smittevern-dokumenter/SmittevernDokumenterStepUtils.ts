import { SmittevernDokumenterSøknadsdata } from '../../../types/søknadsdata/SmittevernDokumenterSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';

import { getUploadedAttachments } from '../../../utils/attachmentUtils';
import { SmittevernDokumenterFormFields, SmittevernDokumenterFormValues } from './SmittevernDokumenterForm';

export const getSmittevernDokumenterStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: SmittevernDokumenterFormValues
): SmittevernDokumenterFormValues => {
    if (formValues) {
        return formValues;
    }
    const {} = søknadsdata.vedlegg_smittevernhensyn || {};
    return {
        vedlegg: [...(søknadsdata.vedlegg_smittevernhensyn?.vedlegg || [])],
    };
};

export const getSmittevernDokumenterSøknadsdataFromFormValues = (
    values: SmittevernDokumenterFormValues
): SmittevernDokumenterSøknadsdata => {
    return {
        vedlegg: getUploadedAttachments(values[SmittevernDokumenterFormFields.vedlegg] || []),
    };
};
