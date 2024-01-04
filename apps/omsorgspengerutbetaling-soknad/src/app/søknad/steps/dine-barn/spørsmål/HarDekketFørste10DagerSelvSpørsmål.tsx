import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import React from 'react';
import { useIntl } from 'react-intl';
import { DineBarnFormFields } from '../DineBarnStep';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';

interface Props {
    info?: React.ReactNode;
}

const HarDekketFørste10DagerSelvSpørsmål: React.FunctionComponent<Props> = ({ info }) => {
    const intl = useIntl();
    return (
        <FormBlock>
            <Heading level="3" size="small">
                Omsorgsdager du må dekke selv
            </Heading>

            {info ? <Block>{info}</Block> : null}

            <FormBlock>
                <FormikYesOrNoQuestion
                    legend={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv.spm')}
                    name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
                    validate={getYesOrNoValidator()}
                />
            </FormBlock>
        </FormBlock>
    );
};

export default HarDekketFørste10DagerSelvSpørsmål;
