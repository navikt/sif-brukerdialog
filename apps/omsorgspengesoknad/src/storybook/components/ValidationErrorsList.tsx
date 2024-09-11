import { Box, List } from '@navikt/ds-react';
import { AppText } from '../../../src/app/i18n';

interface Props {
    validationKeys: string[];
    intlKeyPath: string;
}

const ValidationErrorsList = ({ validationKeys, intlKeyPath }: Props) => {
    return (
        <Box padding={'4'} background="bg-subtle">
            {validationKeys.map((key) => (
                <List key={key}>
                    <List.Item title={key}>
                        <AppText id={`${intlKeyPath}.${key}` as any} />
                    </List.Item>
                </List>
            ))}
        </Box>
    );
};

export default ValidationErrorsList;
