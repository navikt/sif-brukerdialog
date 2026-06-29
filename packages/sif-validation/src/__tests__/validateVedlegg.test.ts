import { getVedleggValidator, ValidateVedleggError } from '../getVedleggValidator';

const MB = 1024 * 1024;

const makeFile = (sizeBytes: number) => makeUploadedFile(sizeBytes);

const makeUploadedFile = (sizeBytes = 1 * MB) => ({
    uploaded: true,
    error: false,
    pending: false,
    file: { size: sizeBytes },
});

const makePendingFile = () => ({
    uploaded: false,
    error: false,
    pending: true,
    file: { size: 1 * MB },
});

const makeErrorFile = () => ({
    uploaded: false,
    error: true,
    pending: false,
    file: { size: 1 * MB },
});

describe('getVedleggValidator', () => {
    describe('required: false (standard)', () => {
        it('returnerer undefined når value er undefined', () => {
            expect(getVedleggValidator()(undefined)).toBeUndefined();
        });
        it('returnerer undefined når value er tom array', () => {
            expect(getVedleggValidator()([])).toBeUndefined();
        });
        it('returnerer undefined når filer er lastet opp og innenfor grenser', () => {
            expect(getVedleggValidator()([makeFile(1 * MB)])).toBeUndefined();
        });
        it('teller ikke pending-filer som opplastede', () => {
            expect(getVedleggValidator()([makePendingFile()])).toBeUndefined();
        });
        it('teller ikke filer med feil som opplastede', () => {
            expect(getVedleggValidator()([makeErrorFile()])).toBeUndefined();
        });
    });

    describe('required: true', () => {
        it('returnerer noVedleggUploaded når value er undefined', () => {
            expect(getVedleggValidator({ required: true })(undefined)).toEqual(ValidateVedleggError.noVedleggUploaded);
        });
        it('returnerer noVedleggUploaded når arrayen er tom', () => {
            expect(getVedleggValidator({ required: true })([])).toEqual(ValidateVedleggError.noVedleggUploaded);
        });
        it('returnerer noVedleggUploaded når det bare finnes pending/feil-filer', () => {
            expect(getVedleggValidator({ required: true })([makePendingFile(), makeErrorFile()])).toEqual(
                ValidateVedleggError.noVedleggUploaded,
            );
        });
        it('returnerer undefined når minst én gyldig fil er lastet opp', () => {
            expect(getVedleggValidator({ required: true })([makeFile(1 * MB)])).toBeUndefined();
        });
    });

    describe('tooManyVedlegg', () => {
        it('returnerer tooManyVedlegg når mer enn 100 filer er lastet opp', () => {
            const files = Array.from({ length: 101 }, () => makeFile(1));
            expect(getVedleggValidator()(files)).toEqual(ValidateVedleggError.tooManyVedlegg);
        });
        it('returnerer undefined for nøyaktig 100 filer', () => {
            const files = Array.from({ length: 100 }, () => makeFile(1));
            expect(getVedleggValidator()(files)).toBeUndefined();
        });
    });

    describe('maxTotalSizeExceeded', () => {
        it('returnerer maxTotalSizeExceeded når total størrelse overstiger 24 MB', () => {
            const files = [makeFile(25 * MB)];
            expect(getVedleggValidator()(files)).toEqual(ValidateVedleggError.maxTotalSizeExceeded);
        });
        it('returnerer undefined når total størrelse er nøyaktig 24 MB', () => {
            const files = [makeFile(24 * MB)];
            expect(getVedleggValidator()(files)).toBeUndefined();
        });
        it('returnerer maxTotalSizeExceeded når kombinert størrelse med otherFiles overstiger 24 MB', () => {
            const files = [makeFile(13 * MB)];
            const otherFiles = [makeFile(12 * MB)];
            expect(getVedleggValidator({ otherFiles })(files)).toEqual(ValidateVedleggError.maxTotalSizeExceeded);
        });
        it('returnerer undefined når kombinert størrelse med otherFiles er innenfor 24 MB', () => {
            const files = [makeFile(12 * MB)];
            const otherFiles = [makeFile(12 * MB)];
            expect(getVedleggValidator({ otherFiles })(files)).toBeUndefined();
        });
        it('teller ikke feil/pending-filer i otherFiles mot total størrelse', () => {
            const files = [makeFile(12 * MB)];
            const otherFiles = [makeErrorFile(), makePendingFile()];
            expect(getVedleggValidator({ otherFiles })(files)).toBeUndefined();
        });
    });
});
