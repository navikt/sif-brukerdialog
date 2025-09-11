/* eslint-disable no-console */
import { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';
import ItemList from '../../../src/components/lists/item-list/ItemList';
import StoryWrapper from '../../decorators/StoryWrapper';
import { Box, Button } from '@navikt/ds-react';
import { guid } from '@navikt/sif-common-utils';

export default {
    title: 'Component/ItemList',
    component: ItemList,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
    argTypes: {
        useTrashcan: {
            options: [false, true],
        },
    },
} as Meta<typeof ItemList>;

type Item = {
    id: string;
    name: string;
};

const renderItemLabel = (item: Item) => {
    return item.name;
};

const Template: StoryFn<typeof ItemList> = (args) => {
    const [items, setItems] = useState<Item[]>([{ id: guid(), name: 'Item 1' }]);
    const [count, setCount] = useState<number>(1);

    const onDelete = (item: Item) => {
        setItems(items.filter((i) => i.id !== item.id));
    };
    const onEdit = (item: Item) => {
        console.log(item);
    };

    const addItem = () => {
        const newCount = count + 1;
        setCount(count + 1);
        setItems([...items, { id: guid(), name: `Item ${newCount}` }]);
    };

    return (
        <>
            <ItemList<Item>
                getItemId={(item) => item.id}
                getItemTitle={(item) => item.name}
                onDelete={onDelete}
                onEdit={onEdit}
                labelRenderer={renderItemLabel}
                items={items.filter((item) => item.id !== undefined)}
                useTrashcan={args.useTrashcan}
            />
            <Box marginBlock="8">
                <Button variant="tertiary" size="small" onClick={addItem}>
                    Add item
                </Button>
            </Box>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    useTrashcan: false,
};
