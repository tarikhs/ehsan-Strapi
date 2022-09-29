module.exports = {
    // async afterCreate(event) {
    //     console.log("DONE");
    //     const {result} = event;
    //     console.log(result);

    //     try {
    //         //await strapi.plugins["users-permissions"].services.user.sendConfirmationEmail(user);
    //         await strapi.plugins['email'].services.email.send({
    //           to:   "amal.f.alaqel@gmail.com",
    //           from: "ooammolaoo@gmail.com",
    //           subject: "Image uploaded succesfully",
    //           text: `An image has been uploaded with the title: ${(result.Title)}`
    //         })
    //     } catch (error) {
    //         console.log("can't send email");
    //         console.log(error);
    //         //console.log(error.response.body.errors);
    //     }
    // }
}