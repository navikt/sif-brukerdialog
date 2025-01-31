import { BodyShort, Table } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { Inntekt } from '../../../../../api/types';
import { inntektFormComponents } from '../inntektFormUtils';
import { InntektFormFields } from '../types';

interface Props {
    inntekt: Inntekt;
}

const InntektTableForm = ({ inntekt }: Props) => {
    const { NumberInput } = inntektFormComponents;
    return (
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
                                required: true,
                                allowDecimals: false,
                            })}
                        />
                    </Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>Selvstendig næringsdrivende</Table.DataCell>
                    <Table.DataCell>
                        <NumberInput
                            name={InntektFormFields.snInntekt}
                            label="Inntekt som selvstendig næringsdrivende"
                            integerValue={true}
                            hideLabel={true}
                            max={999999}
                            min={0}
                            maxLength={6}
                            validate={getNumberValidator({
                                min: 0,
                                max: 999999,
                                required: true,
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
                                required: true,
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
                                    <FormattedNumber value={inntekt.summertInntekt} />{' '}
                                </>
                            ) : (
                                '-'
                            )}
                        </BodyShort>
                    </Table.DataCell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default InntektTableForm;
