import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { formaterNavn } from '@navikt/ung-common';
import { useVeileder } from '../../context/VeilederContext';
import { InformationSquareIcon, MenuGridIcon, PersonIcon } from '@navikt/aksel-icons';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const { veileder } = useVeileder();

    const navigate = useNavigate();

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">Nav Veileder - Ungdomsytelse</InternalHeader.Title>
            <Spacer />
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
            <InternalHeader.User name={formaterNavn({ ...veileder })} />
        </InternalHeader>
    );
};

export default AppHeader;
