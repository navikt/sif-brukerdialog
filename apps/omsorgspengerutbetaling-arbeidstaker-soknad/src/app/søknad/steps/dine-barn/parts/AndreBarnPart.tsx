import { Heading } from '@navikt/ds-react';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { getDateToday } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';
import { nYearsAgo } from '../dineBarnStepUtils';

interface Props {
    søkerFnr: string;
    andreBarn: AnnetBarn[];
    harRegistrerteBarn: boolean;
    onAndreBarnChange: (values: AnnetBarn[]) => void;
}

const AndreBarnPart = ({ andreBarn, søkerFnr, harRegistrerteBarn, onAndreBarnChange }: Props) => {
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
                maxDate={getDateToday()}
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
