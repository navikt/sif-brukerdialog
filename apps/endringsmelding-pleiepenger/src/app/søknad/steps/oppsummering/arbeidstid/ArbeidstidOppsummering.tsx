import { Alert, Heading, VStack } from '@navikt/ds-react';

import EditButton from '../../../../components/buttons/EditButton';
import { AppText } from '../../../../i18n';
import { Arbeidsgiver, ArbeidstidApiData } from '../../../../types';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';

interface Props {
    onEdit: () => void;
    arbeidstid?: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
    arbeidstidErEndret: boolean;
    harGyldigArbeidstid: boolean;
}

const ArbeidstidOppsummering = ({
    arbeidsgivere,
    arbeidstid,
    arbeidstidErEndret,
    harGyldigArbeidstid,
    onEdit,
}: Props) => {
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.arbeidstid.tittel" />
            </Heading>
            {arbeidstid && arbeidstidErEndret ? (
                <>
                    <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                    {!harGyldigArbeidstid && (
                        <Alert variant="error">
                            <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                        </Alert>
                    )}
                </>
            ) : (
                <VStack gap="space-16">
                    <Alert variant="info">
                        <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                    </Alert>
                </VStack>
            )}
            <div>
                <EditButton icon={null} variant="secondary" onClick={onEdit}>
                    <AppText id="oppsummeringStep.endre.arbeidstid" />
                </EditButton>
            </div>
        </VStack>
    );
};

export default ArbeidstidOppsummering;
