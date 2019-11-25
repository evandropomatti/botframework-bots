
const { ActivityHandler } = require('botbuilder');
const { DialogSet, WaterfallDialog } = require("botbuilder-dialogs");

class DialogBot extends ActivityHandler {
    constructor(userState, conversationState) {
        super();

        const dialogState = conversationState.createProperty('dialogState');        
        
        const dialogs = new DialogSet(dialogState);

        this.onTurn(async (context, next) => {

            await super.onTurn(context, next);

            await this.userState.saveChanges(context);
            await this.conversationState.saveChanges(context);
            await next();
        });

        this.onMessage(async (context, next) => {


            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {

                }
            }

            await next();
        });
    }
}

module.exports.DialogBot = DialogBot;
