import { FormattedMessage, useIntl } from 'react-intl';
import { DateDurationMap, DateRange, ensureDuration, getValidDurations, ISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { TidPerDagValidator } from '../../types';
import TidUkerInput from '../tid-uker-input/TidUkerInput';
import { InputTime, ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Button, Heading } from '@navikt/ds-react';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

type FormDatoTidMap = { [isoDate: ISODate]: Partial<InputTime> };

interface Props {
    tittel: JSX.Element;
    intro?: JSX.Element;
    periode: DateRange;
    tid: DateDurationMap;
    tidPerDagValidator: TidPerDagValidator;
    onSubmit: (tid: DateDurationMap) => void;
    onCancel?: () => void;
}

enum FormField {
    tid = 'tid',
}
interface FormValues {
    [FormField.tid]: FormDatoTidMap;
}

const Form = getTypedFormComponents<FormField, FormValues, ValidationError>();

const TidKalenderForm = ({ periode, tid, tittel, intro, tidPerDagValidator, onSubmit, onCancel }: Props) => {
    const intl = useIntl();

    if (dayjs(periode.from).isAfter(periode.to, 'day')) {
        return <div>Fra dato er før til-dato</div>;
    }

    const onFormikSubmit = ({ tid = {} }: Partial<FormValues>) => {
        const data: DateDurationMap = {};
        Object.keys(tid).forEach((key) => {
            data[key] = ensureDuration(tid[key]);
        });
        onSubmit(getValidDurations(data));
    };

    const mapDatoTidToFormDatoTid = (tid: DateDurationMap): FormDatoTidMap => {
        const data: FormDatoTidMap = {};
        Object.keys(tid).forEach((key) => {
            data[key] = tid[key];
        });
        return data;
    };

    return (
        <div>
            <Form.FormikWrapper
                initialValues={{ tid: mapDatoTidToFormDatoTid(tid) }}
                onSubmit={onFormikSubmit}
                renderForm={() => {
                    return (
                        <Form.Form
                            onCancel={onCancel}
                            formErrorHandler={getFormErrorHandler(intl, 'tidsperiodeForm')}
                            includeValidationSummary={true}
                            includeButtons={false}
                            formFooter={
                                <FormBlock margin="l">
                                    <div>
                                        <Button type="submit" variant="primary">
                                            <FormattedMessage id="tidKalenderForm.ok.label" />
                                        </Button>
                                        <Button type="button" variant="secondary" onClick={onCancel}>
                                            <FormattedMessage id="tidKalenderForm.avbryt.label" />
                                        </Button>
                                    </div>
                                </FormBlock>
                            }>
                            <Heading level="1" size="medium">
                                {tittel}
                            </Heading>
                            {intro ? <Block margin="l">{intro}</Block> : undefined}
                            <TidUkerInput
                                fieldName={FormField.tid}
                                periode={periode}
                                tidPerDagValidator={tidPerDagValidator}
                            />
                        </Form.Form>
                    );
                }}
            />
        </div>
    );
};

export default TidKalenderForm;
