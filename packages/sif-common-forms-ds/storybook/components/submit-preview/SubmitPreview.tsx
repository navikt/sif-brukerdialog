import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Panel } from '@navikt/ds-react';

interface Props {
    values?: any;
}

function SubmitPreview({ values }: Props) {
    return (
        <Block margin="xl">
            <div style={{ borderTop: '1px dashed #59514B', paddingTop: '1rem', margin: '0 -1rem' }}>
                <Block margin="m">
                    {values && (
                        <Panel style={{ padding: '1rem' }} border={true}>
                            <pre style={{ margin: 0, fontSize: '.8rem' }}>{JSON.stringify(values, null, 2)}</pre>
                        </Panel>
                    )}
                    {values === undefined && <Panel style={{ padding: '1rem' }}>Ingen data</Panel>}
                </Block>
            </div>
        </Block>
    );
}

export default SubmitPreview;
