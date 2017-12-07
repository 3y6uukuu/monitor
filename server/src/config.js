const SERVER = {
    URL: 'http://localhost',
    PORT: '3300',
};

const PEAL_TIMEOUT = 10 * 1000;

const PEAL_API = {
    CH_PROD: {
        AUTH: {
            SHARED: {
                PARAMS: {
                    client_id: '',
                    scope: {
                        country: 'CH',
                        '3rdparty': '',
                    },
                    redirect_uri: '',
                }
            },
            GET_CODE: {
                URI: '',
                PARAMS: {
                    BODY: {
                        source: 'AEM',
                        target: 'IAM',
                        URL: '',
                    },
                    BODY_PARTS: {
                        URL: '',
                        GET: {
                            response_type: 'code',
                            state: 'app_lang_en',
                        },
                    },
                    // AT specific object
                    CALLBACK: {
                        URI: '',
                        GET: {},
                    },
                },
            },
            GET_TOKEN: {
                URI: '',
                PARAMS: {
                    client_secret: '',
                    grant_type: '',
                },
            },
            GET_FRESH_TOKEN: {
                URI: '',
                PARAMS: {
                    client_secret: '',
                    grant_type: '',
                },
            },
        },
        SSO: {
            URI: '',
            PARAMS: {
                chl: '',
                cty: 'CH',
                target: 'SSO',
            }
        },
        CUSTOMERS: {
            SHARED: {
                URI: '',
                PARAMS: {
                    chl: '',
                    cty: 'CH',
                },
            },
            USAGE: {
                PARAMS: {
                    family: 'MOBILE',
                }
            },
            WIFI_DATA: {
                PARAMS: {
                    action: 'REGISTER',
                }
            },
        },
    },

    AT_PROD: {
        AUTH: {
            SHARED: {
                PARAMS: {
                    client_id: '',
                    scope: encodeURIComponent({
                        country: 'AT',
                        '3rdparty': '',
                    }),
                    redirect_uri: '',
                }
            },
            GET_CODE: {
                URI: '',
                PARAMS: {
                    BODY: {
                        'login-form-type': 'pwd',
                        button: '',
                    },
                    CALLBACK: {
                        URI: '',
                        GET: {
                            response_type: 'code',
                            state: 'app_lang_de',
                        },
                    },
                },
            },
            GET_TOKEN: {
                URI: '',
                PARAMS: {
                    client_secret: '',
                    grant_type: 'authorization_code',
                },
            },
            GET_FRESH_TOKEN: {
                URI: '',
                PARAMS: {
                    client_secret: '',
                    grant_type: 'refresh_token',
                },
            },
        },
        SSO: {
            URI: '',
            PARAMS: {
                chl: '',
                cty: 'CH',
                target: 'SSO',
            }
        },
        CUSTOMERS: {
            SHARED: {
                URI: '',
                PARAMS: {
                    chl: '',
                    cty: 'AT',
                },
            },
            USAGE: {
                PARAMS: {
                    family: 'MOBILE',
                }
            },
            WIFI_DATA: {
                PARAMS: {
                    action: 'REGISTER',
                }
            },
        },
    },
};

module.exports = {
    SERVER,
    PEAL_API,
    PEAL_TIMEOUT,
};

