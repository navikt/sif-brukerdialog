import { Heading, VStack } from '@navikt/ds-react';
import JSONView from 'react-json-view';
interface Props {
    values?: any;
}

function SubmitPreview({ values }: Props) {
    return values ? (
        <VStack gap="2">
            <Heading level="3" size="small">
                Skjemadata
            </Heading>
            <JSONView
                src={values}
                style={{ fontSize: '.8rem', padding: '1rem' }}
                theme="ashes"
                displayDataTypes={false}
                displayObjectSize={false}
                shouldCollapse={false}
            />
        </VStack>
    ) : null;
}

export default SubmitPreview;
