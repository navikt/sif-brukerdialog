import './arbeidsaktivitetBlockHeader.scss';

import { AppText } from '@app/i18n';
import { ArbeidsgiverMedAnsettelseperioder, ArbeidsaktivitetType } from '@app/types';
import { Buildings3Icon } from '@navikt/aksel-icons';
import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';

import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import TagsContainer from '../tags/tags-container/TagsContainer';
import AnsettelsesperioderInfo from './AnsettelsesperioderInfo';

interface Props {
    navn: string;
    arbeidsgiver?: ArbeidsgiverMedAnsettelseperioder;
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
                                <Box>
                                    <AppText
                                        id="arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer"
                                        values={{ orgnr: arbeidsgiver.organisasjonsnummer }}
                                    />
                                </Box>
                                <AnsettelsesperioderInfo ansettelsesperioder={arbeidsgiver.ansettelsesperioder} />
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
