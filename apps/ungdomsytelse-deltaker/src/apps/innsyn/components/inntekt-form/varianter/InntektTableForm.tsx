import { BodyShort, Table, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { getCheckedValidator, getNumberValidator } from '@navikt/sif-validation';
import { Inntekt } from '@navikt/ung-common';
import { inntektFormComponents } from '../inntektFormUtils';
import { InntektFormFields } from '../types';

interface Props {
    inntekt?: Inntekt;
}

const InntektTableForm = ({ inntekt }: Props) => {
    const { NumberInput, ConfirmationCheckbox } = inntektFormComponents;
    return (
        <VStack gap="6">
            {inntekt ? null : (
                <BodyShort className="mt-2">
                    Fyll ut der hvor du har hatt inntekt i tabellen nedenfor. Har du ikke hatt inntekt denne perioden,
                    kan du skrive 0 eller la feltet stå tomt.
                </BodyShort>
            )}
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col" className="w-3/5">
                            Inntektskilde
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">Inntekt i hele kroner</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.DataCell>
                            <BodyShort id="ansattInntekt">Arbeidstaker/frilanser</BodyShort>
                        </Table.DataCell>
                        <Table.DataCell>
                            <NumberInput
                                name={InntektFormFields.ansattInntekt}
                                label="Inntekt som arbeidstaker eller frilanser"
                                aria-labelledby="inntekt-ansattInntekt"
                                integerValue={true}
                                hideLabel={true}
                                max={999999}
                                min={0}
                                maxLength={6}
                                validate={getNumberValidator({
                                    min: 0,
                                    max: 999999,
                                    required: false,
                                    allowDecimals: false,
                                })}
                            />
                        </Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell>Ytelser fra Nav</Table.DataCell>
                        <Table.DataCell>
                            <NumberInput
                                name={InntektFormFields.ytelseInntekt}
                                label="Ytelser fra Nav"
                                integerValue={true}
                                max={999999}
                                min={0}
                                maxLength={6}
                                hideLabel={true}
                                validate={getNumberValidator({
                                    min: 0,
                                    max: 999999,
                                    required: false,
                                    allowDecimals: false,
                                })}
                            />
                        </Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell className="pt-6 pb-6">
                            <BodyShort weight="semibold">Samlet inntekt</BodyShort>
                        </Table.DataCell>
                        <Table.DataCell className="pt-6 pb-6">
                            <BodyShort weight="semibold">
                                {inntekt ? (
                                    <>
                                        <FormattedNumber value={inntekt.summertInntekt} />
                                        ,-
                                    </>
                                ) : (
                                    '-'
                                )}
                            </BodyShort>
                        </Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>{' '}
            {inntekt ? (
                <ConfirmationCheckbox
                    name={InntektFormFields.bekrefterInntekt}
                    label="Jeg bekrefter at opplysningene er korrekte"
                    validate={getCheckedValidator()}></ConfirmationCheckbox>
            ) : null}
        </VStack>
    );
};

export default InntektTableForm;
