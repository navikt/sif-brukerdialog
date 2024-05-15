import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DineBarnFormFields } from '../DineBarnStep';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText, useAppIntl } from '../../../../i18n';

const HarDekketTiFørsteDagerSelvSpørsmål: React.FunctionComponent = () => {
    const { text } = useAppIntl();
    return (
        <FormBlock>
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
        </FormBlock>
    );
};

export default HarDekketTiFørsteDagerSelvSpørsmål;
