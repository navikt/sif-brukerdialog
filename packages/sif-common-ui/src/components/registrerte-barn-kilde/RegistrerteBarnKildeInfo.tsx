import { HelpText } from '@navikt/ds-react';

import { UiText, useUiIntl } from '../../i18n/ui.messages';

const RegistrerteBarnKildeInfo = () => {
    const { text } = useUiIntl();
    return (
        <HelpText title={text('registrerteBarnKildeInfo.helpTextTooltip')}>
            <UiText id="registrerteBarnKildeInfo.kilde" />
        </HelpText>
    );
};

export default RegistrerteBarnKildeInfo;
