import { FieldValues } from 'react-hook-form';

import { SifCheckbox } from './SifCheckbox';
import { SifCheckboxGroup } from './SifCheckboxGroup';
import { SifDatepicker } from './SifDatepicker';
import { SifInputGroup } from './SifInputGroup';
import { SifNumberInput } from './SifNumberInput';
import { SifRadioGroup } from './SifRadioGroup';
import { SifSelect } from './SifSelect';
import { SifTextField } from './SifTextField';
import { SifYesOrNoQuestion } from './SifYesOrNoQuestion';

export function createSifFormComponents<T extends FieldValues>() {
    return {
        TextField: SifTextField<T>,
        NumberInput: SifNumberInput<T>,
        Select: SifSelect<T>,
        RadioGroup: SifRadioGroup<T>,
        Checkbox: SifCheckbox<T>,
        CheckboxGroup: SifCheckboxGroup<T>,
        YesOrNoQuestion: SifYesOrNoQuestion<T>,
        InputGroup: SifInputGroup<T>,
        Datepicker: SifDatepicker<T>,
    };
}
