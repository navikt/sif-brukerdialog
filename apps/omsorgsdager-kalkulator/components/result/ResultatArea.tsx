import { FormattedMessage, useIntl } from 'react-intl';
import { caseResultViewOf, ResultView } from './ResultView';
import ResultBox from './ResultBox';
import { BodyLong, Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import Link from 'next/link';
import { getYear } from '../../utils/utils';
import { lenker } from '../../utils/lenker';
import { Result } from '../kalkulator/Kalkulator';
import bemUtils from '@/utils/bemUtils';
import { intlHelper } from '../../utils/intlHelper';

interface Props {
    resultView: ResultView<Result>;
}

const ResultatArea: React.FC<Props> = ({ resultView }: Props) => {
    const year = getYear();
    const intl = useIntl();
    const bem = bemUtils('OmsCalcResultBox');
    return caseResultViewOf(
        () => null,
        () => (
            <ResultBox type={'WARNING'}>
                <Box borderRadius="large" padding={'5'} background="surface-warning-moderate" className="mb-3">
                    <Heading level="3" size="medium">
                        <FormattedMessage id={'resultat-area.green.2.1.a'} values={{ result: 0 }} />{' '}
                        <span className="font-normal">
                            <FormattedMessage id={'resultat-area.green.2.1.b'} values={{ year }} />
                        </span>
                    </Heading>
                </Box>
                <BodyLong className="pt-4 pb-9 text-justify" size="small">
                    <FormattedMessage id={'resultat-area.orange.3'} />
                </BodyLong>
                <BodyLong size="small">
                    <Link href={lenker.omsorgspengerNavno}>
                        <FormattedMessage id={'resultat-area.tilbake-til-omsorgspenger'} />
                    </Link>
                </BodyLong>
            </ResultBox>
        ),
        (result: Result) => {
            const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSykeSumm, antallBarn } =
                result.omsorgsprinsipper;

            return (
                <>
                    <ResultBox type={'SUCCESS'}>
                        <VStack gap="4">
                            <Box borderRadius="large" padding={'5'} background="surface-success-moderate">
                                <Heading level="3" size="medium">
                                    <FormattedMessage
                                        id={'resultat-area.green.2.1.a'}
                                        values={{ result: result.sumDager }}
                                    />{' '}
                                    <span className="font-normal">
                                        <FormattedMessage id={'resultat-area.green.2.1.b'} values={{ year }} />
                                    </span>
                                </Heading>
                            </Box>

                            <div className="subtle-card">
                                <ExpansionCard
                                    aria-label={intlHelper(intl, 'resultat-area.green.expansionCard.title')}
                                    className="mb-8">
                                    <ExpansionCard.Header className="bg-indigo-500">
                                        <ExpansionCard.Title size="small">
                                            <FormattedMessage id={'resultat-area.green.expansionCard.title'} />
                                        </ExpansionCard.Title>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <BodyLong weight="semibold" className="mb-2">
                                            <FormattedMessage id={'resultat-area.green.grunnrett.title'} />
                                        </BodyLong>

                                        <hr className="mb-3 mt-3" />
                                        <div className={bem.element('result-utregning')}>
                                            <span className={bem.element('result-utregning-beskrivelse')}>
                                                <FormattedMessage
                                                    id={'resultat-area.green.grunnrett'}
                                                    values={{
                                                        antallBarn,
                                                    }}
                                                />
                                            </span>

                                            <span className={bem.element('result-utregning-dager')}>
                                                <FormattedMessage
                                                    id={'resultat-area.green.dager'}
                                                    values={{
                                                        antallDager: grunnrett,
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        {aleneomsorg > 0 && (
                                            <div className={bem.element('result-utregning')}>
                                                <span className={bem.element('result-utregning-beskrivelse')}>
                                                    <FormattedMessage
                                                        id={'resultat-area.green.aleneomsorg'}
                                                        values={{
                                                            antallBarn,
                                                        }}
                                                    />
                                                </span>

                                                <span className={bem.element('result-utregning-dager')}>
                                                    <FormattedMessage
                                                        id={'resultat-area.green.dager'}
                                                        values={{
                                                            antallDager: aleneomsorg,
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        )}

                                        {kroniskSykt.length > 0 && (
                                            <>
                                                <hr className="mt-3 mb-6" />
                                                <BodyLong weight="semibold">
                                                    <FormattedMessage id={'resultat-area.green.barnKroniskSyk.title'} />
                                                </BodyLong>
                                                <hr className="mt-3 mb-3" />
                                                <div>
                                                    {kroniskSykt.map((b) => {
                                                        return (
                                                            <div
                                                                className={bem.element('result-utregning')}
                                                                key={b.barnIndex}>
                                                                <span
                                                                    className={bem.element(
                                                                        'result-utregning-beskrivelse',
                                                                    )}>
                                                                    <FormattedMessage
                                                                        id={'resultat-area.green.barnKroniskSyk'}
                                                                        values={{
                                                                            navn: antallBarn > 1 ? b.barnIndex : '',
                                                                        }}
                                                                    />
                                                                </span>

                                                                <span className={bem.element('result-utregning-dager')}>
                                                                    <FormattedMessage
                                                                        id={'resultat-area.green.dager'}
                                                                        values={{
                                                                            antallDager: b.antallDager,
                                                                        }}
                                                                    />
                                                                </span>
                                                            </div>
                                                        );
                                                    })}

                                                    {aleneomsorgKroniskSykeSumm > 0 && (
                                                        <div className={bem.element('result-utregning')}>
                                                            <span
                                                                className={bem.element('result-utregning-beskrivelse')}>
                                                                <FormattedMessage
                                                                    id={'resultat-area.green.aleneomsorg'}
                                                                />
                                                            </span>

                                                            <span className={bem.element('result-utregning-dager')}>
                                                                <FormattedMessage
                                                                    id={'resultat-area.green.dager'}
                                                                    values={{
                                                                        antallDager: aleneomsorgKroniskSykeSumm / 2,
                                                                    }}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        <hr className="mt-3 mb-7" />
                                        <div className={bem.element('result-utregning')}>
                                            <span className={bem.element('result-utregning-beskrivelse')}>
                                                <FormattedMessage id={'resultat-area.green.totalt'} />
                                            </span>

                                            <span className={bem.element('result-utregning-dager')}>
                                                <FormattedMessage
                                                    id={'resultat-area.green.dager.totalt'}
                                                    values={{
                                                        antallDager: result.sumDager,
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </div>
                        </VStack>
                        <BodyLong className="pb-9">
                            <FormattedMessage id={'resultat-area.green.3.1'} />
                        </BodyLong>
                        <BodyLong>
                            <Link href={lenker.omsorgspengerNavno}>
                                <FormattedMessage id={'resultat-area.tilbake-til-omsorgspenger'} />
                            </Link>
                        </BodyLong>
                    </ResultBox>
                </>
            );
        },
    )(resultView);
};

export default ResultatArea;
