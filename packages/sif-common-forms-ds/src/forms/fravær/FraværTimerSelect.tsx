import { TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { useFraværIntl } from './';
import { FraværDagForm, FraværDagFormFields } from './FraværDagForm';

interface Props extends TypedFormInputValidationProps<any, ValidationError> {
    name: FraværDagFormFields;
    label?: string;
    maksTid?: number;
}

const getOptions = (maksTid: number): number[] => {
    const options: number[] = [];
    for (let tid = 0.5; tid <= maksTid; tid += 0.5) {
        options.push(tid);
    }
    return options;
};

const FraværTimerSelect = ({ name, validate, label, maksTid = 7.5 }: Props) => {
    const { text, number } = useFraværIntl();
    return (
        <FraværDagForm.Select label={label || 'Antall timer'} name={name} validate={validate}>
            <option />
            {getOptions(maksTid).map((tid) => (
                <option key={tid} value={tid}>
                    {text('@forms.fraværDagForm.timerOption', { tid: number(tid), flertall: tid > 1 })}
                </option>
            ))}
        </FraværDagForm.Select>
    );
};

export default FraværTimerSelect;
