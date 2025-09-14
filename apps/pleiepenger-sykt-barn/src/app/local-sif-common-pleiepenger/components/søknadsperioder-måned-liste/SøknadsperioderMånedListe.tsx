import { Heading, VStack } from '@navikt/ds-react';
import { FormikInputGroup, ValidationError, ValidationFunction } from '@navikt/sif-common-formik-ds';
import { DateRange, getMonthsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
    periode: DateRange;
    fieldset?: {
        inputGroupFieldName: string;
        legend: React.ReactNode;
        description?: React.ReactNode;
        validate?: ValidationFunction<ValidationError>;
    };
    årstallHeadingLevel?: '2' | '3';
    årstallHeaderRenderer?: (årstall: number) => React.ReactNode;
    månedContentRenderer: (måned: DateRange, søknadsperioderIMåned: DateRange[], index: number) => React.ReactNode;
}

const SøknadsperioderMånedListe = ({
    periode,
    fieldset,
    årstallHeadingLevel = '2',
    årstallHeaderRenderer,
    månedContentRenderer,
}: Props) => {
    const måneder = getMonthsInDateRange(periode);
    const gårOverFlereÅr = periode.from.getFullYear() !== periode.to.getFullYear();

    const visÅrstallHeading = (index: number): boolean => {
        return (
            gårOverFlereÅr &&
            (index === 0 || måneder[index].from.getFullYear() !== måneder[index - 1].from.getFullYear())
        );
    };

    const renderMåned = (måned: DateRange, index: number) => {
        return (
            <div key={dayjs(måned.from).format('MM.YYYY')}>
                {årstallHeaderRenderer && visÅrstallHeading(index) && (
                    <Heading level={årstallHeadingLevel} size="medium" className="yearHeader" spacing={true}>
                        {årstallHeaderRenderer(måned.from.getFullYear())}:
                    </Heading>
                )}
                {månedContentRenderer(måned, måneder, index)}
            </div>
        );
    };

    return fieldset ? (
        <FormikInputGroup
            name={`${fieldset.inputGroupFieldName}` as any}
            legend={fieldset.legend}
            description={fieldset.description}
            validate={fieldset.validate}>
            <VStack gap="4">{måneder.map(renderMåned)}</VStack>
        </FormikInputGroup>
    ) : (
        <VStack gap="4">{måneder.map(renderMåned)}</VStack>
    );
};

export default SøknadsperioderMånedListe;
