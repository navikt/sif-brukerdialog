import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormValues } from '../../../types/_ArbeidIPeriodeFormValues';
import { SelvstendigFormField } from '../../../types/_SelvstendigFormData';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';
import InfoOmEndring from './InfoOmEndring';
import ArbeidstidArbeidsaktivitet from './ArbeidstidArbeidsaktivitet';

interface Props {
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
    normalarbeidstid: number;
    /** Periode som selvstendig i søknadsperioden */
    periode: DateRange;
    søkerFremITid: boolean;
}

const ArbeidstidSelvstendig: React.FunctionComponent<Props> = ({
    arbeidIPeriode,
    periode,
    normalarbeidstid,
    søkerFremITid,
}) => {
    const intl = useIntl();

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: periode,
        jobberNormaltTimer: normalarbeidstid,
    });

    return (
        <ArbeidstidArbeidsaktivitet
            periode={periode}
            arbeidsaktivitetType={ArbeidsaktivitetType.SELVSTENDING}
            arbeidIPeriode={arbeidIPeriode}
            parentFieldName={SelvstendigFormField.arbeidsforhold}
            tittel="Selvstendig næringsdrivende"
            intlValues={intlValues}
            normalarbeidstid={normalarbeidstid}
            info={
                <>
                    <Heading level="4" size="small">
                        Hvor mye jobber du som selvstendig næringsdrivende i perioden?
                    </Heading>

                    {søkerFremITid && (
                        <p>
                            <FormattedMessage id="arbeidIPeriode.redusert.info.tekst" />
                        </p>
                    )}
                    <Block margin="m">
                        <InfoOmEndring arbeidsaktivitetType={ArbeidsaktivitetType.SELVSTENDING} />
                    </Block>
                </>
            }
        />
    );
};

export default ArbeidstidSelvstendig;
