import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DineBarnFormFields } from '../DineBarnStep';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

const HarDekketTiFørsteDagerSelvSpørsmål: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <FormBlock>
            <FormikYesOrNoQuestion
                legend={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv.spm')}
                name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title="Hvorfor spør vi om dette?">
                        Du skal dekke de første 10 omsorgsdagene til og med det kalenderåret det yngste barnet ditt
                        fyller 12 år.
                    </ExpandableInfo>
                }
            />
        </FormBlock>
    );
};

export default HarDekketTiFørsteDagerSelvSpørsmål;
