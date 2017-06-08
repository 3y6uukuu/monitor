const SERVER = {
    URL: 'http://localhost',
    PORT: '3300',
};

const PEAL_TIMEOUT = 10 * 1000;

const PEAL_API = {
    CH: {
        AUTH: {
            SHARED: {
                PARAMS: {
                    client_id: 'uLPpPET0SXIJ0TfvoARF',
                    scope: {
                        country: 'CH',
                        '3rdparty': 'ConnectApp',
                    },
                    redirect_uri: 'http://localhost:8383/myupc',
                }
            },
            GET_CODE: {
                URI: 'https://www-upc-ch.uat.upc.biz/auth-handler/iam/authenticateuser',
                PARAMS: {
                    BODY: {
                        source: 'AEM',
                        target: 'IAM',
                        URL: '',
                    },
                    BODY_PARTS: {
                        URL: '/mga/sps/oauth/oauth20/authorize',
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
                URI: 'https://servicepe-upc-biz.uat.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'IvuZolIUOtCNKGq0DKYa',
                    grant_type: 'authorization_code',
                },
            },
            GET_FRESH_TOKEN: {
                URI: 'https://servicepe-upc-biz.uat.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'IvuZolIUOtCNKGq0DKYa',
                    grant_type: 'refresh_token',
                },
            },
        },
        SSO: {
            URI: 'https://servicepe-upc-biz.uat.upc.biz/oagcapp/peal/api/sso/users/user/wifi',
            PARAMS: {
                chl: 'CONNECTAPP',
                cty: 'CH',
                target: 'SSO',
            }
        },
        CUSTOMERS: {
            SHARED: {
                URI: 'https://servicepe-upc-biz.uat.upc.biz/oagcapp/peal/api/customers',
                PARAMS: {
                    chl: 'CONNECTAPP',
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

    CH_PROD: {
        AUTH: {
            SHARED: {
                PARAMS: {
                    client_id: '0lDOJ9LdZOPLPdXB6jgj',
                    scope: {
                        country: 'CH',
                        '3rdparty': 'ConnectApp',
                    },
                    redirect_uri: 'http://localhost:8383/myupc',
                }
            },
            GET_CODE: {
                URI: 'https://www.upc.ch/auth-handler/iam/authenticateuser',
                PARAMS: {
                    BODY: {
                        source: 'AEM',
                        target: 'IAM',
                        URL: '',
                    },
                    BODY_PARTS: {
                        URL: '/mga/sps/oauth/oauth20/authorize',
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
                URI: 'https://servicepe.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'vxwyJndRtCvdS4S5VNo1',
                    grant_type: 'authorization_code',
                },
            },
            GET_FRESH_TOKEN: {
                URI: 'https://servicepe.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'vxwyJndRtCvdS4S5VNo1',
                    grant_type: 'refresh_token',
                },
            },
        },
        SSO: {
            URI: 'https://servicepe.upc.biz/oagcapp/peal/api/sso/users/user/wifi',
            PARAMS: {
                chl: 'CONNECTAPP',
                cty: 'CH',
                target: 'SSO',
            }
        },
        CUSTOMERS: {
            SHARED: {
                URI: 'https://servicepe.upc.biz/oagcapp/peal/api/customers',
                PARAMS: {
                    chl: 'CONNECTAPP',
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

    AT: {
        AUTH: {
            SHARED: {
                PARAMS: {
                    client_id: 'uLPpPET0SXIJ0TfvoARF',
                    scope: encodeURIComponent({
                        country: 'AT',
                        '3rdparty': 'ConnectApp',
                    }),
                    redirect_uri: 'http://localhost:8383/myupc',
                }
            },
            GET_CODE: {
                URI: 'https://login-upc-at.uat.upc.biz/pkmslogin.form',
                PARAMS: {
                    BODY: {
                        'login-form-type': 'pwd',
                    },
                    CALLBACK: {
                        URI: 'https://login-upc-at.uat.upc.biz/mga/sps/oauth/oauth20/authorize',
                        GET: {
                            response_type: 'code',
                            state: 'app_lang_en',
                        },
                    },
                },
            },
            GET_TOKEN: {
                URI: 'https://servicepe-upc-biz.uat.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'IvuZolIUOtCNKGq0DKYa',
                    grant_type: 'authorization_code',
                },
            },
            GET_FRESH_TOKEN: {
                URI: 'https://servicepe-upc-biz.uat.upc.biz/mga/sps/oauth/oauth20/token',
                PARAMS: {
                    client_secret: 'IvuZolIUOtCNKGq0DKYa',
                    grant_type: 'refresh_token',
                },
            },
        },
        SSO: {
            URI: 'https://servicepe-upc-biz.uat.upc.biz/oagcapp/peal/api/sso/users/user/wifi',
            PARAMS: {
                chl: 'CONNECTAPP',
                cty: 'AT',
                target: 'SSO',
            }
        },
        CUSTOMERS: {
            SHARED: {
                URI: 'https://servicepe-upc-biz.uat.upc.biz/oagcapp/peal/api/customers',
                PARAMS: {
                    chl: 'CONNECTAPP',
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

