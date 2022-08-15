import { Alert, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';

interface Props {
    showAlertstripe?: boolean;
}

const plain = false;

const OmSkjemaet: React.FunctionComponent<Props> = ({ showAlertstripe = false }) => (
    <>
        {/* <Element tag="h2">Kort om skjemaet</Element> */}
        {plain && (
            <>
                Dette skjemaet består av fem sider og har rundt 20 spørsmål til sammen, avhengig av hva du svarer.
                <p>
                    Vi tar vare på informasjonen mens du fyller ut, slik at du kan komme tilbake å fortsette senere
                    dersom du må ta en pause. Dersom du ikke har sendt inn skjemaet innen 24 timer, slettes denne
                    informasjonen og du må da fylle ut alt på nytt.
                </p>
            </>
        )}
        {plain === false && (
            <>
                {showAlertstripe && (
                    <Block margin="xl">
                        <Alert variant="info" size="small">
                            <Heading level="2" size="xsmall">
                                Kort om skjemaet
                            </Heading>
                            Dette skjemaet består av fem sider og har rundt 20 spørsmål til sammen, avhengig av hva du
                            svarer.
                            <p>
                                Vi tar vare på informasjonen mens du fyller ut, slik at du kan komme tilbake å fortsette
                                senere dersom du må ta en pause. Dersom du ikke har sendt inn skjemaet innen 24 timer,
                                slettes denne informasjonen og du må da fylle ut alt på nytt.
                            </p>
                        </Alert>
                    </Block>
                )}
                {!showAlertstripe && (
                    <Block margin="l">
                        <ExpandableInfo title={'Kort om skjemaet'}>
                            Dette skjemaet består av fem sider og har rundt 20 spørsmål til sammen, avhengig av hva du
                            svarer.
                            <p>
                                Vi tar vare på informasjonen underveis, slik at du kan komme tilbake å fortsette senere
                                dersom du må ta en pause. Dersom du ikke har sendt inn skjemaet innen 24 timer, slettes
                                denne informasjonen og du må da fylle ut alt på nytt.
                            </p>
                        </ExpandableInfo>
                    </Block>
                )}
            </>
        )}
    </>
);

export default OmSkjemaet;
