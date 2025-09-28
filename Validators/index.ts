export const requiredValidator = {
  required: 'This Field Is Required',
};
export const phoneValidator = {
  pattern: {
    value: /^[0-9]{10}$/,
    message: 'Value Must Be A Valid Phone Number',
  },
};
export const emailValidator = {
  pattern: {
    value:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Value Must Be A Valid Email ID',
  },
};
export const requiredSelectValidator = {
  pattern: {
    value: /^[1-9][0-9]*$/,
    message: 'This Field Is Required',
  },
};
export const maxLengthValidator = (value: number) => {
  return {
    maxLength: {
      value: value,
      message: 'Length Of Value Can Be Atmost ' + value.toString(),
    },
  };
};
export const pincodeValidator = {
  pattern: {
    value: /^[0-9]{6}$/,
    message: 'Value Must Be A Valid Pincode',
  },
};
export const decimalValidator = {
  pattern: {
    value: /^(\-){0,1}\d+(\.\d+){0,1}$/,
    message: 'Value Must Be A Decimal',
  },
};
export const numberValidator = {
  pattern: {
    value: /^[0-9]*$/,
    message: 'Value Must Be A Number',
  },
};
export const currencyValidator = {
  pattern: {
    value: /^\d+(\.\d{1,2}){0,1}$/,
    message: 'Value Must Be A Valid Currency Amount',
  },
};
