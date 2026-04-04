import { BodyLong, Box, Button, Checkbox, CheckboxGroup, GuidePanel, Heading, Link, VStack } from '@navikt/ds-react';
import { ReactNode, useState } from 'react';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../i18n';
import { ApplicationPage } from '../application-page/ApplicationPage';

interface Props {
    /** Tittel på søknad/app */
    title: string;
    /** Intro-guide */
    guide: {
        /** Søkers navn */
        navn: string;
        /** Innhold i guide */
        content: ReactNode;
    };
    isPending: boolean;
    onStart: (bekrefterVilkår: true) => void;
    /** Innhold mellom guide og skjema */
    children: ReactNode;
}

export const StartPage = ({ title, guide, children, onStart, isPending }: Props) => {
    const { text } = useSifSoknadUiIntl();
    const [error, setError] = useState(false);
    const [bekrefter, setBekrefter] = useState(false);

    const isValid = () => {
        if (!bekrefter) {
            setError(true);
            return false;
        }
        setError(false);
        return true;
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValid()) {
            onStart(true);
        }
    };

    return (
        <ApplicationPage applicationTitle={title} headerLevel="1">
            <VStack gap="space-32">
                <GuidePanel poster={true}>
                    <Box paddingBlock="space-8 space-0">
                        <Heading level="2" size="medium" spacing={true}>
                            <SifSoknadUiText id="@sifSoknadUi.startPage.guide.greeting" values={{ navn: guide.navn }} />
                        </Heading>
                        <BodyLong as="div">{guide.content}</BodyLong>
                    </Box>
                </GuidePanel>

                <div>{children}</div>
                <section aria-label={text('@sifSoknadUi.startPage.form.ariaLabel')}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <BodyLong spacing>
                                <SifSoknadUiText id="@sifSoknadUi.startPage.disclosure.text" />{' '}
                                <Link href="https://www.nav.no/endringer">
                                    <SifSoknadUiText id="@sifSoknadUi.startPage.disclosure.linkText" />
                                </Link>
                                .
                            </BodyLong>
                            <Box paddingBlock="space-0 space-32">
                                <CheckboxGroup
                                    legend={text('@sifSoknadUi.startPage.confirmation.legend')}
                                    hideLegend={true}
                                    error={error ? text('@sifSoknadUi.startPage.confirmation.error') : undefined}>
                                    <Checkbox
                                        name="bekrefter"
                                        value="bekrefter"
                                        onChange={(evt) => {
                                            setBekrefter(evt.target.checked);
                                            if (evt.target.checked) {
                                                setError(false);
                                            }
                                        }}>
                                        <SifSoknadUiText id="@sifSoknadUi.startPage.confirmation.checkboxLabel" />
                                    </Checkbox>
                                </CheckboxGroup>
                            </Box>
                            <Button type="submit" loading={isPending} disabled={isPending}>
                                <SifSoknadUiText id="@sifSoknadUi.startPage.submitButton" />
                            </Button>
                        </div>
                    </form>
                </section>
            </VStack>
        </ApplicationPage>
    );
};
