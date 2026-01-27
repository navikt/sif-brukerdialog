import { BodyShort, Loader, VStack } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const ComponentLoader = ({ title }: Props) => (
    <VStack gap="space-16" align="center">
        <Loader size="2xlarge" title={title} />
        {title ? <BodyShort size="large">{title}</BodyShort> : null}
    </VStack>
);

export default ComponentLoader;
