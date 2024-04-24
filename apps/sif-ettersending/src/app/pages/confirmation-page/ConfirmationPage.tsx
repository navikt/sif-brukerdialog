import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import getLenker from '../../lenker';
import { Søknadstype } from '../../types/Søknadstype';
import './confirmationPage.css';
import { AppText, useAppIntl } from '../../i18n';

interface Props {
    søknadstype: Søknadstype;
    onUnmount?: () => void;
}
YtelseKey;

const bem = bemUtils('confirmationPage');

const ConfirmationPage = ({ søknadstype, onUnmount }: Props) => {
    const { text } = useAppIntl();

    useLogSidevisning(SIFCommonPageKey.kvittering);

    useEffect(() => {
        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    }, [onUnmount]);

    return (
        <Page title={text('page.confirmation.sidetittel')} className={bem.block}>
            <div className={bem.element('centeredContent')}>
                <div role="presentation" aria-hidden="true">
                    <CheckmarkIcon />
                </div>

                <Block margin="xl">
                    <Heading level="1" size="large" data-testid="søknad-mottatt">
                        <AppText id="page.confirmation.tittel" />
                    </Heading>
                </Block>
            </div>
            <BodyLong as="div">
                <Block margin="xl">
                    {søknadstype === Søknadstype.pleiepengerSyktBarn && (
                        <ul className="checklist">
                            <li>
                                <AppText id="page.confirmation.check.1.pp" />{' '}
                                <Link href={getLenker().INNSYN_PP} target="_blank">
                                    <AppText id="page.confirmation.check.1.pp.lenke" />
                                </Link>
                                {'.'}
                            </li>
                        </ul>
                    )}
                    {søknadstype !== Søknadstype.pleiepengerSyktBarn && (
                        <>
                            <Block padBottom="m">
                                <BodyLong size="large">
                                    <AppText id="page.confirmation.undertittel" />
                                </BodyLong>
                            </Block>
                            <ul className="checklist">
                                <li>
                                    <AppText id="page.confirmation.check.2" />
                                </li>
                                <li>
                                    <AppText
                                        id="page.confirmation.check.3"
                                        values={{
                                            Lenke: (children: React.ReactNode) => (
                                                <Link
                                                    href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV"
                                                    target="_blank">
                                                    {children}
                                                </Link>
                                            ),
                                        }}
                                    />
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
