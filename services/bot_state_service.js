class BotStateService {

    userProfileId;
    userProfileAccessor;

    constructor(userState) {
        if (userState === null) {
            throw 'User State cannot be null';
        }
        this.userState = userState;
        this.userProfileId = `${BotStateService}.userProfile`;
        initializeAccessors();
    }

    initializeAccessors = () => {
        this.userProfileAccessor = userState.createProperty(this.userProfileId);
    }
}

module.exports.BotStateService = BotStateService;