import { FieldValues } from 'react-hook-form';

import { SifCheckbox } from './SifCheckbox';
import { SifCheckboxGroup } from './SifCheckboxGroup';
import { SifCombobox } from './SifCombobox';
import { SifCountrySelect } from './SifCountrySelect';
import { SifDatepicker } from './SifDatepicker';
import { SifDateRangePicker } from './SifDateRangePicker';
import { SifInputGroup } from './SifInputGroup';
import { SifNumberInput } from './SifNumberInput';
import { SifRadioGroup } from './SifRadioGroup';
import { SifSelect } from './SifSelect';
import { SifTextarea } from './SifTextarea';
import { SifTextField } from './SifTextField';
import { SifTimeInput } from './SifTimeInput';
import { SifYesOrNoQuestion } from './SifYesOrNoQuestion';

export function createSifFormComponents<T extends FieldValues>() {
    return {
        TextField: SifTextField<T>,
        Textarea: SifTextarea<T>,
        NumberInput: SifNumberInput<T>,
        Select: SifSelect<T>,
        CountrySelect: SifCountrySelect<T>,
        TimeInput: SifTimeInput<T>,
        RadioGroup: SifRadioGroup<T>,
        Checkbox: SifCheckbox<T>,
        CheckboxGroup: SifCheckboxGroup<T>,
        YesOrNoQuestion: SifYesOrNoQuestion<T>,
        InputGroup: SifInputGroup<T>,
        Datepicker: SifDatepicker<T>,
        DateRangePicker: SifDateRangePicker<T>,
        Combobox: SifCombobox<T>,
    };
}
