import { Heading, HGrid, VStack } from '@navikt/ds-react';
import React from 'react';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';
import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { Dialog } from '@navikt/ds-icons';
import PageBleedBox from '../page-bleed-box/PageBleedBox';

interface Props {
    title?: string;
}

const Snarveier: React.FunctionComponent<Props> = ({ title }) => {
    return (
        <PageBleedBox>
            <section>
                <VStack gap="4">
                    {title ? (
                        <Heading level="2" size="medium" className="text-deepblue-800">
                            {title}
                        </Heading>
                    ) : null}

                    <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                        <SnarveiLinkPanel
                            href={'#'}
                            icon={
                                <QuestionmarkIcon
                                    role="presentation"
                                    aria-hidden={true}
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            }
                            title={'Spørsmål og svar'}
                            description={'De vanligste spørsmålene om ungdomsytelsen'}
                        />
                        <SnarveiLinkPanel
                            href={'#'}
                            icon={<Dialog role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                            title={'Kontakt oss'}
                            description={'Hvis du lurer på noe om saken din kan du kontakte oss her?'}
                        />
                    </HGrid>
                </VStack>
            </section>
        </PageBleedBox>
    );
};

export default Snarveier;
