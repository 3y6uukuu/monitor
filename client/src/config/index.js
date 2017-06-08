import keyMirror from 'nskeymirror';

export const SERVER = {
    ORIGIN: 'http://localhost',
    PORT: '3300'
};

export const CUSTOMER = {
    DEFAULT_DATA: [
        {
            USER_ID: '6208858@upc.com',
            PASSWORD: 'Passwd11',
            COUNTRY: 'CH',
        },
        // {
        //     USER_ID: 'connect_03@hispeed.ch',
        //     PASSWORD: 'UPCpmiSIM0',
        //     COUNTRY: 'CH_PROD',
        // },
        {
            USER_ID: '6553373@byom.de',
            PASSWORD: 'UPCrelman0',
            COUNTRY: 'CH_PROD',
        },
        // {
        //     USER_ID: 'francesca.ortenzio@upc.ch',
        //     PASSWORD: 'Testfran1',
        //     COUNTRY: 'CH_PROD',
        // },
        {
            USER_ID: '32562252@upc-test.at',
            PASSWORD: 'Testtest1',
            COUNTRY: 'AT',
        },
        // {
        //     USER_ID: '32562803@upc-test.at',
        //     PASSWORD: 'Testtest1',
        //     COUNTRY: 'AT',
        // },
    ],
};

export const SERVICES_IDS = keyMirror({
    GET_CODE: null,
    GET_TOKEN: null,
    GET_FRESH_ACCESS_TOKEN: null,
    GET_PROFILE: null,
    GET_PRODUCTS: null,
    GET_USAGE: null,
    GET_WIFI_ROAMING_STATUS: null,
    GET_USER_WIFI_CREDENTIALS: null,
    GET_MOBILE_ALLOWANCE: null,
    POST_WIFI_CREDENTIALS: null,
    COMMUNITY_WIFI_OPT_IN: null,
    POST_MOBILE_ALLOWANCE_ROAMING: null,
    POST_MOBILE_ALLOWANCE_SPENDING: null,
}, 'SERVICE');

export const SERVICES = [
    {
        id: SERVICES_IDS.GET_CODE,
        title: 'Authenticate user (Get access code)',
        method: 'POST',
    },
    {
        id: SERVICES_IDS.GET_TOKEN,
        title: 'Exchange code for access token',
        method: 'POST',
    },
    {
        id: SERVICES_IDS.GET_FRESH_ACCESS_TOKEN,
        title: 'Get fresh access token',
        method: 'POST',
        // disabled: true,
    },
    {
        id: SERVICES_IDS.GET_PROFILE,
        title: 'Customer profile',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.GET_PRODUCTS,
        title: 'Customer products',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.GET_USAGE,
        title: 'Customer mobile usage',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.GET_MOBILE_ALLOWANCE,
        title: 'Customer Mobile Usage allowance',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.GET_WIFI_ROAMING_STATUS,
        title: 'Community Wi-Fi roaming status',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.GET_USER_WIFI_CREDENTIALS,
        title: 'Get community Wi-Fi credentials',
        method: 'GET',
    },
    {
        id: SERVICES_IDS.COMMUNITY_WIFI_OPT_IN,
        title: 'Community Wi-Fi Opt-In',
        method: 'POST',
        params: {wifiPassword: 'doItNow1'},
    },
    {
        id: SERVICES_IDS.POST_WIFI_CREDENTIALS,
        title: 'Update Wi-Fi credentials',
        method: 'POST',
        params: {wifiPassword: 'somePassworD1'},
    },
    {
        id: SERVICES_IDS.POST_MOBILE_ALLOWANCE_ROAMING,
        title: 'Mobile allowance "ROAMING"',
        method: 'POST',
        params: {subscriberId: '30743', msisdn: '0784071964', currentAllowance: [{allowanceType: 'ROAMING', allowanceValue: 200}]},
    },
    {
        id: SERVICES_IDS.POST_MOBILE_ALLOWANCE_SPENDING,
        title: 'Mobile allowance "SPENDING"',
        method: 'POST',
        params: {subscriberId: '30743', msisdn: '0784071964', currentAllowance: [{allowanceType: 'SPENDING', allowanceValue: 300}]},
    },
];

export const TIMER = {
    interval: 2,
    startTime: '00:02',
    endTime: '23:58',
};
