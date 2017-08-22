/**
 * 相等性判断
 */
import Immutable from 'immutable';
import { isEqual } from 'lodash';

function getValue(obj, key) {
  if (obj) {
    if (Immutable.Map.isMap(obj)) {
      return obj.get(key);
    }
    return obj[key];
  }
  return null;
}

/**
 * 比较两个 obj 的某些 property 是否相等。
 * 如果 props 未定义，则直接比较两个 obj。
 * @param pre {Object}
 * @param next {Object}
 * @param props {Array}
 * @returns {boolean}
 */
export default function deepEqual(pre, next, props) {
  if (props) {
    for (const key of props) {
      if (!isEqual(getValue(pre, key), getValue(next, key))) {
        return false;
      }
    }
    return true;
  }
  return isEqual(pre, next);
}
