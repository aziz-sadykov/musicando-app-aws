/**
 * Return true if email is valid
 *
 * @param email
 */
export const validateEmail = (email: string): boolean => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !(reg.test(email) === false);
};

/**
 * Return false if $text is larger that $min
 *
 * @param text
 * @param min
 */
export const validateMinLength = (text: string, min: number): boolean =>
  text.length < min;

/**
 * Return true if length of string is equal $size
 *
 * @param text
 * @param size
 */
export const validateEqualLength = (text: string, size: number): boolean =>
  text.length === size;
