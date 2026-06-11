import {
    BodyLong,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    ErrorSummary,
    GuidePanel,
    Heading,
    VStack,
} from '@navikt/ds-react';
import { ReactNode, SubmitEvent, useRef, useState } from 'react';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../i18n';
import { ApplicationPage } from '../application-page/ApplicationPage';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { ExternalLink } from '../../components';
import { getSifLenker } from '../../lenker';

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
    children?: ReactNode;
}

export const StartPage = ({ title, guide, children, onStart, isPending }: Props) => {
    const { text } = useSifSoknadUiIntl();
    const [error, setError] = useState(false);
    const [bekrefter, setBekrefter] = useState(false);
    const summaryRef = useRef<HTMLDivElement>(null);

    const isValid = () => {
        if (!bekrefter) {
            setError(true);
            setTimeout(() => summaryRef.current?.focus(), 100);
            return false;
        }
        setError(false);
        return true;
    };

    const handleSubmit = (event: SubmitEvent) => {
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
                {children && <div>{children}</div>}
                <section aria-label={text('@sifSoknadUi.startPage.form.ariaLabel')}>
                    <form onSubmit={handleSubmit}>
                        <VStack gap="space-24">
                            <BodyLong>
                                <SifSoknadUiText
                                    id="@sifSoknadUi.startPage.disclosure.text"
                                    values={{
                                        Lenke: (children) => (
                                            <ExternalLink href={getSifLenker().navRettOgPlikt}>{children}</ExternalLink>
                                        ),
                                    }}
                                />
                                .
                            </BodyLong>

                            <CheckboxGroup
                                legend={text('@sifSoknadUi.startPage.confirmation.legend')}
                                hideLegend={true}
                                error={error ? text('@sifSoknadUi.startPage.confirmation.error') : undefined}>
                                <Checkbox
                                    id="bekrefter"
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

                            {error && (
                                <div ref={summaryRef} tabIndex={-1}>
                                    <ErrorSummary heading={text('@sifSoknadUi.startPage.errorSummary.heading')}>
                                        <ErrorSummary.Item
                                            href="#bekrefter"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                document.getElementsByName('bekrefter')[0]?.focus();
                                            }}>
                                            {text('@sifSoknadUi.startPage.confirmation.error')}
                                        </ErrorSummary.Item>
                                    </ErrorSummary>
                                </div>
                            )}
                            <div>
                                <Button
                                    type="submit"
                                    loading={isPending}
                                    disabled={isPending}
                                    icon={<ArrowRightIcon role="presentation" />}
                                    iconPosition="right">
                                    <SifSoknadUiText id="@sifSoknadUi.startPage.submitButton" />
                                </Button>
                            </div>
                        </VStack>
                    </form>
                </section>
            </VStack>
        </ApplicationPage>
    );
};
