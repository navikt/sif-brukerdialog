export const setupNavnoConsentCookieForPlaywrightTests = async (context: any) => {
    return await context.addCookies([
        {
            name: 'navno-consent',
            value: '{%22consent%22:{%22analytics%22:false%2C%22surveys%22:false}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222025-01-28T15:46:10.985Z%22%2C%22updatedAt%22:%222025-01-29T07:07:24.760Z%22%2C%22version%22:1}}',
            domain: 'localhost',
            path: '/',
            expires: -1, // Session cookie
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        },
    ]);
};
