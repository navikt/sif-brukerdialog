import { Alert, Button, VStack } from '@navikt/ds-react';

import { AppText } from '../../../i18n';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
    visVelgUkerMelding: boolean;
    antallValgteUker: number;
    onEndreUker: () => void;
}

const EndreUkerFooter = ({ visVelgUkerMelding, onEndreUker }: Props) => {
    return (
        <VStack gap="space-20" className="arbeidstidUkeFooter" as="span">
            <div aria-relevant="additions removals" aria-live="polite">
                {visVelgUkerMelding && (
                    <Alert variant="info">
                        <AppText id="endreUkerFooter.velgUkerFørst.melding" />
                    </Alert>
                )}
            </div>
            <div>
                <Button
                    icon={<PencilIcon role="presentation" aria-hidden={true} />}
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
