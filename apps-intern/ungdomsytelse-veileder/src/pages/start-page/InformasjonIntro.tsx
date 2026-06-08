import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, InfoCard } from '@navikt/ds-react';

const InformasjonIntro = () => {
    return (
        <InfoCard data-color="info">
            <InfoCard.Header>
                <InfoCard.Title>Hjelpeartikler</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                <BodyLong>
                    Du finner mer informasjon om denne løsningen, ungdomsprogrammet og ungdomsprogramytelsen ved å
                    klikke på{' '}
                    <strong style={{ whiteSpace: 'nowrap' }}>
                        <span>
                            <InformationSquareIcon
                                fontSize="1.6rem"
                                display="inline"
                                className="inline"
                                aria-label="Informasjonikon"
                            />
                        </span>{' '}
                        Hjelpeartikler
                    </strong>{' '}
                    i menyen oppe til høyre.
                </BodyLong>
            </InfoCard.Content>
        </InfoCard>
    );
};

export default InformasjonIntro;
