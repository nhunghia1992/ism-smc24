/**
* A set of functions called "actions" for `certificate`
*/

import { sanitize } from "@strapi/utils";

export default {
    certificate: async (ctx) => {
        try {
            const weeks = await strapi.entityService.findMany('api::week.week')
            if (!weeks || !weeks.length) return ctx.badRequest();

            const { username } = ctx.request.query
            const [user] = await strapi.entityService.findMany('plugin::users-permissions.user', { filters: { username } })
            if (!user) return ctx.badRequest();

            const subjects = ['project', 'story', 'robotics-coding']

            let isFinished = true

            // check if user completed all subjects in all weeks
            for (const week of weeks) {
                if (!isFinished) break;

                for (const subject of subjects) {
                    const subjectItem = await strapi.entityService.findMany<any, any>(`api::${subject}.${subject}`, {
                        filters: {
                            week: week.id,
                            users: {
                                $contains: user.id
                            },
                            publishedAt: {
                                $null: false
                            }
                        }
                    })

                    if (!subjectItem || !subjectItem.length) {
                        isFinished = false
                        break
                    }
                }
            }

            if (!isFinished) return ctx.badRequest('Course is not finished!');

            // sanitize user info
            const contentType = strapi.contentType('plugin::users-permissions.user')
            const sanitizedUser = await sanitize.contentAPI.output(user, contentType)
            return ctx.send([sanitizedUser])

        } catch (err) {
            console.log(err)
            return ctx.badRequest(err)
        }
    }
};
