const nb = {
    'calendarGrid.Mandag': 'Mandag',
    'calendarGrid.Tirsdag': 'Tirsdag',
    'calendarGrid.Onsdag': 'Onsdag',
    'calendarGrid.Torsdag': 'Torsdag',
    'calendarGrid.Fredag': 'Fredag',
    'calendarGrid.uke': 'uke',
    'calendarGrid.Uke': 'Uke',
    'calendarGrid.måned': 'måned',
    'calendarGrid.Måned': 'Måned',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const calendarGridMessages = {
    nb,
    nn,
};
