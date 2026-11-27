import { useAppIntl } from '@app/i18n';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getRequiredFieldValidator } from '@sif/validation';

import { getÅr } from '../tidspunktForAleneomsorgStegUtils';
import { TidspunktForAleneomsorg, type TidspunktForAleneomsorgFormValues } from '../types';

const { RadioGroup } = createSifFormComponents<TidspunktForAleneomsorgFormValues>();

export const TidspunktSpørsmål = ({ barnId, barnNavn }: { barnId: string; barnNavn: string }) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('tidspunktForAleneomsorgForm');
    const name = `aleneomsorgTidspunkt.idFnr_${barnId}.tidspunktForAleneomsorg` as const;

    return (
        <RadioGroup
            name={name}
            legend={text('step.tidspunktForAleneomsorg.spm', { navn: barnNavn })}
            radios={[
                {
                    label: text('step.tidspunktForAleneomsorg.radioPanelGroupLabel.siste2årene', {
                        yearAgo: getÅr(1),
                        yearNow: getÅr(0),
                    }),
                    value: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                },
                {
                    label: text('step.tidspunktForAleneomsorg.radioPanelGroupLabel.tidligere', {
                        twoYearsAgo: getÅr(2),
                    }),
                    value: TidspunktForAleneomsorg.TIDLIGERE,
                },
            ]}
            validate={validateField('tidspunktForAleneomsorg', getRequiredFieldValidator())}
        />
    );
};
