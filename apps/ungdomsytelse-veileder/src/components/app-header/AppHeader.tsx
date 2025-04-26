import { ActionMenu, Box, InternalHeader, Spacer, Switch } from '@navikt/ds-react';
import { useVeileder } from '../../context/VeilederContext';
import { InformationSquareIcon, MenuGridIcon, PersonIcon } from '@navikt/aksel-icons';
import { useNavigate } from 'react-router-dom';
import { useDevContext } from '../../dev-components/dev-context/DevContext';

const AppHeader = () => {
    const { veileder } = useVeileder();
    const { setDarkMode, darkMode } = useDevContext();

    const navigate = useNavigate();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
            <Box marginBlock={'2 0'} paddingInline={'5'}>
                <Switch checked={darkMode} size="small" onChange={(e) => setDarkMode(e.target.checked)}>
                    <span style={{ fontSize: '0.8rem' }}>Dark mode</span>
                </Switch>
            </Box>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <InternalHeader.Button>
                        <MenuGridIcon fontSize="1.5rem" title="Innhold i veilederapplikasjonen" />
                    </InternalHeader.Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Item onSelect={() => navigate('/')} icon={<PersonIcon />}>
                        Finn deltaker
                    </ActionMenu.Item>
                    <ActionMenu.Divider />
                    <ActionMenu.Item onSelect={() => navigate('/informasjon')} icon={<InformationSquareIcon />}>
                        Informasjon og veiledning
                    </ActionMenu.Item>
                </ActionMenu.Content>
            </ActionMenu>
            <InternalHeader.User name={veileder.NAVident} />
        </InternalHeader>
    );
};

export default AppHeader;
