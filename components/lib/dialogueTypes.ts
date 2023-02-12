
export interface IDialogueDisplayable {
    onRead?: () => void;
    read?: boolean; // indicates that the message has been read now and the display should change accordingly (e.g. stop animating)
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
}
