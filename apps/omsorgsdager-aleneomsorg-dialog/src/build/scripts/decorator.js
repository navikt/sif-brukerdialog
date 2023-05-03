const jsdom = require('jsdom');
const { default: axios } = require('axios');
const { JSDOM } = jsdom;

const getDecorator = async () => {
    try {
        const data = await axios.get(`${process.env.DEKORATOR_URL}`).then((res) => {
            const { document } = new JSDOM(res.data).window;
            const prop = 'innerHTML';
            const data = {
                NAV_SCRIPTS: document.getElementById('scripts')[prop],
                NAV_STYLES: document.getElementById('styles')[prop],
                NAV_HEADING: document.getElementById('header-withmenu')[prop],
                NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
            };

            return data;
        });
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};
module.exports = getDecorator;
