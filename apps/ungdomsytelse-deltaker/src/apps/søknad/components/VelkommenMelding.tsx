import { BodyLong, Box, GuidePanel, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../utils/lenker';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import ExternalLink from './external-link/ExternalLink';

interface Props {
    fornavn: string;
    startdato: Date;
}

const VelkommenMelding = ({ fornavn, startdato }: Props) => {
    const { text } = useAppIntl();
    return (
        <GuidePanel poster={true}>
            <Box paddingBlock="4 0">
                <Heading level="1" size="medium" spacing={true}>
                    <AppText id="velkommenMelding.hei" values={{ fornavn }} />
                </Heading>
                <VStack gap="4">
                    <BodyLong>
                        <AppText
                            id="velkommenMelding.deltakelsePeriode"
                            values={{
                                startdato: dateFormatter.dayDateMonthYear(startdato),
                                strong: (children) => <strong>{children}</strong>,
                            }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <AppText id="velkommenMelding.ytelseBeskrivelse" />
                    </BodyLong>
                    <BodyLong>
                        <AppText
                            id="velkommenMelding.søknadBeskrivelse"
                            values={{
                                Lenke: (children) => (
                                    <ExternalLink href={getLenker().omUngdomsprogramytelsen}>{children}</ExternalLink>
                                ),
                            }}
                        />
                    </BodyLong>
                    <VStack gap="0">
                        <ReadMore header={text('velkommenMelding.readMore.dato.header')}>
                            <BodyLong spacing>
                                <AppText id="velkommenMelding.readMore.dato.content" />
                            </BodyLong>
                        </ReadMore>
                        <ReadMore header={text('personopplysninger.accordion.header')}>
                            <BehandlingAvPersonopplysningerContent />
                        </ReadMore>
                        <ReadMore header="Rettsregler og automatisk behandling">
                            <BodyLong spacing>
                                Når Nav behandler søknaden din og vurderer om du har rett til å motta penger når du er
                                med i ungdomsprogrammet, så er det disse rettsreglene som gjelder: Arbeidsmarkedsloven
                                §§ 12 tredje ledd og 13 fjerde ledd og forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse § 8 jf. §§ 1 til 4 og §§ 6 til 12.
                            </BodyLong>
                            <BodyLong spacing>
                                Etter at du har sendt inn søknaden blir det gjennomført en automatisk behandling, og som
                                hovedregel mottas et digitalt vedtaksbrev innen noen minutter. Siden behandlingen er
                                rask, sikres det også at du får penger til rett tid.
                            </BodyLong>
                            <BodyLong spacing>
                                Dersom du ønsker å motsette deg automatisk behandling, så må du ikke sende inn denne
                                søknaden. Da må du ta kontakt med din veileder for å informere om dette.
                            </BodyLong>
                        </ReadMore>
                    </VStack>
                </VStack>
            </Box>
        </GuidePanel>
    );
};

export default VelkommenMelding;
