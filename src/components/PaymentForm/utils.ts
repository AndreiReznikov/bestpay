export const maskCardInput = (target: HTMLInputElement) => {
  const start = target.selectionStart ?? 0;
  const oldValue = target.value;

  let rawValue = target.value.replace(/\D/g, "");

  let newValue = "";
  for (let i = 0; i < rawValue.length; i++) {
    if (i > 0 && i % 4 === 0) {
      newValue += " ";
    }
    newValue += rawValue[i];
  }

  if (oldValue !== newValue) {
    target.value = newValue;

    const oldSpaces = (oldValue.substring(0, start).match(/ /g) || []).length;
    const newSpaces = (newValue.substring(0, start).match(/ /g) || []).length;
    const newPosition = start + (newSpaces - oldSpaces);

    target.setSelectionRange(newPosition, newPosition);
  }
};

export const maskDateInput = (target: HTMLInputElement) => {
  let value = target.value.replace(/\D/g, "");
  value = value.slice(0, 4);

  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }

  target.value = value;
};

export const maskCvvInput = (target: HTMLInputElement) => {
  target.value = target.value.replace(/\D/g, "");
};

export const checkCard = (cardNumber: string) => {
  if (!/^\d+$/.test(cardNumber)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const checkIsDateValid = (month: number, year: number) => {
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const validateCard = (value: string): string => {
  if (checkCard(value.replace(/\s/g, ""))) {
    return "";
  }

  return "Неверный номер карты";
};

export const validateDate = (value: string): string => {
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return "Неверный формат MM/YY";
  } else {
    const [month, year] = value.split("/").map(Number);

    if (month < 1 || month > 12) {
      return "Неверно введён месяц";
    }

    if (!checkIsDateValid(month, year)) {
      return "Срок действия карты истёк";
    }
  }

  return "";
};

export const validateCvv = (value: string): string => {
  if (value.length < 3) {
    return "Минимум три цифры";
  }

  return "";
};
