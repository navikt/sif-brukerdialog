import { Alert, BodyLong, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import BorderBox from '../../atoms/BorderBox';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator, getRequiredFieldValidator, getStringValidator } from '@navikt/sif-validation';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import BekreftSlettAktivDeltakerDialog from '../../components/bekreft-slett-aktiv-deltaker-dialog/BekreftSlettAktivDeltakerDialog';
import { SlettDeltakerÅrsak, SlettDeltakerÅrsakList } from '../../types/SlettDeltakerÅrsaker';
import { useSlettAktivDeltaker } from '../../hooks/useSlettAktivDeltaker';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
    onDeltakelseSlettet: () => void;
}

enum FieldNames {
    årsak = 'årsak',
    bekreftFødselsnummer = 'bekreftFødselsnummer',
    bekreftSletting = 'bekreftSletting',
}

type FormValues = {
    [FieldNames.årsak]: string;
    [FieldNames.bekreftFødselsnummer]: string;
    [FieldNames.bekreftSletting]: boolean;
};

const { Form, FormikWrapper, RadioGroup, TextField, ConfirmationCheckbox } = getTypedFormComponents<
    FieldNames,
    FormValues,
    ValidationError
>();

const SlettAktivDeltakerForm = ({ deltaker, deltakelse, onCancel, onDeltakelseSlettet: onDeltakerSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettAktivDeltaker(deltaker.id);
    const [bekreftSlettInfo, setBekreftSlettInfo] = useState<{ årsak: SlettDeltakerÅrsak } | undefined>();

    const intl = useIntl();

    const doSlettDeltaker = async (årsak: SlettDeltakerÅrsak) => {
        mutate({ deltakerId: deltaker.id, årsak }, { onSuccess: onDeltakerSlettet });
    };

    const siste5SifferFødselsnummer = deltaker.deltakerIdent.slice(-5);
    return (
        <>
            <FormikWrapper
                initialValues={{}}
                onSubmit={(values) => {
                    const årsak = values ? (values[FieldNames.årsak] as SlettDeltakerÅrsak) : undefined;
                    if (årsak) {
                        setBekreftSlettInfo({ årsak });
                    }
                }}
                renderForm={() => {
                    return (
                        <Form
                            onValidSubmit={() => null}
                            includeButtons={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'slettAktivDeltaker.validation')}>
                            <VStack gap="space-16">
                                <Alert variant="info">
                                    <Heading level="2" size="small" spacing>
                                        Hva skjer når du registrerer en deltakelse som slettet?
                                    </Heading>
                                    <VStack gap="space-16">
                                        <BodyLong>
                                            Ungdomsprogramytelsen skal ikke utbetales likevel, og deltakeren får et
                                            vedtaksbrev om dette.
                                        </BodyLong>
                                        <BodyLong>
                                            Hvis deltakeren allerede har fått utbetalt ytelsen, blir det opprettet en
                                            tilbakekrevingssak.
                                        </BodyLong>
                                    </VStack>
                                </Alert>
                                <BorderBox className="p-6 items-center w-full">
                                    <VStack gap="space-16">
                                        <Heading level="2" size="small">
                                            Deltakelse
                                        </Heading>

                                        <Box marginBlock="space-0 space-16">
                                            <dl className="ungDefinitionList">
                                                <dt>Navn:</dt>
                                                <dd>{formatName(deltaker.navn)}</dd>
                                                <dt>Fødselsdato:</dt>
                                                <dd>{dateFormatter.compact(deltaker.fødselsdato)}</dd>
                                                <dt>Fødselsnummer:</dt>
                                                <dd>
                                                    <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={false} />
                                                </dd>
                                                <dt>Startdato:</dt>
                                                <dd>{dateFormatter.compact(deltakelse.fraOgMed)}</dd>
                                                <dt>Sluttdato:</dt>
                                                <dd>
                                                    {deltakelse.tilOgMed
                                                        ? dateFormatter.compact(deltakelse.tilOgMed)
                                                        : '-'}
                                                </dd>
                                            </dl>
                                        </Box>

                                        <RadioGroup
                                            name={FieldNames.årsak}
                                            legend="Hvorfor slettes deltakelsen?"
                                            radios={SlettDeltakerÅrsakList.map((årsak) => ({
                                                value: årsak,
                                                label: <FormattedMessage id={`slettDeltakerÅrsak.${årsak}`} />,
                                            }))}
                                            validate={getRequiredFieldValidator()}
                                        />

                                        <TextField
                                            name={FieldNames.bekreftFødselsnummer}
                                            label="Skriv inn 5 siste siffer i deltakers fødselsnummer for å verifisere deltaker som skal slettes"
                                            autoComplete="off"
                                            size="medium"
                                            maxLength={5}
                                            htmlSize={10}
                                            validate={(value) => {
                                                const stringError = getStringValidator({
                                                    required: true,
                                                    minLength: 5,
                                                    maxLength: 5,
                                                })(value);
                                                if (stringError === undefined) {
                                                    if (value !== siste5SifferFødselsnummer) {
                                                        return 'stringDoesNotMatch';
                                                    }
                                                }
                                                return stringError;
                                            }}
                                        />

                                        <ConfirmationCheckbox
                                            name={FieldNames.bekreftSletting}
                                            label={
                                                <>
                                                    Jeg bekrefter at {formatName(deltaker.navn)} skal registreres som
                                                    slettet deltaker i ungdomsprogrammet.
                                                </>
                                            }
                                            validate={getCheckedValidator()}></ConfirmationCheckbox>

                                        <HStack gap="space-16">
                                            <Button type="submit" variant="primary" loading={isPending}>
                                                Registrer sletting
                                            </Button>
                                            <Button type="button" variant="secondary" onClick={onCancel}>
                                                Avbryt
                                            </Button>
                                        </HStack>
                                        {error ? <ApiErrorAlert error={error} /> : null}
                                    </VStack>
                                </BorderBox>
                            </VStack>
                        </Form>
                    );
                }}
            />
            {bekreftSlettInfo && (
                <BekreftSlettAktivDeltakerDialog
                    deltakerNavn={formatName(deltaker.navn)}
                    onAvbryt={() => setBekreftSlettInfo(undefined)}
                    onBekreft={() => doSlettDeltaker(bekreftSlettInfo.årsak)}
                    open={true}
                />
            )}
        </>
    );
};

export default SlettAktivDeltakerForm;
