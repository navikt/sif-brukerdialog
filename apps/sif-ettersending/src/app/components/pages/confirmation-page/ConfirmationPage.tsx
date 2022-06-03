import { BodyLong, Heading, Ingress, Link } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/components/layout/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core/lib/components/checkmark-icon/CheckmarkIcon';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/utils/intlUtils';
import getLenker from '../../../lenker';
import { ApplicationType } from '../../../types/ApplicationType';
import './confirmationPage.less';

interface Props {
    søknadstype: ApplicationType;
}
ApplicationType;

const bem = bemUtils('confirmationPage');

const ConfirmationPage = ({ søknadstype }: Props) => {
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.kvittering);

    return (
        <Page title={intlHelper(intl, 'page.confirmation.sidetittel')} className={bem.block}>
            <div className={bem.element('centeredContent')}>
                <CheckmarkIcon />
                <Block margin="xl">
                    <Heading level="1" size="large">
                        <FormattedMessage id="page.confirmation.tittel" />
                    </Heading>
                </Block>
            </div>
            <BodyLong as="div">
                <Block margin="xl">
                    {søknadstype === ApplicationType.pleiepengerBarn && (
                        <ul className="checklist">
                            <li>
                                <FormattedMessage id="page.confirmation.check.1.pp" />{' '}
                                <Link href={getLenker().INNSYN_PP} target="_blank">
                                    <FormattedMessage id="page.confirmation.check.1.pp.lenke" />
                                </Link>
                            </li>
                        </ul>
                    )}
                    {søknadstype !== ApplicationType.pleiepengerBarn && (
                        <>
                            <Block padBottom="m">
                                <Ingress>
                                    <FormattedMessage id="page.confirmation.undertittel" />
                                </Ingress>
                            </Block>
                            <ul className="checklist">
                                <li>
                                    <FormattedMessage id="page.confirmation.check.1" />{' '}
                                </li>
                                <li>
                                    <FormattedMessage id="page.confirmation.check.2" />
                                </li>
                                <li>
                                    <FormattedMessage id="page.confirmation.check.3.1" />{' '}
                                    <Link
                                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV"
                                        target="_blank">
                                        <FormattedMessage id="page.confirmation.check.3.2" />
                                    </Link>
                                    .
                                </li>
                            </ul>
                        </>
                    )}
                </Block>
            </BodyLong>
        </Page>
    );
};

export default ConfirmationPage;
