import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import React from 'react';

import { AppText, useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';

const HarDekketTiFørsteDagerSelvSpørsmål: React.FunctionComponent = () => {
    const { text } = useAppIntl();
    return (
        <FormikYesOrNoQuestion
            legend={text('step.dineBarn.bekrefterDektTiDagerSelv.spm')}
            name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
            validate={getYesOrNoValidator()}
            description={
                <ExpandableInfo title={text('step.dineBarn.bekrefterDektTiDagerSelv.info.tittel')}>
                    <AppText id="step.dineBarn.bekrefterDektTiDagerSelv.info.tekst" />
                </ExpandableInfo>
            }
        />
    );
};

export default HarDekketTiFørsteDagerSelvSpørsmål;
