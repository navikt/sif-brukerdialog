import { useAppIntl } from '@app/i18n';
import { ReadMore } from '@navikt/ds-react';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getYesOrNoValidator } from '@sif/validation';

import type { OmOmsorgenForBarnFormValues } from '../types';

interface Props {
    harNøyaktigEttBarn: boolean;
}

const { YesOrNoQuestion } = createSifFormComponents<OmOmsorgenForBarnFormValues>();

export const HarAvtaleOmDeltBostedSpørsmål = ({ harNøyaktigEttBarn }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('omOmsorgenForBarnForm');

    return (
        <YesOrNoQuestion
            legend={text(
                harNøyaktigEttBarn
                    ? 'steg.omOmsorgenForBarn.deltBosted.spm'
                    : 'steg.omOmsorgenForBarn.deltBosted.flereBarn.spm',
            )}
            name="avtaleOmDeltBosted"
            validate={validateField('avtaleOmDeltBosted', getYesOrNoValidator())}
            description={
                <ReadMore header={text('steg.omOmsorgenForBarn.deltBosted.description.tittel')}>
                    {text('steg.omOmsorgenForBarn.deltBosted.description')}
                </ReadMore>
            }
        />
    );
};
