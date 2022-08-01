import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import bemUtils from '../../utils/bemUtils';
import ActionLink from '../action-link/ActionLink';
import AvbrytSoknadDialog from '../dialogs/avbrytSøknadDialog/AvbrytSøknadDialog';
import FortsettSoknadSenereDialog from '../dialogs/fortsettSøknadSenereDialog/FortsettSøknadSenereDialog';
import './stepFooter.scss';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) {
    const [visAvbrytDialog, setVisAvbrytDialog] = React.useState<boolean>(false);
    const [visFortsettSenereDialog, setVisFortsettSenereDialog] = React.useState<boolean>(false);

    const bem = bemUtils('stepFooter');
    return (
        <BodyLong as="div">
            <div className={bem.block}>
                <div className={bem.element('divider')} />
                <div className={bem.element('links')}>
                    {onAvbrytOgFortsettSenere && (
                        <ActionLink onClick={() => setVisFortsettSenereDialog(true)}>
                            <FormattedMessage id="steg.footer.fortsettSenere" />
                        </ActionLink>
                    )}
                    {onAvbrytOgFortsettSenere && onAvbrytOgSlett && (
                        <span className={bem.element('dot')} aria-hidden={true} />
                    )}
                    {onAvbrytOgSlett && (
                        <ActionLink
                            className={bem.element('avbrytSoknadLenke')}
                            onClick={() => setVisAvbrytDialog(true)}>
                            <FormattedMessage id="steg.footer.avbryt" />
                        </ActionLink>
                    )}
                </div>
            </div>
            {onAvbrytOgFortsettSenere && (
                <FortsettSoknadSenereDialog
                    synlig={visFortsettSenereDialog}
                    onFortsettSøknadSenere={onAvbrytOgFortsettSenere}
                    onFortsettSøknad={() => setVisFortsettSenereDialog(false)}
                />
            )}
            {onAvbrytOgSlett && (
                <AvbrytSoknadDialog
                    synlig={visAvbrytDialog}
                    onAvbrytSøknad={onAvbrytOgSlett}
                    onFortsettSøknad={() => setVisAvbrytDialog(false)}
                />
            )}
        </BodyLong>
    );
}

export default StepFooter;
