import { Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/BostedUtlandListAndDialog';
import React from 'react';
import { useIntl } from 'react-intl';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import { getMedlemsskapDateRanges } from './medlemskapStepUtils';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: BostedUtland[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: BostedUtland[];
}

const getOmMedlemskapLenke = (locale: string) => {
    switch (locale) {
        case 'nn':
            return 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda';
        default:
            return 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden';
    }
};

const { Form, YesOrNoQuestion } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues>();

interface Props {
    values: Partial<MedlemskapFormValues>;
    søknadsdato: Date;
    submitDisabled?: boolean;
    goBack?: () => void;
}

const MedlemskapForm: React.FunctionComponent<Props> = ({ values, goBack, søknadsdato, submitDisabled }) => {
    const intl = useIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(søknadsdato);
    return (
        <Form onBack={goBack} submitDisabled={submitDisabled} runDelayedFormValidation={true}>
            <Block padBottom="xxl">
                <SifGuidePanel>
                    {intlHelper(intl, 'steg.medlemskap.veileder')}{' '}
                    <Link href={getOmMedlemskapLenke(intl.locale)} target="_blank">
                        nav.no
                    </Link>
                    .
                </SifGuidePanel>
            </Block>
            <YesOrNoQuestion
                legend={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.spm')}
                name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'steg.medlemskap.hvaBetyrDette')}>
                        {intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.hjelp')}
                    </ExpandableInfo>
                }
                data-testid="medlemsskap-annetLandSiste12"
            />
            {values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                <FormBlock margin="l">
                    <div data-testid="bostedUtlandList-annetLandSiste12">
                        <BostedUtlandListAndDialog<MedlemskapFormFields>
                            name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                            minDate={siste12Måneder.from}
                            maxDate={siste12Måneder.to}
                            labels={{
                                addLabel: intlHelper(intl, 'steg.medlemskap.leggTilKnapp'),
                                listTitle: intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.listeTittel'),
                                modalTitle: intlHelper(intl, 'steg.medlemskap.utenlandsoppholdSiste12'),
                            }}
                            validate={validateUtenlandsoppholdSiste12Mnd}
                        />
                    </div>
                </FormBlock>
            )}
            <FormBlock>
                <YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.spm')}
                    name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'steg.medlemskap.hvaBetyrDette')}>
                            {intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.hjelp')}
                        </ExpandableInfo>
                    }
                    data-testid="medlemsskap-annetLandNeste12"
                />
            </FormBlock>
            {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                <FormBlock margin="l">
                    <div data-testid="bostedUtlandList-annetLandNeste12">
                        <BostedUtlandListAndDialog<MedlemskapFormFields>
                            name={MedlemskapFormFields.utenlandsoppholdNeste12Mnd}
                            minDate={neste12Måneder.from}
                            maxDate={neste12Måneder.to}
                            labels={{
                                addLabel: intlHelper(intl, 'steg.medlemskap.leggTilKnapp'),
                                listTitle: intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.listeTittel'),
                                modalTitle: intlHelper(intl, 'steg.medlemskap.utenlandsoppholdNeste12'),
                            }}
                            validate={validateUtenlandsoppholdNeste12Mnd}
                        />
                    </div>
                </FormBlock>
            )}
        </Form>
    );
};

export default MedlemskapForm;
