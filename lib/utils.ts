import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { formatChildName, formatChildFirstName } from "./utils/format-child-name";
export {
  shouldAutoOpenTutorial,
  markTutorialAsSeen,
  getTutorialStorageKey,
} from "./utils/game-tutorial-session";
