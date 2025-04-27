import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { InformationSquareIcon, MenuGridIcon, MoonFillIcon, PersonIcon, SunFillIcon } from '@navikt/aksel-icons';
import { useThemeContext } from '../../context/ThemeContext';
import { useVeileder } from '../../context/VeilederContext';

const AppHeader = () => {
    const { veileder } = useVeileder();
    const { setDarkMode, darkMode } = useThemeContext();

    const navigate = useNavigate();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
            <InternalHeader.Button
                aria-label="Bytt mellom lys og mørk modus"
                onClick={(e) => {
                    e.preventDefault();
                    setDarkMode(!darkMode);
                }}>
                {darkMode ? (
                    <MoonFillIcon aria-label="Mørk modus er aktiv" />
                ) : (
                    <SunFillIcon aria-label="Lys modus er aktiv" />
                )}
            </InternalHeader.Button>
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
