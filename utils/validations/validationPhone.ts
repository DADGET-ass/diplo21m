export const validationPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
  
    if (!cleanedValue) {
      return 'Поле обязательно';
    }
  
    if (!/^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
      return 'Некорректный формат номера телефона';
    }
  
    if (!/^\+?\d+$/.test(cleanedValue)) {
      return 'Номер телефона должен содержать только цифры';
    }
  
    if (cleanedValue.length !== 11) {
      return 'Номер телефона должен состоять из 11 цифр';
    }
  
    return '';
};  