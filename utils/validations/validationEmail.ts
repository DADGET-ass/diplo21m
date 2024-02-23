export const validationEmail = (value: string) => {
    if (!value) {
      return 'Поле обязательно';
    }
  
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Недопустимый формат e-mail';
    }
  
    return '';
};