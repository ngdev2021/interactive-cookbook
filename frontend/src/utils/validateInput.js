export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateText = (text, minLength = 3) => {
  return text && text.length >= minLength;
};
