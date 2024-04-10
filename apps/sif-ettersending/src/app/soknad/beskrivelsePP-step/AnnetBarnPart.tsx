import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds/src';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';

import SoknadFormComponents from '../SoknadFormComponents';
import { SoknadFormField } from '../../types/SoknadFormData';

interface Props {
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
}

const AnnetBarnPart: React.FC<Props> = ({ søkersFødselsnummer, harRegistrerteBarn }) => {
    const intl = useIntl();

    return (
        <Block margin="xl">
            <SkjemagruppeQuestion
                legend={
                    harRegistrerteBarn ? (
                        <Heading level="2" size="small" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                            {intlHelper(intl, 'step.beskrivelse_pp.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <div>
                    <SoknadFormComponents.TextField
                        label={intlHelper(intl, 'step.beskrivelse_pp.annetBarn.fnr.spm')}
                        name={SoknadFormField.barnetsFødselsnummer}
                        validate={getFødselsnummerValidator({
                            required: true,
                            disallowedValues: [søkersFødselsnummer],
                        })}
                        width="xl"
                        type="tel"
                        maxLength={11}
                    />
                </div>
            </SkjemagruppeQuestion>
        </Block>
    );
};
export default AnnetBarnPart;
