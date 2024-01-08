import { Alert } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import HarSyktBarnSpørsmål from '../spørsmål/HarSyktBarnSpørsmål';

interface Props {
    antallBarn: number;
    harSyktBarn?: YesOrNo;
    harUtvidetRett: boolean;
}

const KunBarnOver13: React.FunctionComponent<Props> = ({ antallBarn, harSyktBarn, harUtvidetRett }) => {
    return (
        <>
            <HarSyktBarnSpørsmål antallBarn={antallBarn} />

            {yesOrNoIsAnswered(harSyktBarn) && (
                <Block>
                    {harUtvidetRett ? (
                        <Alert variant="info">
                            Fordi du har kronisk sykt barn over 13 år trenger du ikke dekke de 10 første omsorgsdagene,
                            og du kan søke om utbetaling fra 1. fraværsdag.
                        </Alert>
                    ) : (
                        <Alert variant="warning">
                            For å ha rett på omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og fått
                            innvilget ekstra omsorgsdager fra NAV fordi barnet har en kronisk/langvarig sykdom eller en
                            funksjonshemning.
                        </Alert>
                    )}
                </Block>
            )}
        </>
    );
};

export default KunBarnOver13;
