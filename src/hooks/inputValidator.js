import { useState } from 'react';

const useInputValidator = (
  validationFn = null,
  validationObj = {
    builtInFn: '',
    passwordConfig: {
      minLength: 8,
      maxLength: 20,
      expectedLowerCaseNumber: 1,
      expectedUpperCaseNumber: 1,
      expectedNumberSize: 5,
      expectedSpecialCharSize: 1,
    },
  }
) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isEmpty = value.trim() === '';
  const validator = selectBuildInFn(validationObj.builtInFn, validationFn);

  const valueIsValid =
    validationObj.builtInFn === 'password'
      ? validator.bind(
          null,
          value,
          validationObj.passwordConfig.minLength,
          validationObj.passwordConfig.maxLength,
          validationObj.passwordConfig.expectedLowerCaseNumber,
          validationObj.passwordConfig.expectedUpperCaseNumber,
          validationObj.passwordConfig.expectedNumberSize,
          validationObj.passwordConfig.expectedSpecialCharSize
        )()
      : validator(value);

  const hasError = !valueIsValid && isTouched;

  const onValueBlur = () => {
    setIsTouched(true);
  };

  const handleValueChange = (e) => {
    validationObj.builtInFn === '' && setIsTouched(true);
    setValue(e.target.value);
  };

  const clearValue = () => {
    setValue('');
    setIsTouched(false);
  };

  const callError = () => {
    setIsTouched(true);
  };

  return {
    value,
    hasError,
    isEmpty,
    onValueBlur,
    handleValueChange,
    clearValue,
    callError,
  };
};

export default useInputValidator;

const passwordValidation = (
  password,
  minLength = 8,
  maxLength = 20,
  expectedLowerCaseNumber = 1,
  expectedUpperCaseNumber = 1,
  expectedNumberSize = 5,
  expectedSpecialCharSize = 1
) => {
  const hasValidSize =
    password.toString().length >= minLength &&
    password.toString().length <= maxLength;
  let lowercaseCount = 0;
  let uppercaseCount = 0;
  let specialCharCount = 0;
  let numberCount = 0;

  const regexLowerCase = /[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿıçğ]+/;
  const regexUpperCase = /[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸİÇĞ]+/;
  // eslint-disable-next-line no-useless-escape
  const regexSpecialChars = /[%&()-*\/?$#€\[\]!$£€=@;{}_]+/;

  Array.from(password).forEach((letter) => {
    const isLowercase = regexLowerCase.test(letter);
    const isUppercase = regexUpperCase.test(letter);
    const isSpecialChar = regexSpecialChars.test(letter);

    if (isLowercase) {
      lowercaseCount++;
    }

    if (isUppercase) {
      uppercaseCount++;
    }

    if (isSpecialChar) {
      specialCharCount++;
    }

    if (parseInt(letter, 10)) {
      numberCount++;
    }
  });

  const hasValidUppercaseSize = uppercaseCount >= expectedUpperCaseNumber;
  const hasValidLowercaseSize = lowercaseCount >= expectedLowerCaseNumber;
  const hasValidSpecialCharSize = specialCharCount >= expectedSpecialCharSize;
  const hasValidNumberSize = numberCount >= expectedNumberSize;

  return (
    hasValidSize &&
    hasValidUppercaseSize &&
    hasValidLowercaseSize &&
    hasValidSpecialCharSize &&
    hasValidNumberSize
  );
};

const emailValidation = (email) => {
  const isNotEmpty = email.trim() !== '';
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail = regex.test(email);

  return isNotEmpty && isEmail;
};

//this func is valid for name, surname or middlename but for these validations, developer may also use his/her own func. as a first argument
//to Hook
const textValidation = (name) => {
  const isNotEmpty = name.trim() !== '';
  // eslint-disable-next-line no-useless-escape
  const notAllowedRegex = /[%&()-*\/?$#€\[\]!$£€=@;{}_]+/;
  const hasNotAllowedChars = notAllowedRegex.test(name);
  const hasValidLength = name.length > 1 && name.length <= 40;

  return isNotEmpty && !hasNotAllowedChars && hasValidLength;
};

function selectBuildInFn(type, validationFn) {
  switch (type.toLowerCase()) {
    case 'password':
      return passwordValidation;

    case 'email':
      return emailValidation;

    case 'text':
    case 'name':
    case 'surname':
    case 'middlename':
    case 'city':
    case 'country':
      return textValidation;

    default:
      return validationFn;
  }
}
