import { Box, ReadMore } from '@navikt/ds-react';
import { getStringValidator } from '@navikt/sif-validation';

import { Institusjon } from '../../../../api/institusjonService';
import { AppText, useAppIntl } from '../../../../i18n';
import { KursFormComponents, KursFormFields } from '../KursStepForm';

interface Props {
    initialValue?: string;
    institusjoner: Institusjon[];
}

const OpplæringsinstitusjonQuestion = ({ institusjoner, initialValue }: Props) => {
    const { text } = useAppIntl();
    const institusjonsnavn = institusjoner.map((institusjon) => institusjon.navn);

    return (
        <KursFormComponents.Combobox
            name={KursFormFields.opplæringsinstitusjon}
            allowNewValues={true}
            label={text('steg.kurs.opplæringsinstitusjon.label')}
            options={institusjonsnavn}
            shouldAutocomplete={false}
            maxLength={90}
            minLength={2}
            isMultiSelect={false}
            initialValue={initialValue}
            validate={getStringValidator({
                required: true,
                minLength: 2,
                maxLength: 100,
            })}
            description={
                <ReadMore header={text('steg.kurs.opplæringsinstitusjon.readMore.header')}>
                    <Box marginBlock="space-0 space-16">
                        <AppText id="steg.kurs.opplæringsinstitusjon.readMore.content" />
                    </Box>
                </ReadMore>
            }
        />
    );
};

export default OpplæringsinstitusjonQuestion;
