import { FieldValues } from 'react-hook-form';

import { SifCheckbox } from './SifCheckbox';
import { SifCheckboxGroup } from './SifCheckboxGroup';
import { SifRadioGroup } from './SifRadioGroup';
import { SifTextField } from './SifTextField';
import { SifYesOrNoQuestion } from './SifYesOrNoQuestion';

export function createSifFormComponents<T extends FieldValues>() {
    return {
        TextField: SifTextField<T>,
        RadioGroup: SifRadioGroup<T>,
        Checkbox: SifCheckbox<T>,
        CheckboxGroup: SifCheckboxGroup<T>,
        YesOrNoQuestion: SifYesOrNoQuestion<T>,
    };
}
