export const deepEqual = (a: object | null, b: object | null) => {
  if (a === b) {
    return true;
  }

  if (a == null || typeof(a) !== "object" ||
    b == null || typeof(b) !== "object")
  {
    return false;
  }

  let propertiesInA = 0, propertiesInB = 0;
  for (const _ in a) {
    propertiesInA += 1;
  }
  for (const property in b) {
    propertiesInB += 1;
    if (!(property in a) || !deepEqual(a[property], b[property])) {
      return false;
    }
  }
  return propertiesInA === propertiesInB;
};

export function deepCopy<T>(inObject: T) {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value)
  }

  return outObject as T
};
