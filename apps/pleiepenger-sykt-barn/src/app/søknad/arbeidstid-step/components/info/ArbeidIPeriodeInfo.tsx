import { Heading } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../../../i18n';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';
import InfoOmEndring from '../InfoOmEndring';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    søkerFremITid: boolean;
    mottarOmsorgsstønad?: boolean;
    tittel: string;
    children?: React.ReactNode;
}

const ArbeidIPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidsforholdType,
    søkerFremITid,
    mottarOmsorgsstønad,
    tittel,
    children,
}) => (
    <>
        <Heading level="3" size="small">
            {tittel}
        </Heading>
        {children}
        {mottarOmsorgsstønad && (
            <p>
                <AppText id="arbeidIPeriode.redusert.info.tekst.mottarOmsorgsstønad" />
            </p>
        )}
        {søkerFremITid && (
            <p>
                <AppText id="arbeidIPeriode.redusert.info.tekst" />
            </p>
        )}

        <InfoOmEndring arbeidsforholdType={arbeidsforholdType} />
    </>
);

export default ArbeidIPeriodeInfo;
