import { BodyLong, List } from '@navikt/ds-react';
import { AppText } from '../../i18n';

const VelkommenGuideContent = () => (
    <>
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>

        <BodyLong as="div">
            <p>
                <AppText id="page.velkommen.guide.tekst.1" />
            </p>
            <List>
                <List.Item>
                    <AppText id="page.velkommen.guide.tekst.1.1" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.guide.tekst.1.2" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.guide.tekst.1.3" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.guide.tekst.1.4" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.guide.tekst.1.5" />
                </List.Item>
            </List>
            <p>
                <AppText id="page.velkommen.guide.tekst.2" />
            </p>
        </BodyLong>
    </>
);

export default VelkommenGuideContent;
