import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DineBarnFormFields } from '../DineBarnStep';

interface Props {
    info?: React.ReactNode;
    harUtvidetRett?: boolean;
}

const HarDekketTiFørsteDagerSelvSpørsmål: React.FunctionComponent<Props> = ({ info, harUtvidetRett }) => {
    const intl = useIntl();
    return (
        <FormBlock>
            <Heading level="3" size="small">
                Omsorgsdager du må dekke selv
            </Heading>

            {info ? <Block>{info}</Block> : null}

            {harUtvidetRett ? (
                <FormBlock>
                    <FormikYesOrNoQuestion
                        legend={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv.spm')}
                        name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
                        validate={getYesOrNoValidator()}
                    />
                </FormBlock>
            ) : null}
        </FormBlock>
    );
};

export default HarDekketTiFørsteDagerSelvSpørsmål;
