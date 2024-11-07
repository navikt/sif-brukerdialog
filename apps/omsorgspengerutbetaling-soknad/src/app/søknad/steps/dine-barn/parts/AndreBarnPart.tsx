import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';

import { useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';
import { nYearsAgo } from '../dineBarnStepUtils';
import { getDateToday } from '@navikt/sif-common-utils';

interface Props {
    søkerFnr: string;
    andreBarn: AnnetBarn[];
    harRegistrerteBarn: boolean;
    onAndreBarnChange: (values: AnnetBarn[]) => void;
}

const AndreBarnPart: React.FunctionComponent<Props> = ({
    andreBarn,
    søkerFnr,
    harRegistrerteBarn,
    onAndreBarnChange,
}) => {
    const { text } = useAppIntl();
    const andreBarnFnr = andreBarn.map((barn) => barn.fnr);
    const harLagtTilAndreBarn = andreBarn.length > 0;
    return (
        <FormBlock>
            <AnnetBarnListAndDialog<DineBarnFormFields>
                name={DineBarnFormFields.andreBarn}
                labels={{
                    addLabel: text('step.dineBarn.annetBarnListAndDialog.addLabel'),
                    listTitle: harRegistrerteBarn
                        ? text(
                              harLagtTilAndreBarn
                                  ? 'step.dineBarn.annetBarnListAndDialog.listTitle.lagtTilBarn'
                                  : 'step.dineBarn.annetBarnListAndDialog.listTitle',
                          )
                        : text('step.dineBarn.annetBarnListAndDialog.listTitle.ingenRegistrerteBarn'),

                    modalTitle: text('step.dineBarn.annetBarnListAndDialog.modalTitle'),
                }}
                maxDate={getDateToday()}
                minDate={nYearsAgo(18)}
                disallowedFødselsnumre={[...[søkerFnr], ...andreBarnFnr]}
                aldersGrenseText={text('step.dineBarn.formLeggTilBarn.aldersGrenseInfo')}
                visBarnTypeValg={true}
                onAfterChange={(values) => onAndreBarnChange(values)}
            />
        </FormBlock>
    );
};

export default AndreBarnPart;
