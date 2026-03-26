import { BodyLong, Box, Button, Checkbox, CheckboxGroup, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { ReactNode, useState } from 'react';

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
                            Hei {guide.navn}
                        </Heading>
                        <BodyLong as="div">{guide.content}</BodyLong>
                    </Box>
                </GuidePanel>

                <div>{children}</div>
                <section aria-label="Skjema">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Box paddingBlock="space-0 space-32">
                                <CheckboxGroup
                                    legend="Jeg bekrefter at jeg vil svare så riktig som jeg kan"
                                    hideLegend={true}
                                    error={error ? 'Du må bekrefte at du vil svare så riktig som du kan' : undefined}>
                                    <Checkbox
                                        name="bekrefter"
                                        value="bekrefter"
                                        onChange={(evt) => {
                                            setBekrefter(evt.target.checked);
                                            if (evt.target.checked) {
                                                setError(false);
                                            }
                                        }}>
                                        Jeg bekrefter at jeg vil svare så riktig som jeg kan.
                                    </Checkbox>
                                </CheckboxGroup>
                            </Box>
                            <Button type="submit" loading={isPending} disabled={isPending}>
                                Start søknad
                            </Button>
                        </div>
                    </form>
                </section>
            </VStack>
        </ApplicationPage>
    );
};
