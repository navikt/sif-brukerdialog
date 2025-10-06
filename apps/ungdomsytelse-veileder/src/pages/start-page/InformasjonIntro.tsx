import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong } from '@navikt/ds-react';

const InformasjonIntro = () => {
    return (
        <Alert variant="info" className="w-full">
            <BodyLong>
                Du finner mer informasjon om denne løsningen, ungdomsprogrammet og ungdomsprogramytelsen ved å klikke på{' '}
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
        </Alert>
    );
};

export default InformasjonIntro;
