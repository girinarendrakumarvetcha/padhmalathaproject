export const required = key => value => {
  if (value) {
    return undefined;
  }
  return `${key} is required`;
};

export const minLength = len => value => {
  if (value && value.length < len) {
    return `Field must contain minimum ${len} or more`;
  }
  return undefined;
};

// export const conformPassword = key => value => {
//   return "Confirm password must be same as new password";
// };

export const maxLength = key => value => {
  if (value.length > key) {
    return "You have reached your maximum limit of characters allowed";
  }
};

export const validEmail = value => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) {
    return "Please entaer Valid email";
  }
};

export const validEmaiFP = value => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) {
    return "Please entaer Valid email";
  }
};

export const validPass = value => {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  if (!re.test(String(value))) {
    return "Please entaer Valid Password";
    // return "Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
  }
};

export const validPhone = value => {
  var re = /^(0|[1-9][0-9]*){10,10}$/;
  if (!re.test(String(value)) || value.length !== 10) {
    return "Please entaer Valid Phone Number";
  }
};

export const validDob = value => {
  if (+new Date() < +new Date(value)) {
    return "Birth day should not be more then today";
  }
};

export const uniqueEmailCall = () => {
  return "Email you entered is already exhisted";
};

// export const maxLen = len => value => {
//   if (value && value.length > len) {
//     return `Field must contain maximum ${len} or less`;
//   }
//   return undefined;
// };
