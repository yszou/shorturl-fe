/**
 * [object String] -> String
 * [object Array] -> Array
 * [object Object] -> Object
 * [object Function] -> Function
 * [object Number] -> Number
 * [object Null] -> Null
 * [object Undefined] -> Undefined
 */

type ReturnType = 'String' | 'Array' | 'Object' | 'Function' | 'Number' | 'Null' | 'Undefined';

export function getType(v: any): ReturnType {
  let s = Object.prototype.toString.call(v);
  s = s.split(' ')[1].replace(']', '');
  return s as ReturnType;
}
