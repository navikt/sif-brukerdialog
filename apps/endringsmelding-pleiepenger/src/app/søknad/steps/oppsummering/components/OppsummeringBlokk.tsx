import { AppMessageKeys, AppText } from '@app/i18n';
import { Alert, Button, Heading, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    tittelId: AppMessageKeys;
    ingenEndringerId: AppMessageKeys;
    harEndringer: boolean;
    endre?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
    };
    children: ReactNode;
}

const OppsummeringBlokk = ({ tittelId, ingenEndringerId, harEndringer, endre, children }: Props) => (
    <VStack gap="space-16">
        <Heading level="2" size="medium">
            <AppText id={tittelId} />
        </Heading>
        {harEndringer ? (
            children
        ) : (
            <Alert variant="info">
                <AppText id={ingenEndringerId} />
            </Alert>
        )}
        {endre && (
            <div>
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    disabled={endre.disabled}
                    onClick={endre.onClick}>
                    {endre.label}
                </Button>
            </div>
        )}
    </VStack>
);

export default OppsummeringBlokk;
