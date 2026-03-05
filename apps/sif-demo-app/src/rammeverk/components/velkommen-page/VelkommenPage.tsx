import { BodyLong, Box, Button, Checkbox, CheckboxGroup, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { ReactNode, useState } from 'react';

import SøknadHeader from '../../../common/components/søknad-header/SøknadHeader';
import { DefaultPage } from '../default-page/DefaultPage';

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
    onStart: () => void;
    /** Innhold under guide */
    children: ReactNode;
}

const SoknadVelkommenPage = ({ title, guide, children, onStart }: Props) => {
    const [error, setError] = useState(false);
    const [bekrefter, setBekrefter] = useState(false);

    const isValid = () => {
        if (!bekrefter) {
            setError(true);
            return false;
        } else {
            setBekrefter(true);
            return true;
        }
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValid()) {
            onStart();
        }
    };

    return (
        <DefaultPage documentTitle={title}>
            <VStack gap="space-32">
                <SøknadHeader title={title} level="1" />
                <GuidePanel poster={true}>
                    <Box paddingBlock="space-8 space-0">
                        <Heading level="2" size="medium" spacing={true}>
                            Hei {guide.navn}
                        </Heading>
                        <BodyLong as="div">{guide.content}</BodyLong>
                    </Box>
                </GuidePanel>
                <VStack gap="space-24">
                    <div>{children}</div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Box paddingBlock="space-0 space-32">
                                <CheckboxGroup
                                    legend="Transportmiddel"
                                    // onChange={handleChange}
                                    error={error ? 'Du må bekrefte før du kan starte søknaden.' : undefined}>
                                    <Checkbox
                                        name="bekrefter"
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
                            <Button type="submit">Start søknad</Button>
                        </div>
                    </form>
                </VStack>
            </VStack>
        </DefaultPage>
    );
};

export default SoknadVelkommenPage;
