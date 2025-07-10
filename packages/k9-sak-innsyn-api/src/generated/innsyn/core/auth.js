export const getAuthToken = async (auth, callback) => {
    const token = typeof callback === 'function' ? await callback(auth) : callback;
    if (!token) {
        return;
    }
    if (auth.scheme === 'bearer') {
        return `Bearer ${token}`;
    }
    if (auth.scheme === 'basic') {
        return `Basic ${btoa(token)}`;
    }
    return token;
};
//# sourceMappingURL=auth.js.map