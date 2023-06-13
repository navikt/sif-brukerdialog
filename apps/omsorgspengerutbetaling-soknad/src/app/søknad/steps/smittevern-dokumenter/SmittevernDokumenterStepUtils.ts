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
    const {} = søknadsdata.legeerklæring || {};
    return {
        vedlegg: [...(søknadsdata.legeerklæring?.vedlegg || [])],
    };
};

export const getSmittevernDokumenterSøknadsdataFromFormValues = (
    values: SmittevernDokumenterFormValues
): SmittevernDokumenterSøknadsdata => {
    return {
        vedlegg: getUploadedAttachments(values[SmittevernDokumenterFormFields.vedlegg] || []),
    };
};
