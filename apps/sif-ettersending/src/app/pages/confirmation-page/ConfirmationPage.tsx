import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { Søknadstype } from '../../types/Søknadstype';
import './confirmationPage.css';

interface Props {
    søknadstype: Søknadstype;
    dokumenttype?: DokumentType;
    onUnmount?: () => void;
}
YtelseKey;

const bem = bemUtils('confirmationPage');

const ConfirmationPage = ({ søknadstype, dokumenttype, onUnmount }: Props) => {
    const { text } = useAppIntl();

    useLogSidevisning(SIFCommonPageKey.kvittering);

    useEffect(() => {
        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    }, [onUnmount]);

    const erLegeerklæringPSB =
        søknadstype === Søknadstype.pleiepengerSyktBarn && dokumenttype === DokumentType.legeerklæring;

    return (
        <Page
            title={text(
                erLegeerklæringPSB
                    ? 'page.confirmation.psb.legeerklæring.sidetittel'
                    : 'page.confirmation.generell.sidetittel',
            )}
            className={bem.block}>
            <div className={bem.element('centeredContent')}>
                <div role="presentation" aria-hidden="true">
                    <CheckmarkIcon />
                </div>
                <Block margin="xl">
                    <Heading level="1" size="large" data-testid="søknad-mottatt">
                        <AppText
                            id={
                                erLegeerklæringPSB
                                    ? 'page.confirmation.psb.legeerklæring.tittel'
                                    : 'page.confirmation.generell.tittel'
                            }
                        />
                    </Heading>
                </Block>
            </div>
            <BodyLong as="div">
                <Block margin="xl">
                    <ul className="checklist">
                        <li>
                            <AppText
                                id={
                                    erLegeerklæringPSB
                                        ? 'page.confirmation.psb.legeerklæring.info'
                                        : 'page.confirmation.generell.info'
                                }
                                values={{
                                    Lenke: (children) => (
                                        <Link href={getLenker().INNSYN_PP} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </li>
                    </ul>
                </Block>
            </BodyLong>
        </Page>
    );
};

export default ConfirmationPage;
