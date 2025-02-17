import { Heading, Tabs } from '@navikt/ds-react';
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { hasValue } from '@navikt/sif-validation';

interface Props {
    title: string;
    functionName?: string;
    code?: string;
    children?: React.ReactNode;
}

const ValidationPanel: React.FunctionComponent<Props> = ({ title, children, code }) => {
    const [activePanel, setActivePanel] = React.useState<string>('example');
    return (
        <div style={{ marginBottom: '4rem' }}>
            <Heading level="3" size="medium">
                {title}
            </Heading>
            <Block margin="l">
                {hasValue(code) && (
                    <Tabs
                        value={activePanel}
                        onChange={(idx) => {
                            setActivePanel(idx);
                        }}>
                        <Tabs.List>
                            <Tabs.Tab value="example" label="Example" />
                            <Tabs.Tab value="code" label="Code" />
                        </Tabs.List>
                        <Tabs.Panel value={'example'}>{children}</Tabs.Panel>
                        <Tabs.Panel value={'code'}>
                            <SyntaxHighlighter language="typescript" style={docco}>
                                {code}
                            </SyntaxHighlighter>
                        </Tabs.Panel>
                    </Tabs>
                )}
            </Block>
        </div>
    );
};
export default ValidationPanel;
