import React from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { FormikInputGroup } from '@navikt/sif-common-formik/lib';
import { ValidationError, ValidationFunction } from '@navikt/sif-common-formik/lib/validation/types';
import { getMonthsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    periode: DateRange;
    fieldset?: {
        inputGroupFieldName: string;
        legend: React.ReactNode;
        description?: React.ReactNode;
        validate?: ValidationFunction<ValidationError>;
    };
    årstallHeadingLevel?: number;
    årstallHeaderRenderer?: (årstall: number) => React.ReactNode;
    månedContentRenderer: (måned: DateRange, søknadsperioderIMåned: DateRange[], index: number) => React.ReactNode;
}

const SøknadsperioderMånedListe: React.FunctionComponent<Props> = ({
    periode,
    fieldset,
    årstallHeadingLevel = 2,
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
                    <Box margin="l" padBottom="m">
                        <Undertittel tag={`h${årstallHeadingLevel}`} className={'yearHeader'}>
                            {årstallHeaderRenderer(måned.from.getFullYear())}:
                        </Undertittel>
                    </Box>
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
            tag="div"
            validate={fieldset.validate}>
            {måneder.map(renderMåned)}
        </FormikInputGroup>
    ) : (
        <>{måneder.map(renderMåned)}</>
    );
};

export default SøknadsperioderMånedListe;
