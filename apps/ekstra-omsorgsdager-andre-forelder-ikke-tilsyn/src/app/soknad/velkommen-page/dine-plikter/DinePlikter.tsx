import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from '@navikt/ds-react';
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
                            <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                <FormattedMessage id="modal.dinePlikter.part2b" />
                            </Link>
                        </Normaltekst>
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
