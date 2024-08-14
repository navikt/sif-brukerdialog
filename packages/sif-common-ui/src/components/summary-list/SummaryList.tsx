import { List } from '@navikt/ds-react';
import React from 'react';

interface Props {
    items: any[];
    itemRenderer: (data: any) => React.ReactNode;
}

const SummaryList: React.FunctionComponent<Props> = ({ items, itemRenderer }) => (
    <List>
        {items.map((item, idx) => (
            <List.Item key={idx}>{itemRenderer(item)}</List.Item>
        ))}
    </List>
);

export default SummaryList;
