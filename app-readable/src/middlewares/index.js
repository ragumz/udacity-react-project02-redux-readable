import thunk from 'redux-thunk';
import logger from './loggerMiddleware';
import { applyMiddleware } from 'redux';

export default applyMiddleware(thunk, logger);
