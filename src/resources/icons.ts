import { IconType } from "react-icons";
import { CgArrowTopRight } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";

import {
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiChevronDown,
  HiOutlineRocketLaunch,
  HiStar,
} from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineHouse } from "react-icons/md";
import { RxArrowTopRight } from "react-icons/rx";
import { TfiArrowTopRight } from "react-icons/tfi";
import { TiUserOutline } from "react-icons/ti";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  arrowRight: HiArrowRight,
  chevronDown: HiChevronDown,
  star:HiStar,
  arrowTopRight: RxArrowTopRight,
  userOutline: TiUserOutline,
  luggageOutline:IoBagOutline,
  buildingOutline: MdOutlineHouse,
  circleCheckOutline: CiCircleCheck

};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;