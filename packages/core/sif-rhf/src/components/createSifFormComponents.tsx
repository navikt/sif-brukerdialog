import { FieldValues } from 'react-hook-form';

import { SifCheckbox } from './SifCheckbox';
import { SifCheckboxGroup } from './SifCheckboxGroup';
import { SifCombobox } from './SifCombobox';
import { SifCountrySelect } from './SifCountrySelect';
import { SifDatepicker } from './SifDatepicker';
import { SifDateRangePicker } from './SifDateRangePicker';
import { SifInputGroup } from './SifInputGroup';
import { SifNumberInput } from './SifNumberInput';
import { SifRadioCardGroup } from './SifRadioCardGroup';
import { SifRadioGroup } from './SifRadioGroup';
import { SifSelect } from './SifSelect';
import { SifTextarea } from './SifTextarea';
import { SifTextField } from './SifTextField';
import { SifTimeInput } from './SifTimeInput';
import { SifYesOrNoQuestion } from './SifYesOrNoQuestion';

export function createSifFormComponents<T extends FieldValues>() {
    return {
        Checkbox: SifCheckbox<T>,
        CheckboxGroup: SifCheckboxGroup<T>,
        Combobox: SifCombobox<T>,
        CountrySelect: SifCountrySelect<T>,
        Datepicker: SifDatepicker<T>,
        DateRangePicker: SifDateRangePicker<T>,
        InputGroup: SifInputGroup<T>,
        NumberInput: SifNumberInput<T>,
        RadioGroup: SifRadioGroup<T>,
        RadioCardGroup: SifRadioCardGroup<T>,
        Select: SifSelect<T>,
        Textarea: SifTextarea<T>,
        TextField: SifTextField<T>,
        TimeInput: SifTimeInput<T>,
        YesOrNoQuestion: SifYesOrNoQuestion<T>,
    };
}
