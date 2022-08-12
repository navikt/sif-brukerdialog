import { Alert, BodyLong } from '@navikt/ds-react';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ItemList from '@navikt/sif-common-core-ds/lib/components/item-list/ItemList';
import { dateToday } from '@navikt/sif-common-utils/lib/dateUtils';
import { prettifyDate } from '@navikt/sif-common-utils/lib/dateFormatter';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/AnnetBarnListAndDialog';
import { useFormikContext } from 'formik';
import { Person } from '../../types/Person';
import { Barn, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { nYearsAgo } from '../../utils/aldersUtils';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

interface OwnProps {
    barn: Barn[];
    søker: Person;
}

type Props = OwnProps;

const barnItemLabelRenderer = (barn: Barn, intl: IntlShape): React.ReactNode => {
    return (
        <div style={{ display: 'flex' }}>
            <span style={{ order: 2, paddingLeft: '1rem', justifySelf: 'flex-end' }}>
                {formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}
            </span>
            <span style={{ order: 1 }}>
                {intlHelper(intl, 'step.dine-barn.født')} {prettifyDate(barn.fødselsdato)}
            </span>
        </div>
    );
};

const DineBarnStep: React.FunctionComponent<Props> = ({ barn, søker }) => {
    const intl = useIntl();
    const {
        values: { andreBarn },
    } = useFormikContext<SoknadFormData>();
    const kanFortsette = (barn !== undefined && barn.length > 0) || andreBarn.length > 0;

    return (
        <SoknadFormStep id={StepID.DINE_BARN} showSubmitButton={kanFortsette}>
            {barn.length > 0 && (
                <Block margin="xl">
                    <ContentWithHeader
                        level="2"
                        size="xsmall"
                        header={intlHelper(intl, 'step.dine-barn.listHeader.registrerteBarn')}>
                        <BodyLong as="div">
                            <ItemList<Barn>
                                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                                labelRenderer={(barn): React.ReactNode => barnItemLabelRenderer(barn, intl)}
                                items={barn}
                            />
                        </BodyLong>
                    </ContentWithHeader>
                </Block>
            )}
            <Block margin="xl">
                <ContentWithHeader
                    level="2"
                    size="xsmall"
                    header={
                        andreBarn.length === 0
                            ? intlHelper(intl, 'step.dine-barn.info.spm.andreBarn')
                            : intlHelper(intl, 'step.dine-barn.info.spm.flereBarn')
                    }>
                    <BodyLong>{intlHelper(intl, 'step.dine-barn.info.spm.text')}</BodyLong>
                </ContentWithHeader>
            </Block>
            <Block margin="l">
                <AnnetBarnListAndDialog<SoknadFormField>
                    name={SoknadFormField.andreBarn}
                    labels={{
                        addLabel: 'Legg til barn',
                        listTitle: 'Andre barn',
                        modalTitle: 'Legg til barn',
                    }}
                    maxDate={dateToday}
                    minDate={nYearsAgo(18)}
                    disallowedFødselsnumre={[søker.fødselsnummer]}
                    aldersGrenseText={intlHelper(intl, 'step.dine-barn.formLeggTilBarn.aldersGrenseInfo')}
                />
            </Block>
            {andreBarn.length === 0 && barn.length === 0 && (
                <Block margin="l">
                    <Alert variant="warning">{intlHelper(intl, 'step.dine-barn.info.ingenbarn.2')}</Alert>
                </Block>
            )}
        </SoknadFormStep>
    );
};

export default DineBarnStep;
