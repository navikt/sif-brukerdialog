import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds/src';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../i18n';
import { SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';

interface Props {
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
}

const AnnetBarnPart: React.FC<Props> = ({ søkersFødselsnummer, harRegistrerteBarn }) => {
    const { text } = useAppIntl();

    return (
        <Block margin="xl">
            <SkjemagruppeQuestion
                legend={
                    harRegistrerteBarn ? (
                        <Heading level="2" size="small" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                            {text('step.beskrivelse_pp.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <div>
                    <SoknadFormComponents.TextField
                        label={text('step.beskrivelse_pp.annetBarn.fnr.spm')}
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
