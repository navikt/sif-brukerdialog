import { Box, ExpansionCard, Page, Tabs } from '@navikt/ds-react';
import { Arbeidsgivere, RegistrertBarn, Søker } from '@navikt/sif-common';
import ArbeidsgiverInfo from '@navikt/sif-common/src/api/dev-info-components/ArbeidsgiverInfo';
import BarnInfo from '@navikt/sif-common/src/api/dev-info-components/BarnInfo';
import SøkerInfo from '@navikt/sif-common/src/api/dev-info-components/SøkerInfo';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    arbeidsgivere?: Arbeidsgivere;
}
const ApiInfo = ({ søker, barn, arbeidsgivere }: Props) => {
    return (
        <Page.Block gutters width="2xl">
            <Box marginBlock="8">
                <ExpansionCard aria-label="Api data" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>API oppslagsdata</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <Box paddingBlock={'8 0'}>
                            <Tabs defaultValue="søker">
                                <Tabs.List>
                                    <Tabs.Tab value="søker" label="Søker" />
                                    <Tabs.Tab value="barn" label="Barn" />
                                    {arbeidsgivere ? <Tabs.Tab value="arbeidsgivere" label="Arbeidsgivere" /> : null}
                                </Tabs.List>
                                <Tabs.Panel value="søker">
                                    <Box paddingBlock="4">
                                        <SøkerInfo søker={søker} />
                                    </Box>
                                </Tabs.Panel>
                                <Tabs.Panel value="barn">
                                    <Box paddingBlock="4">
                                        <BarnInfo barn={barn} />
                                    </Box>
                                </Tabs.Panel>
                                {arbeidsgivere ? (
                                    <Tabs.Panel value="arbeidsgivere">
                                        <Box paddingBlock="4">
                                            <ArbeidsgiverInfo arbeidsgivere={arbeidsgivere} />
                                        </Box>
                                    </Tabs.Panel>
                                ) : null}
                            </Tabs>
                        </Box>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </Box>
        </Page.Block>
    );
};

export default ApiInfo;
