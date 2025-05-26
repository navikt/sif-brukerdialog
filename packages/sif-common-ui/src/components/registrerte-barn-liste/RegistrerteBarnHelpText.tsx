import { HelpText } from '@navikt/ds-react';
import { useUiIntl } from '../../i18n/ui.messages';
import { RegistrerteBarnListText as Text } from './i18n/nb';

const RegistrerteBarnHelpText = () => {
    const { text } = useUiIntl();
    return (
        <HelpText title={text('registrerteBarnListe.helpTextTooltip')}>
            <Text id="registrerteBarnListe.kilde" />
        </HelpText>
    );
};

export default RegistrerteBarnHelpText;
