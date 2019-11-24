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
            await this.getName(context, next);
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;            
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await this.getName(context, next);
                }
            }
        });

        this.getName = async (context, next) => {

            const userName = await this.userNameProperty.get(context);
            const prompted = await this.promptedProperty.get(context);

            if (userName) {
                await context.sendActivity(`Hi ${userName}. How can I help you today?`);
            } else {
                if (prompted) {

                    const text = context.activity.text

                    await context.sendActivity(`Thanks ${text}. How can I help you today?`);

                    await this.userNameProperty.set(context, text);
                    // Resets the flag to allow the bot to go throught the cycle again
                    await this.promptedProperty.set(context, false);

                } else {
                    await context.sendActivity('What is your name?');
                    await this.promptedProperty.set(context, true);
                }
            }

            await this.userState.saveChanges(context);
            await this.conversationState.saveChanges(context);

            await next();
        }
    }

}

module.exports.GreetingBot = GreetingBot;