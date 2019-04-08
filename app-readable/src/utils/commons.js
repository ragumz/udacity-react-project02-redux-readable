/**
 * @description Check if an object is undefined or null.
 *
 * @param {any} obj Object to check
 * @return false if it is not null and not undefined
 */
export const isNull = obj => {
  return obj === undefined || obj === null;
};

/**
 * @description Check if an object is undefined, or null or
 * empty, such as an String, or Array or even an Object keys.
 *
 * @param {any} obj Object to check
 * @return false if it is not null, undefined or empty.
 */
export const isEmpty = obj => {
  if (isNull(obj)) return true;
  if (typeof obj === 'string') {
    if (obj.length === 0) return true;
  } else if (Array.isArray(obj)) {
    if (Object.keys(obj).length === 0) return true;
  } else if (obj.hasOwnProperty('lenght')) return obj.lenght === 0;
  return false;
};

/**
 * @description Convert an array of objects into and Object itself indexed
 * by and object own field value.
 * @param {Array} arrObjects Array containing objects to convert into an Object
 * @param {string} fieldKey Default to 'id'. Name of the field which contains the Object key.
 */
export const arrayToIndexedObject = (arrObjects = [], fieldKey = 'id') => {
  return Array.from(arrObjects).reduce((result, item/*, index, array*/) => {
    result[item[fieldKey]] = item;
    return result;
  }, {});
};

/**
 * @description Separate a text with joined capitalized words into a string with
 * separate words.
 * All words must start with an uppercase letter, including the first.
 * Eg.: 'IndustryIdentifiers' returns 'Industry Identifiers'
 *
 * @param {string} text A text such as attribute name of an object
 * @return An string with separated words
 */
export const separateFromUpperChar = text => {
  if (isEmpty(text)) return text;
  let ntext = text.match(/[A-Z][a-z]+|[0-9]+/g);
  if (!isEmpty(ntext)) return ntext.join(' ');
  return text;
};

/**
 * @description Capitalize the first letters of a text sentence.
 *
 * @param {*} text The sentence
 * @return The capitalized sentence
 */
export const capitalize = text => {
  if (isEmpty(text)) return text;
  return text
    .split(' ')
    .map(s =>
      s
        .charAt(0)
        .toUpperCase()
        .concat(s.substring(1))
    )
    .join(' ');
};

/**
 * @description Reused Tyler's code to format date and time
 * from Chirper-app example
 *
 * @param {number} timestamp The seconds epoch value representing the date
 * @return A string with time and date
 */
export function formatDate (timestamp) {
  if (isEmpty(timestamp))
    return '';
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return `${d.toLocaleDateString('en-US')} ${time.substr(0, 5)}${time.slice(-2).toLowerCase()}`;
}

/**
 * @description Reused Tyler's code to generate a Unique Identification
 * from Chirper-app example.
 *
 * @return A string with time and date
 */
export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * @description Return and object that contains content to show on MessageDialog component, with
 * messages and buttons exclusively to delete a Post or a Comment.
 *
 * @return MessageDialog component init prop.
 */
export function createDeleteMessage(entityName, handleDeleteYes, handleDeleteNo, toAppendText='') {
  let userMessage = {title: "QUESTION", message: `Do you confirm to permanently delete this ${entityName}${toAppendText}? No recover is available.`};
  let messageButtons = [{ text: 'Yes', handleClick: handleDeleteYes },
                        { text: 'No',  handleClick: handleDeleteNo }];
  return { userMessage, messageButtons};
}

/**
 * @description Generate an avatar background color based on its id text.
 * Source: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
 *
 * @param {*} str text to get the hue parameter of the returned color
 * @param {*} s a number between 0 and 100
 * @param {*} l  a number between 0 and 100
 */
export function stringToHslColor(str, s, l) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}