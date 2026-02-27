import './arbeidsaktivitetBlockHeader.scss';

import { AppText } from '@app/i18n';
import { ArbeidsaktivitetType, Arbeidsgiver } from '@app/types';
import { Buildings3Icon } from '@navikt/aksel-icons';
import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import TagsContainer from '../tags/tags-container/TagsContainer';

interface Props {
    navn: string;
    arbeidsgiver?: Arbeidsgiver;
    type: ArbeidsaktivitetType;
    erUkjentAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetBlockHeader = ({ type, arbeidsgiver, navn, endret, erUkjentAktivitet }: Props) => {
    return (
        <Box>
            <div className="arbeidsaktivitetBlockHeader">
                <div className="arbeidsaktivitetBlockHeader__icon">
                    <Buildings3Icon role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidsaktivitetBlockHeader__content">
                    <Heading level="2" size="medium">
                        {navn}
                    </Heading>
                    <VStack gap="space-8">
                        {type === ArbeidsaktivitetType.arbeidstaker && arbeidsgiver !== undefined ? (
                            <BodyLong as="div">
                                <div>
                                    <AppText
                                        id="arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer"
                                        values={{ orgnr: arbeidsgiver.organisasjonsnummer }}
                                    />
                                </div>
                                {arbeidsgiver.ansattFom && (
                                    <AppText
                                        id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom"
                                        values={{ dato: dateFormatter.full(arbeidsgiver.ansattFom) }}
                                    />
                                )}
                                {arbeidsgiver.ansattTom && (
                                    <AppText
                                        id="arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom"
                                        values={{ dato: dateFormatter.full(arbeidsgiver.ansattTom) }}
                                    />
                                )}
                            </BodyLong>
                        ) : undefined}
                        {(endret || erUkjentAktivitet) && (
                            <TagsContainer>
                                {endret && <EndretTag>{endret.tekst}</EndretTag>}
                                {erUkjentAktivitet && (
                                    <NyTag>
                                        <AppText id="arbeidsaktivitetBlockHeader.nyttArbeidsforhold" />
                                    </NyTag>
                                )}
                            </TagsContainer>
                        )}
                    </VStack>
                </div>
            </div>
        </Box>
    );
};

export default ArbeidsaktivitetBlockHeader;
