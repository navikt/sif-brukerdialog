import { BodyLong, Box, GuidePanel, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../utils/lenker';
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
                            <AppText id="velkommenMelding.readMore.dato.content" />
                        </ReadMore>
                        <ReadMore header={text('personopplysninger.accordion.header')}>
                            <BehandlingAvPersonopplysningerContent />
                        </ReadMore>
                        <ReadMore header="Disse reglene gjelder for ungdomsprogramytelsen">
                            Informasjon om at søknad behandles automatisk, litt om de konkrete reglene, men info om at
                            hvis en motsetter seg dette må en ta kontakt med veileder.
                        </ReadMore>
                    </VStack>
                </VStack>
            </Box>
        </GuidePanel>
    );
};

export default VelkommenMelding;
