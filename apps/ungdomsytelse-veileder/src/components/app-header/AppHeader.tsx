import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { InformationSquareIcon, MenuGridIcon, MoonFillIcon, PersonIcon, SunFillIcon } from '@navikt/aksel-icons';
import { useThemeContext } from '../../context/ThemeContext';
import { useVeileder } from '../../context/VeilederContext';
import { useDrawer } from '../drawer/DrawerContext';
import DrawerArticles from '../../pages/info-page/DrawerArticles';
import { AppHendelse, useAnalyticsInstance } from '../../utils/analytics';

interface Props {
    visActionsMenu?: boolean;
}
const AppHeader = ({ visActionsMenu = false }: Props) => {
    const { veileder } = useVeileder();
    const { setDarkMode, darkMode } = useThemeContext();

    const navigate = useNavigate();
    const { openDrawer } = useDrawer();
    const { logAppHendelse } = useAnalyticsInstance();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Deltakerregistrering - ungdomsprogrammet</InternalHeader.Title>
            <Spacer />
            <InternalHeader.Button
                aria-label="Bytt mellom lys og mørk modus"
                onClick={async (e) => {
                    e.preventDefault();
                    await logAppHendelse(AppHendelse.togglerDarkMode, { mode: !darkMode });
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
                    <InternalHeader.Button
                        onClick={async (e) => {
                            e.preventDefault();
                            await logAppHendelse(AppHendelse.viserInformasjon);
                            openDrawer(<DrawerArticles />);
                        }}>
                        <InformationSquareIcon fontSize="1.5rem" title="Informasjonikon" />
                    </InternalHeader.Button>
                </ActionMenu.Trigger>
            </ActionMenu>
            {visActionsMenu && (
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
            )}
            <InternalHeader.User name={veileder.NAVident} />
        </InternalHeader>
    );
};

export default AppHeader;
