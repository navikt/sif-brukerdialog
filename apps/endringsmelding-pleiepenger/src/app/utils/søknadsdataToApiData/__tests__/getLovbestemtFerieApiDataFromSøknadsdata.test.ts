import { DateRange, ISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { getLovbestemtFerieApiDataFromSøknadsdata } from '../getLovbestemtFerieApiDataFraSøknadsdata';

describe('getLovbestemtFerieApiDataFromSøknadsdata', () => {
    const jan: ISODateRange = '2022-01-02/2022-01-03';
    const mai: ISODateRange = '2022-05-02/2022-05-04';
    const sept: ISODateRange = '2022-09-02/2022-09-05';

    // Ferier
    const ferieJan = ISODateRangeToDateRange(jan);
    const ferieMai = ISODateRangeToDateRange(mai);
    const ferieSept = ISODateRangeToDateRange(sept);

    const perioderSak: DateRange[] = [ferieJan, ferieSept];
    const perioderIMelding: DateRange[] = [ferieJan, ferieMai];

    describe('legge til og fjerne en periode', () => {
        const { dagerFjernet, dagerLagtTil, perioderFjernet, perioderLagtTil } =
            getLovbestemtFerieApiDataFromSøknadsdata(perioderIMelding, perioderSak);
        it('finner dager som er fjernet og dager som er lagt til', () => {
            expect(dagerFjernet.length).toEqual(4);
            expect(dagerFjernet[0]).toEqual('2022-09-02');
            expect(dagerFjernet[1]).toEqual('2022-09-03');
            expect(dagerFjernet[2]).toEqual('2022-09-04');
            expect(dagerFjernet[3]).toEqual('2022-09-05');
        });
        it('finner dager som er lagt til', () => {
            expect(dagerLagtTil.length).toEqual(3);
            expect(dagerLagtTil[0]).toEqual('2022-05-02');
            expect(dagerLagtTil[1]).toEqual('2022-05-03');
            expect(dagerLagtTil[2]).toEqual('2022-05-04');
        });
        it('returnerer riktige perioder', () => {
            expect(Object.keys(perioderFjernet).length).toEqual(1);
            expect(Object.keys(perioderLagtTil).length).toEqual(1);
            expect(Object.keys(perioderFjernet)[0]).toEqual(sept);
            expect(Object.keys(perioderLagtTil)[0]).toEqual(mai);
        });
    });

    describe('Utvidelse og splitt av periode', () => {
        it('håndterer utvidelse av en periode', () => {
            const maiUtvidet: ISODateRange = '2022-05-01/2022-05-05';
            const ferieMaiUtvidet = ISODateRangeToDateRange(maiUtvidet);
            const { dagerLagtTil, perioderLagtTil } = getLovbestemtFerieApiDataFromSøknadsdata(
                [...perioderIMelding, ferieMaiUtvidet],
                perioderSak
            );
            expect(dagerLagtTil.length).toEqual(5);
            expect(dagerLagtTil[0]).toEqual('2022-05-01');
            expect(dagerLagtTil[1]).toEqual('2022-05-02');
            expect(dagerLagtTil[2]).toEqual('2022-05-03');
            expect(dagerLagtTil[3]).toEqual('2022-05-04');
            expect(dagerLagtTil[4]).toEqual('2022-05-05');

            expect(Object.keys(perioderLagtTil).length).toEqual(1);
            expect(Object.keys(perioderLagtTil)[0]).toEqual('2022-05-01/2022-05-05');
        });
        it('håndterer splitt av en periode', () => {
            const maiSplitt1: ISODateRange = '2022-05-01/2022-05-03';
            const maiSplitt2: ISODateRange = '2022-05-05/2022-05-05';
            const ferieMaiSplitt1 = ISODateRangeToDateRange(maiSplitt1);
            const ferieMaiSplitt2 = ISODateRangeToDateRange(maiSplitt2);
            const { dagerLagtTil, dagerFjernet, perioderLagtTil, perioderFjernet } =
                getLovbestemtFerieApiDataFromSøknadsdata([ferieMaiSplitt1, ferieMaiSplitt2], [ferieMai]);

            expect(dagerLagtTil.length).toEqual(2);
            expect(dagerLagtTil[0]).toEqual('2022-05-01');
            expect(dagerLagtTil[1]).toEqual('2022-05-05');
            expect(dagerFjernet.length).toEqual(1);
            expect(dagerFjernet[0]).toEqual('2022-05-04');

            expect(Object.keys(perioderLagtTil).length).toEqual(2);
            expect(Object.keys(perioderLagtTil)[0]).toEqual('2022-05-01/2022-05-01');
            expect(Object.keys(perioderLagtTil)[1]).toEqual('2022-05-05/2022-05-05');

            expect(Object.keys(perioderFjernet).length).toEqual(1);
            expect(Object.keys(perioderFjernet)[0]).toEqual('2022-05-04/2022-05-04');
        });
    });
});
