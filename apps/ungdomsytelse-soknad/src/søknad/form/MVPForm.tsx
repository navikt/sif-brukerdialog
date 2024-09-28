import { FormikConfirmationCheckbox, TypedFormikForm } from '@navikt/sif-common-formik-ds';
import FormikDateRangePicker from '@navikt/sif-common-formik-ds/src/components/formik-date-range-picker/FormikDateRangePicker';
import { getDateRangeValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';
import ShadowBox from '@navikt/sif-common/src/api/dev-info-components/ShadowBox';

export interface FormValues {
    fom: string;
    tom: string;
    harBekreftetOpplysninger: boolean;
}

interface Props {
    pending?: boolean;
    values: Partial<FormValues>;
}

const MVPForm = ({ pending }: Props) => {
    return (
        <TypedFormikForm submitButtonLabel="Send inn" isFinalSubmit={true} submitPending={pending}>
            <ShadowBox>
                <FormLayout.Questions>
                    <FormLayout.SectionHeading>MVP skjema</FormLayout.SectionHeading>
                    <FormikDateRangePicker
                        legend="Hvilken perioden ønsker du å søke om"
                        fromInputProps={{
                            label: 'Fra og med',
                            name: 'fom',
                            validate: (value) => getDateRangeValidator({ required: true }).validateFromDate(value),
                        }}
                        toInputProps={{
                            label: 'Til og med',
                            name: 'tom',
                            validate: (value) => getDateRangeValidator({ required: true }).validateToDate(value),
                        }}
                    />
                    <FormikConfirmationCheckbox
                        name="harBekreftetOpplysninger"
                        label="Jeg bekrefter opplysninger"
                        validate={getRequiredFieldValidator()}>
                        Du må bekrefte opplysninger for å få sendt inn søknad
                    </FormikConfirmationCheckbox>
                </FormLayout.Questions>
            </ShadowBox>
        </TypedFormikForm>
    );
};

export default MVPForm;
