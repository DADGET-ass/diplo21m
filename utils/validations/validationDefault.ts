
export const validationDefault = (value: string) => {
  if (!value) {
    return 'Недопустимые символы'
  }

  return '';
}