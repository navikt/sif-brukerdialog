import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';

import { Arbeidsgiver, ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import { ArbeidsforholdFormValues } from '../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { syncAnsattArbeidsforhold } from '../arbeidsgivereUtils';

const organisasjoner: Arbeidsgiver[] = [
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org1', id: '1', ansettelsesperioder: [] },
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org2', id: '2', ansettelsesperioder: [] },
];

const arbeidsforholdOrganisasjoner: ArbeidsforholdFormValues[] = [
    {
        arbeidsgiver: { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org1', id: '1', ansettelsesperioder: [] },
    },
    {
        arbeidsgiver: { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org2', id: '2', ansettelsesperioder: [] },
    },
];

const organisasjonerPartiallyEqual: Arbeidsgiver[] = [
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org3', id: '3', ansettelsesperioder: [] },
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'NewOrg', id: 'new', ansettelsesperioder: [] },
];

const organisasjonerEqual: Arbeidsgiver[] = [
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org3', id: '3', ansettelsesperioder: [] },
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org4', id: '4', ansettelsesperioder: [] },
];

const arbeidsforholdErAnsatt: ArbeidsforholdFormValues = {
    arbeidsgiver: {
        type: ArbeidsgiverType.ORGANISASJON,
        navn: 'Org3',
        id: '3',
        ansettelsesperioder: [],
    },
    erAnsatt: YesOrNo.YES,
    normalarbeidstid: {
        timerPerUke: '10',
    },
};

const arbeidsforholdUbesvart: ArbeidsforholdFormValues = {
    arbeidsgiver: {
        type: ArbeidsgiverType.ORGANISASJON,
        navn: 'Org4',
        id: '4',
        ansettelsesperioder: [],
    },
    erAnsatt: YesOrNo.UNANSWERED,
    normalarbeidstid: {
        timerPerUke: '20',
    },
};

const arbeidsforhold: ArbeidsforholdFormValues[] = [arbeidsforholdErAnsatt, arbeidsforholdUbesvart];

vi.mock('@navikt/sif-common-env', () => {
    return {
        getMaybeEnv: () => 'someEnvVar',
        getRequiredEnv: () => 'mockedApiUrl',
    };
});

describe('syncArbeidsforholdWithArbeidsgivere', () => {
    it('should replace all arbeidsforhold if none present in arbeidsgivere', () => {
        const result = syncAnsattArbeidsforhold(organisasjoner, arbeidsforhold);
        expect(JSON.stringify(result)).toEqual(JSON.stringify(arbeidsforholdOrganisasjoner));
    });

    it('should keep those arbeidsforhold which still are present in arbeidsgivere', () => {
        const result = syncAnsattArbeidsforhold(organisasjonerPartiallyEqual, arbeidsforhold);
        expect(result[0]?.arbeidsgiver?.id).toBe('3');
        expect(result[0].erAnsatt).toBe(YesOrNo.YES);
        expect(result[1].arbeidsgiver?.id).toBe('new');
    });

    it('should keep all arbeidsforhold when all are present in arbeidsgivere', () => {
        const result = syncAnsattArbeidsforhold(organisasjonerEqual, arbeidsforhold);
        expect(result[0].arbeidsgiver?.id).toBe('3');
        expect(result[0].erAnsatt).toBe(YesOrNo.YES);
        expect(result[1].arbeidsgiver?.id).toBe('4');
        expect(result[1].erAnsatt).toBe(YesOrNo.UNANSWERED);
    });
});
