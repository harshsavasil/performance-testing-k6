import http from 'k6/http';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: true,
    vus: 1,
    duration: '10s',
};

export default () => {
    http.get('https://dev-api-pluang.pluang.com/api/v3/mobile-app/home/inbox');
};
