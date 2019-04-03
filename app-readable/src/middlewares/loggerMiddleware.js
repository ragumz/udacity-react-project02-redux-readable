/**
 * @description A middleware to register every reducer action 
 * state change to console log
 * @param {*} store Reducer store instance
 */
const logger = store => next => action => {
  console.group(action.type);
    console.log('Action: ', action);
    const returnValue = next(action);
    console.log('New state: ', store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
