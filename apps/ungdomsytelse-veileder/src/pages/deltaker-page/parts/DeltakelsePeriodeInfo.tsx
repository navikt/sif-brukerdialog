import { BodyShort, Button, Heading, HGrid, VStack } from '@navikt/ds-react';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import { getTillattEndringsperiode, kanEndreStartdato } from '../../../utils/deltakelseUtils';
import DatoBoks from './DatoBoks';
import { Deltaker } from '../../../types/Deltaker';
import { Deltakelse } from '../../../types/Deltakelse';
import InfoBox from '../../../atoms/InfoBox';
import { PencilFillIcon } from '@navikt/aksel-icons';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelsePeriodeInfo = ({ deltakelse, deltaker }: Props) => {
    const [formVariant, setFormVariant] = useState<EndrePeriodeVariant | undefined>(undefined);
    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse | null>();

    const handleOnClose = () => {
        setFormVariant(undefined);
        setEndretDeltakelse(undefined);
    };

    const handleOnDeltakelseChanged = (d: Deltakelse) => {
        setEndretDeltakelse(d);
    };

    const tillattEndringsperiode = getTillattEndringsperiode(getDateToday());

    return (
        <>
            <VStack gap="3">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <DatoBoks
                        tittel="Startdato:"
                        dato={deltakelse.fraOgMed}
                        endre={
                            kanEndreStartdato(deltakelse, tillattEndringsperiode)
                                ? {
                                      label: 'Endre startdato',
                                      onClick: () => {
                                          setEndretDeltakelse(undefined);
                                          setFormVariant(EndrePeriodeVariant.startdato);
                                      },
                                  }
                                : undefined
                        }
                        kanIkkeEndreTekst="Startdato kan ikke endres"
                    />
                    {deltakelse.tilOgMed ? (
                        <InfoBox>
                            <VStack gap="6">
                                <div>
                                    <Heading level="3" size="xsmall" spacing>
                                        <BodyShort as="span">Sluttdato:</BodyShort>
                                    </Heading>
                                    <BodyShort size="large" weight="semibold" className="text-2xl capitalize">
                                        {dateFormatter.dayCompactDate(deltakelse.tilOgMed)}
                                    </BodyShort>
                                </div>

                                <div>
                                    {kanEndreStartdato(deltakelse, tillattEndringsperiode) ? (
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            icon={<PencilFillIcon aria-hidden="true" />}
                                            onClick={() => {
                                                setEndretDeltakelse(undefined);
                                                setFormVariant(EndrePeriodeVariant.endreSluttdato);
                                            }}>
                                            Endre sluttdato
                                        </Button>
                                    ) : (
                                        <>Sluttdato kan ikke endres</>
                                    )}
                                </div>
                            </VStack>
                        </InfoBox>
                    ) : (
                        <InfoBox>
                            <VStack gap="6">
                                <VStack gap="2">
                                    <BodyShort size="large" weight="semibold" className="text-2xl">
                                        Er deltaker meldt ut av ungdomsprogrammet?
                                    </BodyShort>
                                    <BodyShort>
                                        Når deltaker er meldt ut av ungdomsprogrammet før alle dagene i programmet er
                                        brukt opp, må sluttdatoen registreres her.
                                    </BodyShort>
                                </VStack>
                                <div>
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        icon={<PencilFillIcon aria-hidden="true" />}
                                        onClick={() => {
                                            setEndretDeltakelse(undefined);
                                            setFormVariant(EndrePeriodeVariant.meldUtDeltaker);
                                        }}>
                                        Registrer sluttdato
                                    </Button>
                                </div>
                            </VStack>
                        </InfoBox>
                    )}
                </HGrid>
            </VStack>
            {formVariant ? (
                <EndrePeriodeModal
                    onClose={handleOnClose}
                    variant={formVariant}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onDeltakelseChanged={handleOnDeltakelseChanged}
                    deltakelseChanged={endretDeltakelse !== undefined}
                />
            ) : null}
        </>
    );
};

export default DeltakelsePeriodeInfo;
