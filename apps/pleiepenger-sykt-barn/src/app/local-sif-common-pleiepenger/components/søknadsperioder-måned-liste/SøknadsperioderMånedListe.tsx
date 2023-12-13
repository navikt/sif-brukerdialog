import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError, ValidationFunction } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { DateRange, getMonthsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

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

const SøknadsperioderMånedListe: React.FunctionComponent<Props> = ({
    periode,
    fieldset,
    årstallHeadingLevel = '2',
    årstallHeaderRenderer,
    månedContentRenderer,
}) => {
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
            <FormBlock margin="none" paddingBottom="m" key={dayjs(måned.from).format('MM.YYYY')}>
                {årstallHeaderRenderer && visÅrstallHeading(index) && (
                    <Block margin="l" padBottom="m">
                        <Heading level={årstallHeadingLevel} size="medium" className={'yearHeader'}>
                            {årstallHeaderRenderer(måned.from.getFullYear())}:
                        </Heading>
                    </Block>
                )}
                {månedContentRenderer(måned, måneder, index)}
            </FormBlock>
        );
    };

    return fieldset ? (
        <FormikInputGroup
            name={`${fieldset.inputGroupFieldName}` as any}
            legend={fieldset.legend}
            description={fieldset.description}
            validate={fieldset.validate}>
            {måneder.map(renderMåned)}
        </FormikInputGroup>
    ) : (
        <>{måneder.map(renderMåned)}</>
    );
};

export default SøknadsperioderMånedListe;
