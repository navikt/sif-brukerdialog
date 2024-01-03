import React from 'react';
import { BarnAlderInfo } from '../dineBarnStepUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Alert } from '@navikt/ds-react';

interface Props {
    barnAlderInfo: BarnAlderInfo;
    harSyktBarn?: YesOrNo;
    harAleneomsorg?: YesOrNo;
}

const getMessage = (props: Props) => {
    const {
        barnAlderInfo: { kunBarnOver13 },
        harSyktBarn,
    } = props;
    if (kunBarnOver13) {
        if (harSyktBarn === YesOrNo.YES) {
            return (
                <Alert variant="info">
                    Fordi kronisk syke barn over 13 år.... kan du søke om utbetaling av fra 1. fraværsdag.
                </Alert>
            );
        }
        if (harSyktBarn === YesOrNo.NO) {
            return (
                <Alert variant="warning">
                    For å få omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og fått innvilget ekstra
                    omsorgsdager fra NAV fordi barnet har en kronisk/langvarig sykdom eller en funksjonshemning.
                </Alert>
            );
        }
    }
    return undefined;
};

const DineBarnMeldingerPart: React.FunctionComponent<Props> = (props) => {
    const message = getMessage(props);
    return message ? <Block>{message}</Block> : null;
};

export default DineBarnMeldingerPart;
