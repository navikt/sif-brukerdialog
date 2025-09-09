import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { Office1 } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ArbeidsaktivitetType, Arbeidsgiver } from '@types';
import { AppText } from '../../i18n';
import EndretTag from '../tags/EndretTag';
import NyTag from '../tags/NyTag';
import TagsContainer from '../tags/tags-container/TagsContainer';
import './arbeidsaktivitetBlockHeader.scss';

interface Props {
    navn: string;
    arbeidsgiver?: Arbeidsgiver;
    type: ArbeidsaktivitetType;
    erUkjentAktivitet?: boolean;
    endret?: {
        tekst: string;
    };
}

const ArbeidsaktivitetBlockHeader: React.FunctionComponent<Props> = ({
    type,
    arbeidsgiver,
    navn,
    endret,
    erUkjentAktivitet,
}) => {
    return (
        <Block margin={type !== ArbeidsaktivitetType.arbeidstaker ? 'm' : 'none'}>
            <div className="arbeidsaktivitetBlockHeader">
                <div className="arbeidsaktivitetBlockHeader__icon">
                    <Office1 role="presentation" aria-hidden={true} />
                </div>
                <div className="arbeidsaktivitetBlockHeader__content">
                    <Heading level="2" size="medium">
                        {navn}
                    </Heading>
                    <VStack gap="2">
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
        </Block>
    );
};

export default ArbeidsaktivitetBlockHeader;
