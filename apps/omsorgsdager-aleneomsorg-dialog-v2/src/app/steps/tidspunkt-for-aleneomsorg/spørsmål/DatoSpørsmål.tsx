import { useAppIntl } from '@app/i18n';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getDagensDatoIOslo, ISODateToDate } from '@sif/utils';
import { getDateValidator } from '@sif/validation';

import { getMinDatoForTidspunkt } from '../tidspunktForAleneomsorgStegUtils';
import type { TidspunktForAleneomsorgFormValues } from '../types';

const { Datepicker } = createSifFormComponents<TidspunktForAleneomsorgFormValues>();

export const DatoSpørsmål = ({ barnId, barnNavn }: { barnId: string; barnNavn: string }) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('tidspunktForAleneomsorgForm');
    const name = `aleneomsorgTidspunkt.idFnr_${barnId}.dato` as const;
    const minDato = getMinDatoForTidspunkt();
    const maksDato = getDagensDatoIOslo();

    return (
        <Datepicker
            name={name}
            label={text('step.tidspunktForAleneomsorg.siste2årene.dato.spm', { navn: barnNavn })}
            dropdownCaption
            minDate={minDato}
            maxDate={maksDato}
            validate={validateField(
                'dato',
                getDateValidator({
                    required: true,
                    min: ISODateToDate(minDato),
                    max: ISODateToDate(maksDato),
                }),
            )}
        />
    );
};
