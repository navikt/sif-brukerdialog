export function formatFileSize(fileSizeInBytes: number): string | null {
    if (fileSizeInBytes === 0) {
        return null;
    }
    const megaBytes = fileSizeInBytes / (1024 * 1024);
    return formatter.format(megaBytes);
}

const formatter = new Intl.NumberFormat('nb-NO', {
    style: 'unit',
    unit: 'megabyte',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // @ts-expect-error - Looks like roundingMode hasn't been added to TypeScript yet
    roundingMode: 'ceil',
});
