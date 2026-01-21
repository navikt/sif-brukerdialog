import { Alert, Checkbox, VStack } from '@navikt/ds-react';

import { AppText } from '../../../i18n';

interface Props {
    visKorteUkerMelding?: boolean;
    ukerKanVelges: boolean;
    onUkerKanVelgesChange: (checked: boolean) => void;
}

const EndreUkerHeader = ({
    ukerKanVelges,
    onUkerKanVelgesChange: onUkerKanVelgesChange,
    visKorteUkerMelding,
}: Props) => {
    return (
        <VStack gap="space-8">
            <Checkbox
                checked={ukerKanVelges}
                onChange={(evt) => {
                    onUkerKanVelgesChange(evt.target.checked);
                }}>
                <AppText id="endreUkerHeader.cb.endreFlereSamtidig.label" />
            </Checkbox>
            {visKorteUkerMelding && (
                <Alert variant="info">
                    <AppText id="endreUkerHeader.korteUker.melding" />
                </Alert>
            )}
        </VStack>
    );
};

export default EndreUkerHeader;
