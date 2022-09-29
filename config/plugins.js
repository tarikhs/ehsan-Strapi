module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'strapi-provider-upload-ehsan',
            providerOptions: {
                params: {
                    Bucket: 'test param',
                    sizeLimit: 1000000,
                },
            },
        },
    },
    'users-permissions': {
        config: {
            ratelimit: {
                interval: 60000,
                max: 100000
            },
        },
    },
});
