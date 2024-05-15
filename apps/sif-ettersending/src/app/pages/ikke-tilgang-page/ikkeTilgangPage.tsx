import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import { Søknadstype } from '../../types/Søknadstype';

interface Props {
    søknadstype: Søknadstype;
}

const IkkeTilgangPage = ({ søknadstype }: Props) => {
    const { text } = useAppIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);

    return (
        <Page
            className="ikkeTilgangPage"
            title={text(`application.title.${søknadstype}`)}
            topContentRenderer={() => <SoknadHeader title={text(`application.title.${søknadstype}`)} />}>
            <Block margin="xxl">
                <SifGuidePanel poster={true}>
                    <p>
                        <AppText id="page.ikkeTilgang.tekst" />
                    </p>
                </SifGuidePanel>
            </Block>
        </Page>
    );
};

export default IkkeTilgangPage;
