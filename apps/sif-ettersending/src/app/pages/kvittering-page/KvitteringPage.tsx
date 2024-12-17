import { Link } from '@navikt/ds-react';
import { Checklist } from '@navikt/sif-common-core-ds/src';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { Søknadstype } from '../../types/Søknadstype';

interface Props {
    søknadstype: Søknadstype;
    dokumenttype?: DokumentType;
}

const KvitteringPage = ({ søknadstype, dokumenttype }: Props) => {
    const { text } = useAppIntl();

    const erLegeerklæringPSB =
        søknadstype === Søknadstype.pleiepengerSyktBarn && dokumenttype === DokumentType.legeerklæring;

    return (
        <Page
            title={text(
                erLegeerklæringPSB
                    ? 'page.confirmation.psb.legeerklæring.sidetittel'
                    : 'page.confirmation.generell.sidetittel',
            )}>
            <Kvittering
                tittel={text(
                    erLegeerklæringPSB
                        ? 'page.confirmation.psb.legeerklæring.tittel'
                        : 'page.confirmation.generell.tittel',
                )}>
                <Checklist>
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
                </Checklist>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
