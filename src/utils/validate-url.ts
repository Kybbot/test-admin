/* eslint-disable import/prefer-default-export */
export const validateUrl = (text: string) => {
  if (text.length > 0) {
    const re = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
    return re.test(String(text).toLowerCase());
  }

  return true;
};
