import React from 'react';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { DineBarnFormFields } from '../DineBarnStep';
import { dateToday } from '@navikt/sif-common-utils';
import { nYearsAgo } from '../dineBarnStepUtils';
import { Heading } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../../i18n';

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
    return (
        <div>
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="step.dineBarn.andreBarn.heading" />
            </Heading>
            <AnnetBarnListAndDialog<DineBarnFormFields>
                name={DineBarnFormFields.andreBarn}
                labels={{
                    addLabel: text('step.dineBarn.annetBarnListAndDialog.addLabel'),
                    listTitle: harRegistrerteBarn
                        ? text('step.dineBarn.annetBarnListAndDialog.listTitle')
                        : text('step.dineBarn.annetBarnListAndDialog.listTitle.ingenRegistrerteBarn'),

                    modalTitle: text('step.dineBarn.annetBarnListAndDialog.modalTitle'),
                }}
                maxDate={dateToday}
                minDate={nYearsAgo(18)}
                disallowedFødselsnumre={[...[søkerFnr], ...andreBarnFnr]}
                aldersGrenseText={text('step.dineBarn.formLeggTilBarn.aldersGrenseInfo')}
                visBarnTypeValg={true}
                onAfterChange={(values) => onAndreBarnChange(values)}
            />
        </div>
    );
};

export default AndreBarnPart;
