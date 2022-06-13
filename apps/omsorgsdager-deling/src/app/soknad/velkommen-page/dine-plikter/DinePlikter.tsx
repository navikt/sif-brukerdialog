import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';

const DinePlikterContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Systemtittel>
                <FormattedMessage id="modal.dinePlikter.tittel" />
            </Systemtittel>
            <Normaltekst>
                <ul>
                    <li>
                        <FormattedMessage id="modal.dinePlikter.part1" />
                        <ul>
                            <li>
                                <FormattedMessage id="modal.dinePlikter.part1a" />
                            </li>
                            <li>
                                <FormattedMessage id="modal.dinePlikter.part1b" />
                            </li>
                        </ul>
                    </li>
                    <li style={{ marginTop: '0.5rem' }}>
                        <span>
                            <FormattedMessage id="modal.dinePlikter.part2a" />{' '}
                            <Lenke href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                <FormattedMessage id="modal.dinePlikter.part2b" />
                            </Lenke>
                        </span>
                    </li>
                </ul>
            </Normaltekst>
        </>
    );
};

export default DinePlikterContent;
