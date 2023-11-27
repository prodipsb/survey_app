export const numericSymbol: RegExp = /^[0-9!@#$%^&*]*$/;
export const alphanumericAndSymbol: RegExp = /^[a-zA-Z0-9 ]+$/;
export const numericRegex: RegExp = /^[0-9]*$/;
export const nineDigit: RegExp = /^\d{1,9}$/;
export const numberhiphen: RegExp = /^[\d-]{1,14}$/;
export const digituptoEleven: RegExp = /^[0-9]{1,11}$/;
export const emailRegex: RegExp = /^[a-zA-Z0-9@.]+$/;
export const digituptoSix: RegExp = /^[0-9]{1,6}$/;
export const emailExactRegex: RegExp =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const exactBin: RegExp = /^\d{9}-\d{4}$/;
export const exactMobile: RegExp = /^\d{11}$/;
export const exactEmail: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
