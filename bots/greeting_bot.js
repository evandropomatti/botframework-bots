const { ActivityHandler } = require('botbuilder');

const USER_PROFILE_ID = 'USER_PROFILE_ID';
const DID_BOT_PROMPTED_USER = 'DID_BOT_PROMPTED_USER'

class GreetingBot extends ActivityHandler {

    constructor(userState, conversationState) {
        super();

        // Property accessors
        this.userNameProperty = userState.createProperty(USER_PROFILE_ID);
        this.promptedProperty = conversationState.createProperty(DID_BOT_PROMPTED_USER)

        this.userState = userState;
        this.conversationState = conversationState;

        this.onMessage(async (context, next) => {

            const name = await this.userNameProperty.get(context);
            const prompted = await this.promptedProperty.get(context);
            
            if (name) {
                context.sendActivity(`Hi ${name}. How can I help you today?`);
            } else {
                if (this.prompted) {

                    const name = context.activity.from.name;

                    context.sendActivity(`Thanks ${name}. How can I help you today?`);

                    this.userNameProperty.set(context, name);
                    // Resets the flag to allow the bot to go throught the cycle again
                    this.promptedProperty.set(context, false);

                } else {

                    context.sendActivity('no action');
                    this.promptedProperty.set(context, true);
                }
            }

            await this.userState.saveChanges(context);
            await this.conversationState.saveChanges(context);

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            membersAdded.forEach(member => {
                if (member.id !== context.activity.recipient.id) {
                    context.sendActivity(`What is your name?`);
                    this.promptedProperty.set(context, true);
                }
            });
            await next();
        });
    }

}

module.exports.GreetingBot = GreetingBot;