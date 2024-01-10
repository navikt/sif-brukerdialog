import { useIntl } from 'react-intl';
import {
    FormikModalFormAndInfo,
    ModalFormAndInfoLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { mapVirksomhetToVirksomhetApiData } from './mapVirksomhetToApiData';
import { Virksomhet } from './types';
import VirksomhetForm from './VirksomhetForm';
import VirksomhetSummary from './VirksomhetSummary';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    labels: ModalFormAndInfoLabels;
    skipOrgNumValidation?: boolean;
    harFlereVirksomheter?: boolean;
    onAfterChange?: (virksomhet: Virksomhet) => void;
}

function VirksomhetInfoAndDialog<FieldNames>({
    name,
    labels,
    skipOrgNumValidation,
    harFlereVirksomheter,
    validate,
    onAfterChange,
}: Props<FieldNames>) {
    const intl = useIntl();
    return (
        <FormikModalFormAndInfo<FieldNames, Virksomhet, ValidationError>
            name={name}
            validate={validate}
            labels={labels}
            dialogWidth="narrow"
            renderEditButtons={true}
            formRenderer={({ onSubmit, onCancel, data }) => (
                <VirksomhetForm
                    virksomhet={data}
                    harFlereVirksomheter={harFlereVirksomheter}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    skipOrgNumValidation={skipOrgNumValidation}
                />
            )}
            infoRenderer={({ data }) => (
                <VirksomhetSummary
                    virksomhet={mapVirksomhetToVirksomhetApiData(intl.locale, data, harFlereVirksomheter)}
                    harFlereVirksomheter={harFlereVirksomheter}
                />
            )}
            onAfterChange={onAfterChange}
        />
    );
}

export default VirksomhetInfoAndDialog;
