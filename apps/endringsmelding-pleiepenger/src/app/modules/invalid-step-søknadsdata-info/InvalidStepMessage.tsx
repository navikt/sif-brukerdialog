import { Alert, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppText } from '../../i18n';

interface Props {
    stepTitle: string;
    stepRoute: string;
}

const InvalidStepMessage: React.FunctionComponent<Props> = ({ stepRoute, stepTitle }) => {
    const navigate = useNavigate();
    return (
        <Alert variant="warning">
            <Heading level="2" size="small" spacing={true}>
                <AppText id="invalidStepSøknadsdataInfo.title" />
            </Heading>
            <AppText
                id="invalidStepSøknadsdataInfo.info"
                values={{
                    Lenke: (
                        <q>
                            <Link
                                href="#"
                                onClick={(evt) => {
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                    navigate(stepRoute);
                                }}>
                                {stepTitle}
                            </Link>
                        </q>
                    ),
                }}
            />
        </Alert>
    );
};

export default InvalidStepMessage;
