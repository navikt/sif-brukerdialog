import { Heading, VStack } from '@navikt/ds-react';

interface Props {
    values?: any;
}

function SubmitPreview({ values }: Props) {
    return values ? (
        <VStack gap="space-8">
            <Heading level="3" size="small">
                Skjemadata
            </Heading>
            <pre>{JSON.stringify(values, null, 2)}</pre>
        </VStack>
    ) : null;
}

export default SubmitPreview;
