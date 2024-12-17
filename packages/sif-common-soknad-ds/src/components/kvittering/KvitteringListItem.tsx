import { List, ListItemProps } from '@navikt/ds-react';
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

const KvitteringListItem = (props: ListItemProps) => {
    return <List.Item {...props} icon={<CheckmarkCircleFillIcon role="presentation" />} />;
};

export default KvitteringListItem;
