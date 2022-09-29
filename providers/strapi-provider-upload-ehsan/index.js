'use strict';

// Public node modules.
const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const { PayloadTooLargeError } = require('@strapi/utils').errors;

const UPLOADS_FOLDER_NAME = 'uploads';

module.exports = {
    init(providerOptions) {
        // init your provider if necessary
        console.log(providerOptions.sizeLimit);
        console.log(strapi.dirs.public);

        const verifySize = (file) => {
            if (file.size > providerOptions.sizeLimit) {
                throw new PayloadTooLargeError();
            }
        };

        const uploadPath = path.resolve(strapi.dirs.static.public, UPLOADS_FOLDER_NAME);
        if (!fse.pathExistsSync(uploadPath)) {
            throw new Error(
                `The upload folder (${uploadPath}) doesn't exist or is not accessible. Please make sure it exists.`
            );
        }

        return {
            upload(file) {
                console.log(file.ext);

                verifySize(file);

                return new Promise((resolve, reject) => {
                    // write file in public/assets folder
                    fs.writeFile(path.join(uploadPath, `${file.name}`), file.buffer, (err) => {
                        if (err) {
                            return reject(err);
                        }

                        file.url = `/${UPLOADS_FOLDER_NAME}/${file.name}`;

                        resolve();
                    });
                });

                // upload the file in the provider
                // file content is accessible by `file.buffer`
            },


            uploadStream(file) {
                verifySize(file);

                return new Promise((resolve, reject) => {
                    pipeline(
                        file.stream,
                        fs.createWriteStream(path.join(uploadPath, `${file.name}`)),
                        (err) => {
                            if (err) {
                                return reject(err);
                            }

                            file.url = `/uploads/${file.name}`;

                            resolve();
                        }
                    );
                });
            },


            delete(file) {
                console.log(file.ext);
                // delete the file in the provider
            },
        };
    },
};