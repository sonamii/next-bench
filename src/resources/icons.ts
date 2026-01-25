import { IconType } from "react-icons";

import {
  HiArrowRight,
  HiChevronDown,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  arrowRight: HiArrowRight,
  chevronDown: HiChevronDown

};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;