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