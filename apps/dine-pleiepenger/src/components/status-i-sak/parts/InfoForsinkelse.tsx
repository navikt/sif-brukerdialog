import { Alert } from '@navikt/ds-react';

const InfoForsinkelse = () => {
    return (
        <Alert size="small" variant="info" inline={true}>
            <span className="text-gray-800">
                Det kan ta opptil 15 minutter før en ny søknad, melding om endring eller ettersendt legeerklæring vises
                her
            </span>
        </Alert>
    );
};

export default InfoForsinkelse;
