export const SEND_MESSAGES = 'SEND_MESSAGES';
//export const SELECT_REDDIT = 'SELECT_REDDIT'

export const sendMessages = message => ({
  type: SEND_MESSAGES,
  message
});

//export const selectReddit = reddit => ({
//  type: SELECT_REDDIT,
//  reddit
//})