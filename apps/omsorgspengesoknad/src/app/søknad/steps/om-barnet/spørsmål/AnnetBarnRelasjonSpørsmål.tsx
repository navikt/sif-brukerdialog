import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText, useAppIntl } from '../../../../i18n';
import { SøkersRelasjonTilBarnet } from '../../../../types/SøkersRelasjonTilBarnet';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { omBarnetFormComponents } from '../omBarnetFormComponents';

const { Select } = omBarnetFormComponents;

const AnnetBarnRelasjonSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <Select
            style={{ maxWidth: '25rem' }}
            label={text('steg.omBarnet.spm.relasjon.label')}
            name={OmBarnetFormFields.søkersRelasjonTilBarnet}
            validate={getRequiredFieldValidator()}>
            <option />
            <option value={SøkersRelasjonTilBarnet.MOR}>
                <AppText id="steg.omBarnet.relasjonTilBarnet.mor" />
            </option>
            <option value={SøkersRelasjonTilBarnet.FAR}>
                <AppText id="steg.omBarnet.relasjonTilBarnet.far" />
            </option>
            <option value={SøkersRelasjonTilBarnet.ADOPTIVFORELDER}>
                <AppText id="steg.omBarnet.relasjonTilBarnet.adoptivforelder" />
            </option>
            <option value={SøkersRelasjonTilBarnet.FOSTERFORELDER}>
                <AppText id="steg.omBarnet.relasjonTilBarnet.fosterforelder" />
            </option>
        </Select>
    );
};

export default AnnetBarnRelasjonSpørsmål;
