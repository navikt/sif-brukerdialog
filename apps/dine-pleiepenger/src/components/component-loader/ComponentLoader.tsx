import { BodyShort, Loader, VStack } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const ComponentLoader = ({ title }: Props) => (
    <div className="p-5 text-center">
        <VStack gap="space-16" align="center">
            <Loader size="2xlarge" title={title} />
            {title ? <BodyShort size="large">{title}</BodyShort> : null}
        </VStack>
    </div>
);

export default ComponentLoader;
