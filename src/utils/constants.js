const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const message = {
  validationMessage: {
    incorrectEmail: "Необходимо ввести корректный email-адрес",
    emptySearchText: "Нужно ввести ключевое слово",
  },
};

export { emailRegex, message };
