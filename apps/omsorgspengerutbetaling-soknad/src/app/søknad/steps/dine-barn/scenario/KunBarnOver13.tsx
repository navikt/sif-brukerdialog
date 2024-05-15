import { Alert } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';
import { AppText } from '../../../../i18n';

interface Props {
    antallBarn: number;
    harSyktBarn?: YesOrNo;
    harUtvidetRett: boolean;
}

const KunBarnOver13: React.FunctionComponent<Props> = ({ harSyktBarn, harUtvidetRett }) => {
    return (
        <>
            <HarSyktBarnSpørsmål />

            {yesOrNoIsAnswered(harSyktBarn) && !harUtvidetRett ? (
                <Block>
                    <Alert variant="warning">
                        <AppText id="step.dineBarn.kunBarnOver13.ingenRett.tekst" />
                    </Alert>
                </Block>
            ) : null}
        </>
    );
};

export default KunBarnOver13;
