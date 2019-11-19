const { ActivityHandler } = require('botbuilder');

class GreetingBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            membersAdded.forEach(member => {
                if (member.id !== context.activity.recipient.id) {

                }
            });
            await next();
        });
    }
}

module.exports.GreetingBot = GreetingBot;