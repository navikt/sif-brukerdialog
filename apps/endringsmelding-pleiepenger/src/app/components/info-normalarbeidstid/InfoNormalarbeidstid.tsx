import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

export const InfoNormalarbeidstid = () => {
    const intl = useIntl();
    return (
        <>
            <ExpandableInfo title="Hva menes med normalt?">
                <p>
                    Med <q>normalt</q> mener vi hvor mye du jobber når du ikke har fravær på grunn av pleiepenger. Det
                    er altså normalarbeidstiden din før du starter med pleiepenger som vi er ute etter.
                </p>
                <p>
                    Hvis du mottar ytelse fra NAV (for eksempel foreldrepenger eller sykepenger) opplyser du om det som
                    var din normale arbeidstid før du startet å motta ytelsen.
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.tittel')}>
                <p>
                    <FormattedMessage id={`arbeidsforhold.normalTimer.info.turnus`} />
                </p>

                <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.turnus.tittel')}>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />
                    <p>
                        <strong>
                            <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
                        </strong>
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.3'} />
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4'} />
                        <br />
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a'} />
                        <br />
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b'} />
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.5'} />
                    </p>
                </ExpandableInfo>
                <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.varierende.tittel')}>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.1'} />

                    <p>
                        <strong>
                            <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                        </strong>
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                    </p>
                    <p>
                        <strong>
                            <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                        </strong>
                    </p>
                    <p>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                    </p>
                </ExpandableInfo>
            </ExpandableInfo>
        </>
    );
};
