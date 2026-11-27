import { useAppIntl } from '@app/i18n';
import { type AnnetBarn, AnnetBarnListAndDialog } from '@sif/soknad-forms';
import { getDagensDatoIOslo } from '@sif/utils';

import { getMinDateForAnnetBarn } from '../omOmsorgenForBarnStegUtils';

interface Props {
    annetBarn: AnnetBarn[];
    søkerFødselsnummer: string;
    onChange: (annetBarn: AnnetBarn[]) => void;
}

export const AndreBarnSpørsmål = ({ annetBarn, søkerFødselsnummer, onChange }: Props) => {
    const { text } = useAppIntl();

    return (
        <AnnetBarnListAndDialog
            annetBarn={annetBarn}
            addButtonLabel={text('steg.omOmsorgenForBarn.annetBarnListAndDialog.addLabel')}
            minDate={getMinDateForAnnetBarn()}
            maxDate={getDagensDatoIOslo()}
            disallowedFødselsnumre={[søkerFødselsnummer, ...annetBarn.map((barn) => barn.fnr)]}
            aldersgrenseText={text('steg.omOmsorgenForBarn.formLeggTilBarn.aldersGrenseInfo')}
            showBarnTypeOptions={true}
            onChange={onChange}
        />
    );
};
