import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { ArbeidsaktivitetType } from '../../ArbeidstidStep';
import InfoOmEndring from '../InfoOmEndring';

interface Props {
    arbeidsaktivitetType: ArbeidsaktivitetType;
    søkerFremITid: boolean;
    tittel: string;
    children?: React.ReactNode;
}

const ArbeidIPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidsaktivitetType,
    søkerFremITid,
    tittel,
    children,
}) => (
    <>
        <Heading level="4" size="small">
            {tittel}
        </Heading>
        {children}
        {søkerFremITid && (
            <p>
                <FormattedMessage id="arbeidIPeriode.redusert.info.tekst" />
            </p>
        )}
        <Block margin="m">
            <InfoOmEndring arbeidsaktivitetType={arbeidsaktivitetType} />
        </Block>
    </>
);

export default ArbeidIPeriodeInfo;
