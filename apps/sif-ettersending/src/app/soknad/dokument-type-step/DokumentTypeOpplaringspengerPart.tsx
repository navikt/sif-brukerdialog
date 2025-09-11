import { Link, List } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';

interface Props {
    dokumentType?: DokumentType;
}

const DokumentTypeOpplaringspengerPart = ({ dokumentType }: Props) => {
    const { text } = useAppIntl();
    return (
        <>
            <FormLayout.Guide>
                <AppText id="step.dokumentType.info" />
                <List>
                    <List.Item>
                        <AppText id="step.dokumentType.info.1" />
                    </List.Item>
                    <List.Item>
                        <AppText
                            id="step.dokumentType.info.3"
                            values={{
                                Lenke: (children: ReactNode) => (
                                    <Link href={getLenker().skrivTilOss} target="_blank">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </List.Item>
                </List>
            </FormLayout.Guide>

            <SoknadFormComponents.RadioGroup
                legend={text('step.dokumentType.dokumentType.spm')}
                name={SoknadFormField.dokumentType}
                radios={Object.values(DokumentType).map((type) => ({
                    label: text(`step.dokumentType.dokumentType.${type}`),
                    value: type,
                }))}
                validate={getRequiredFieldValidator()}
                value={dokumentType}
            />
        </>
    );
};

export default DokumentTypeOpplaringspengerPart;
