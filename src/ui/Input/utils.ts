export const maskMoneyInput = (target: HTMLInputElement, decimalCount = 2) => {
  const start = target.selectionStart || 0;
  const oldValue = target.value;

  let rawValue = target.value.replace(/\s/g, "");

  const wasCommaAdded =
    oldValue.length < rawValue.length &&
    rawValue.includes(",") &&
    !oldValue.includes(",");

  if (wasCommaAdded) {
    const commaPos = rawValue.indexOf(",");
    const beforeComma = rawValue.substring(0, commaPos);
    if (beforeComma === "") {
      rawValue = "0" + rawValue;
    }
  }

  if (rawValue.startsWith(",") && !wasCommaAdded) {
    rawValue = "0" + rawValue;
  }

  rawValue = rawValue.replace(/[^\d,]/g, "");

  if (rawValue.length > 1 && rawValue !== "0," && !rawValue.startsWith("0,")) {
    rawValue = rawValue.replace(/^0+/, "");
  }

  if (rawValue === "" && oldValue === "0") {
    rawValue = "0";
  }

  const commaCount = (rawValue.match(/,/g) || []).length;
  if (commaCount > 1) {
    const firstComma = rawValue.indexOf(",");
    rawValue =
      rawValue.slice(0, firstComma + 1) +
      rawValue.slice(firstComma + 1).replace(/,/g, "");
  }

  if (rawValue.includes(",")) {
    const parts = rawValue.split(",");
    if (parts[1].length > decimalCount) {
      parts[1] = parts[1].slice(0, decimalCount);
      rawValue = parts.join(",");
    }
  }

  let newValue = rawValue;
  if (rawValue && rawValue !== "0") {
    const parts = rawValue.split(",");
    if (parts[0].length > 0 && parts[0] !== "0") {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else if (parts[0] === "0" && parts.length > 1) {
      newValue = "0," + (parts[1] || "");
    }
    newValue = parts.join(",");
  }

  if (oldValue !== newValue) {
    target.value = newValue;

    let newPosition = start;

    if (wasCommaAdded && newValue.length > oldValue.length) {
      newPosition = start + 1;
    }

    if (newValue.length < oldValue.length && start > 0) {
      newPosition = start - 1;
    }

    newPosition = Math.min(newPosition, newValue.length);
    target.setSelectionRange(newPosition, newPosition);
  }
};

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

export const checkIsDateValid = (month: number, year: number) => {
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};
