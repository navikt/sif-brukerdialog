import dayjs from 'dayjs';

export const getSisteDatoEnKanSvare = (svarfrist: Date): Date =>
    dayjs(svarfrist).startOf('day').subtract(1, 'day').toDate();
