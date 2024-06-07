export const isValidURL = (string: string) => {
  const regex =
    /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}(:\d+)?)(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[\d&a-zA-Z_=%.~+-]*)?(#[\d&a-zA-Z_=%.~+-]*)?$/
  return regex.test(string)
}

export const isValidEmail = (string: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(string)
}
