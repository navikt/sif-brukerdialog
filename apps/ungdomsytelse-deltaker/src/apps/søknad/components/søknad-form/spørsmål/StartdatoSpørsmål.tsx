import { Alert, Heading, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { SøknadFormFields } from '../SøknadForm';
import { søknadFormComponents } from '../TypedSøknadFormComponents';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

interface Props {
    startdato: Date;
    startdatoStemmerIkke: boolean;
    disabled?: boolean;
}

const { YesOrNoQuestion } = søknadFormComponents;

const StartdatoSpørsmål = ({ startdato, startdatoStemmerIkke, disabled }: Props) => {
    const erFortid = dayjs(startdato).isBefore(dayjs());
    return (
        <VStack gap="4">
            <Heading level="3" size="medium">
                Oppstartsdato i ungdomsprogrammet
            </Heading>
            <YesOrNoQuestion
                disabled={disabled}
                legend={`Stemmer det at din oppstartsdato  i ungdomsprogrammet ${erFortid ? 'var' : 'er'} ${dateFormatter.full(startdato)}?`}
                name={SøknadFormFields.startdatoErRiktig}
                validate={getYesOrNoValidator()}
                labels={{ no: 'Nei det stemmer ikke' }}
            />
            {startdatoStemmerIkke ? (
                <Alert variant="info">
                    Hvis oppstartsdatoen ikke stemmer, må du ta kontakt med veileder for å rette opp i denne datoen, før
                    du kan sende inn søknad om ungdomsytelsen.
                </Alert>
            ) : null}
        </VStack>
    );
};

export default StartdatoSpørsmål;
