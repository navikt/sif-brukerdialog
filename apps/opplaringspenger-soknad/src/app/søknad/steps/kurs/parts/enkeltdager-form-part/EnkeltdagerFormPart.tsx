import { FieldArray } from 'formik';
import { DateRange } from '@navikt/sif-common-utils';
import { Heading, VStack } from '@navikt/ds-react';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

export interface EnkeltdagFormValues {
    dato: string;
    timerKurs: number;
    timerReise: number;
}

const EnkeltdagerFormPart = ({ gyldigSøknadsperiode }: Props) => {
    // const { values } = useFormikContext<KursFormValues>();
    // console.log('values', values, gyldigSøknadsperiode);
    return (
        <VStack gap="4">
            <VStack gap="2">
                <Heading level="2" size="xsmall">
                    Hvilke dager søker du opplæringspenger?
                </Heading>
                Du kan få opplæringspenger for dager du er på opplæring, og eventuell reisetid til og fra opplæringen.
            </VStack>
            <FieldArray
                name="kursdager"
                render={() => {
                    return <VStack gap="4">{gyldigSøknadsperiode.from.toDateString()}</VStack>;
                }}
            />
        </VStack>
    );
};

export default EnkeltdagerFormPart;
