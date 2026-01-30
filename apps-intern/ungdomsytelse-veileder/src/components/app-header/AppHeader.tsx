import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import {
    InformationSquareIcon,
    MenuGridIcon,
    MoonFillIcon,
    PersonIcon,
    SunFillIcon,
    TasklistIcon,
} from '@navikt/aksel-icons';
import { useThemeContext } from '../../context/ThemeContext';
import { useVeileder } from '../../context/VeilederContext';
import DrawerArticles from '../../pages/info-page/DrawerArticles';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import { DrawerWidth, useDrawer } from '../drawer/DrawerContext';
import SjekklisteDrawer from '../sjekkliste/DrawerSjekkliste';
import { Features } from '../../types/Features';
import VeilederDemoInformasjon from '../../demo/VeilederDemoInformasjon';

interface Props {
    visActionsMenu?: boolean;
}
const AppHeader = ({ visActionsMenu = false }: Props) => {
    const { veileder } = useVeileder();
    const { setDarkMode, darkMode } = useThemeContext();

    const navigate = useNavigate();
    const { openDrawer } = useDrawer();
    const { log } = useAppEventLogger();

    return (
        <>
            {__IS_VEILEDER_DEMO__ && <VeilederDemoInformasjon variant="compact" />}

            <InternalHeader>
                <InternalHeader.Title href="/">Deltakerregistrering - ungdomsprogrammet</InternalHeader.Title>
                <Spacer />
                {__IS_VEILEDER_DEMO__ === false && (
                    <InternalHeader.Button
                        aria-label="Bytt mellom lys og mørk modus"
                        onClick={async (e) => {
                            e.preventDefault();
                            await log(AppHendelse.togglerDarkMode, { mode: !darkMode });
                            setDarkMode(!darkMode);
                        }}>
                        {darkMode ? (
                            <MoonFillIcon aria-label="Mørk modus er aktiv" />
                        ) : (
                            <SunFillIcon aria-label="Lys modus er aktiv" />
                        )}
                    </InternalHeader.Button>
                )}
                {Features.sjekkliste && (
                    <ActionMenu>
                        <ActionMenu.Trigger>
                            <InternalHeader.Button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await log(AppHendelse.viserInformasjon);
                                    openDrawer(<SjekklisteDrawer />, {
                                        title: 'Deltakersjekkliste',
                                        width: DrawerWidth.WIDER,
                                    });
                                }}>
                                <TasklistIcon fontSize="1.5rem" title="Sjekkliste" />
                                Deltakersjekkliste
                            </InternalHeader.Button>
                        </ActionMenu.Trigger>
                    </ActionMenu>
                )}
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <InternalHeader.Button
                            onClick={async (e) => {
                                e.preventDefault();
                                await log(AppHendelse.viserInformasjon);
                                openDrawer(<DrawerArticles />, { width: DrawerWidth.WIDER });
                            }}>
                            <InformationSquareIcon fontSize="1.5rem" title="Informasjonikon" />
                            Hjelpeartikler
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
        </>
    );
};

export default AppHeader;
