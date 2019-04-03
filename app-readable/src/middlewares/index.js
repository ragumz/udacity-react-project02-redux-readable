import thunk from 'redux-thunk';
import logger from './loggerMiddleware';
import { applyMiddleware } from 'redux';

/**
 * @description Initialize all middlewares
 */
export default applyMiddleware(thunk, logger);
