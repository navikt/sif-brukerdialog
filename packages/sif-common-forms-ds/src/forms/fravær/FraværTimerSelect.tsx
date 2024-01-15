import { TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import { FraværDagForm, FraværDagFormFields } from './FraværDagForm';
import { timeText } from './fraværUtilities';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';

interface Props extends TypedFormInputValidationProps<any, ValidationError> {
    name: FraværDagFormFields;
    label?: string;
    maksTid?: number;
}

const getOptionsList: (maksTid: number) => JSX.Element[] = (maksTid: number) => {
    const newOptionElement = (t: number): JSX.Element => {
        return (
            <option key={t} value={t}>
                {t.toString(10).replace('.', ',')} {timeText(t.toString(10))}
            </option>
        );
    };
    const go = (jsxList: JSX.Element[], tid: number): JSX.Element[] => {
        return tid >= maksTid
            ? [...jsxList, newOptionElement(tid)]
            : go([...jsxList, newOptionElement(tid)], tid + 0.5);
    };
    return go([], 0.5);
};

const FraværTimerSelect = ({ name, validate, label, maksTid }: Props) => {
    return (
        <FraværDagForm.Select label={label || 'Antall timer'} name={name} validate={validate}>
            <option />
            {getOptionsList(maksTid || 7.5)}
        </FraværDagForm.Select>
    );
};

export default FraværTimerSelect;
