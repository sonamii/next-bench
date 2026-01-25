import { IconType } from "react-icons";
import { AiOutlineApartment } from "react-icons/ai";
import { CgArrowTopRight } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import {
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiChevronDown,
  HiOutlineRocketLaunch,
  HiStar,
} from "react-icons/hi2";
import { IoBagOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { MdOutlineHouse, MdOutlineLuggage } from "react-icons/md";
import { RxArrowTopRight } from "react-icons/rx";
import { TbBrandFacebook, TbBrandGithub, TbBrandInstagram, TbBrandTwitter, TbMail, TbMailAi, TbX } from "react-icons/tb";
import { TfiArrowTopRight } from "react-icons/tfi";
import { TiUserOutline } from "react-icons/ti";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  arrowRight: HiArrowRight,
  chevronDown: HiChevronDown,
  star:HiStar,
  arrowTopRight: RxArrowTopRight,
  userOutline: TiUserOutline,
  luggageOutline:MdOutlineLuggage,
  buildingOutline: AiOutlineApartment,
  circleCheckOutline: CiCircleCheck,
  facebook: TbBrandFacebook,
  instagram:  TbBrandInstagram,
  github: TbBrandGithub,
  twitter: TbBrandTwitter,
  mail: TbMail,
  sun: IoSunnyOutline,
  moon: IoMoonOutline

};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;