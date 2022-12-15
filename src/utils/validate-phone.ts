/* eslint-disable import/prefer-default-export */
export const validatePhone = (text: string) => {
  if (text.length > 0) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(String(text).toLowerCase());
  }

  return true;
};
