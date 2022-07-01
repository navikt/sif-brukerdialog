import React from 'react';
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
            <ul>
                <li>
                    <Normaltekst>
                        <FormattedMessage id="modal.dinePlikter.part1" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="modal.dinePlikter.part1a" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="modal.dinePlikter.part1b" />
                            </Normaltekst>
                        </li>
                    </ul>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                    <span>
                        <Normaltekst>
                            <FormattedMessage id="modal.dinePlikter.part2a" />{' '}
                            <Lenke href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                <FormattedMessage id="modal.dinePlikter.part2b" />
                            </Lenke>
                        </Normaltekst>
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
