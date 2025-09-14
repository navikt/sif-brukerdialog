import { Edit } from '@navikt/ds-icons';
import { Alert, Button, VStack } from '@navikt/ds-react';

import { AppText } from '../../../i18n';

interface Props {
    visVelgUkerMelding: boolean;
    antallValgteUker: number;
    onEndreUker: () => void;
}

const EndreUkerFooter = ({ visVelgUkerMelding, onEndreUker }: Props) => {
    return (
        <VStack gap="5" className="arbeidstidUkeFooter" as="span">
            <div aria-relevant="additions removals" aria-live="polite">
                {visVelgUkerMelding && (
                    <Alert variant="info">
                        <AppText id="endreUkerFooter.velgUkerFørst.melding" />
                    </Alert>
                )}
            </div>
            <div>
                <Button
                    icon={<Edit role="presentation" aria-hidden={true} />}
                    variant="primary"
                    type="button"
                    data-testid="endre-flere-uker-button"
                    onClick={onEndreUker}>
                    <AppText id="endreUkerFooter.endreButton.label" />
                </Button>
            </div>
        </VStack>
    );
};

export default EndreUkerFooter;
