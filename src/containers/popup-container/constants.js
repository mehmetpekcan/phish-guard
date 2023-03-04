import {
  BsShieldFillCheck,
  BsShieldFillExclamation,
  BsShieldFillX,
} from "react-icons/bs";

export const STATUS = {
  SECURE: "secure",
  INSECURE: "insecure",
  WARN: "warn",
};

export const STATUS_ICONS = {
  [STATUS.SECURE]: BsShieldFillCheck,
  [STATUS.INSECURE]: BsShieldFillX,
  [STATUS.WARN]: BsShieldFillExclamation,
};

export const STATUS_TITLES = {
  [STATUS.SECURE]: "Secure",
  [STATUS.INSECURE]: "Insecure",
  [STATUS.WARN]: "Maybe Insecure",
};

export const STATUS_DESCRIPTION = {
  [STATUS.SECURE]: "You're protected by the phishing security features.",
  [STATUS.INSECURE]: "You're not protected by the phishing security features.",
  [STATUS.WARN]:
    "You may not be protected by the phishing security features. Be careful!",
};
