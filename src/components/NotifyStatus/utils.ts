import successImage from "@assets/statuses/success.png";
import errorImage from "@assets/statuses/error.png";
import notPayedImage from "@assets/statuses/not-payed.png";

export const getStatusConfig = (status: string): Record<string, string> => {
  switch (status) {
    case "success":
      return {
        image: successImage,
        text: "Успешная оплата!",
      };
    case "not-payed":
      return {
        image: notPayedImage,
        text: "Не удалось оплатить",
      };
    case "error":
    default:
      return {
        image: errorImage,
        text: "Упс! Все сломалось... Попробуйте позже",
      };
  }
};
