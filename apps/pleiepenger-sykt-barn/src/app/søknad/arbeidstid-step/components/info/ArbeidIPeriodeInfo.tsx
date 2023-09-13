import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import InfoOmEndring from '../InfoOmEndring';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    søkerFremITid: boolean;
    tittel: string;
    children?: React.ReactNode;
}

const ArbeidIPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidsforholdType,
    søkerFremITid,
    tittel,
    children,
}) => (
    <>
        <Heading level="3" size="small">
            {tittel}
        </Heading>
        {children}
        {søkerFremITid && (
            <p>
                <FormattedMessage id="arbeidIPeriode.redusert.info.tekst" />
            </p>
        )}
        <Block margin="m">
            <InfoOmEndring arbeidsforholdType={arbeidsforholdType} />
        </Block>
    </>
);

export default ArbeidIPeriodeInfo;
