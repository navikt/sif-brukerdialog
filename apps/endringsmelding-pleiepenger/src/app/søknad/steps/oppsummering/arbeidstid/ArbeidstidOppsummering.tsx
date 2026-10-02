import { Alert } from '@navikt/ds-react';

import { AppText } from '../../../../i18n';
import { ArbeidsgiverMedAnsettelseperioder, ArbeidstidApiData } from '../../../../types';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';

interface Props {
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    arbeidstid: ArbeidstidApiData;
    harGyldigArbeidstid: boolean;
}

const ArbeidstidOppsummering = ({ arbeidsgivere, arbeidstid, harGyldigArbeidstid }: Props) => (
    <>
        <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
        {!harGyldigArbeidstid && (
            <Alert variant="error">
                <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
            </Alert>
        )}
    </>
);

export default ArbeidstidOppsummering;
