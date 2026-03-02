export const maskMoneyInput = (target: HTMLInputElement, decimalCount = 2) => {
  const start = target.selectionStart || 0;
  const oldValue = target.value;

  const oldDigitsBeforeCursor = (
    oldValue.substring(0, start).match(/\d/g) || []
  ).length;
  const oldCommasBeforeCursor = (oldValue.substring(0, start).match(/,/g) || [])
    .length;

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

    let newPosition = 0;

    if (rawValue) {
      let rawPos = oldDigitsBeforeCursor;

      if (oldCommasBeforeCursor > 0) {
        rawPos = oldDigitsBeforeCursor;
      }

      if (wasCommaAdded) {
        rawPos++;
      }

      const [integerPart] = rawValue.split(",");
      const integerLength = integerPart.length;

      let spacesCount = 0;
      if (rawPos <= integerLength) {
        for (let i = 3; i < rawPos; i += 3) {
          spacesCount++;
        }
        newPosition = rawPos + spacesCount;
      } else {
        for (let i = 3; i <= integerLength; i += 3) {
          spacesCount++;
        }

        const fractionPos = rawPos - integerLength - 1;
        newPosition = integerLength + spacesCount + 1 + fractionPos;
      }
    }

    newPosition = Math.min(newPosition, newValue.length);
    target.setSelectionRange(newPosition, newPosition);
  }
};

export const validateMoney = (value: string) => {
  const numericValue = parseFloat(value.replace(/\s/g, "").replace(",", "."));

  if (numericValue < 1 || numericValue > 1000000) {
    return "Сумма должна быть от 1 до 1 000 000₽";
  }

  return "";
};

export const validateDescription = (value: string) => {
  if (value.length > 200) {
    return "Не больше 200 символов";
  }

  return "";
};
