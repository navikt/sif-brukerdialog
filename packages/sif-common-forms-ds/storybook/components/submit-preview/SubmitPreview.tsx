import { Box } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

interface Props {
    values?: any;
}

function SubmitPreview({ values }: Props) {
    return (
        <Block margin="xl">
            <div style={{ borderTop: '1px dashed #59514B', paddingTop: '1rem', margin: '0 -1rem' }}>
                <Block margin="m">
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        {values ? (
                            <pre style={{ margin: 0, fontSize: '.8rem' }}>{JSON.stringify(values, null, 2)}</pre>
                        ) : (
                            <>Ingen data</>
                        )}
                    </Box>
                </Block>
            </div>
        </Block>
    );
}

export default SubmitPreview;
