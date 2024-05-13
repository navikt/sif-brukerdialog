import React from 'react';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { useIntl } from 'react-intl';
import { DineBarnFormFields } from '../DineBarnStep';
import { dateToday } from '@navikt/sif-common-utils';
import { nYearsAgo } from '../dineBarnStepUtils';
import { Heading } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

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
    const intl = useIntl();
    const andreBarnFnr = andreBarn.map((barn) => barn.fnr);
    return (
        <div>
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="step.dineBarn.andreBarn.heading" />
            </Heading>
            <AnnetBarnListAndDialog<DineBarnFormFields>
                name={DineBarnFormFields.andreBarn}
                labels={{
                    addLabel: intlHelper(intl, 'step.dineBarn.annetBarnListAndDialog.addLabel'),
                    listTitle: harRegistrerteBarn
                        ? intlHelper(intl, 'step.dineBarn.annetBarnListAndDialog.listTitle')
                        : intlHelper(intl, 'step.dineBarn.annetBarnListAndDialog.listTitle.ingenRegistrerteBarn'),

                    modalTitle: intlHelper(intl, 'step.dineBarn.annetBarnListAndDialog.modalTitle'),
                }}
                maxDate={dateToday}
                minDate={nYearsAgo(18)}
                disallowedFødselsnumre={[...[søkerFnr], ...andreBarnFnr]}
                aldersGrenseText={intlHelper(intl, 'step.dineBarn.formLeggTilBarn.aldersGrenseInfo')}
                visBarnTypeValg={true}
                onAfterChange={(values) => onAndreBarnChange(values)}
            />
        </div>
    );
};

export default AndreBarnPart;
