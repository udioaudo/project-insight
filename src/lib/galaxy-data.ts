import andromeda from "@/assets/galaxy-andromeda.jpg";
import whirlpool from "@/assets/galaxy-whirlpool.jpg";
import m87 from "@/assets/galaxy-m87.jpg";
import sombrero from "@/assets/galaxy-sombrero.jpg";
import lmc from "@/assets/galaxy-lmc.jpg";
import m49 from "@/assets/galaxy-m49.jpg";
import cartwheel from "@/assets/galaxy-cartwheel.jpg";
import spindle from "@/assets/galaxy-spindle.jpg";

export type GalaxyType = "spiral" | "elliptical" | "irregular" | "lenticular";

export const GALAXY_TYPES: { id: GalaxyType; en: string; zh: string }[] = [
  { id: "elliptical", en: "Elliptical", zh: "椭圆星系" },
  { id: "spiral", en: "Spiral", zh: "旋涡星系" },
  { id: "irregular", en: "Irregular", zh: "不规则星系" },
  { id: "lenticular", en: "Lenticular", zh: "透镜状星系" },
];

export interface Galaxy {
  id: string;
  name: string;
  nameZh: string;
  type: GalaxyType;
  image: string;
  distance: string;
  diameterLy: number; // light years
  diameterLabel: string;
  fact: string;
  factZh: string;
}

export const MILKY_WAY_DIAMETER = 100000;

export const GALAXIES: Galaxy[] = [
  {
    id: "andromeda", name: "Andromeda · M31", nameZh: "仙女座星系", type: "spiral", image: andromeda,
    distance: "2.5 million ly", diameterLy: 220000, diameterLabel: "220,000 ly",
    fact: "The most distant object visible to the naked eye — and it's heading toward us. In ~4.5 billion years it will merge with the Milky Way.",
    factZh: "肉眼可见的最遥远天体，正以每秒110公里向银河系靠近。",
  },
  {
    id: "whirlpool", name: "Whirlpool · M51", nameZh: "涡状星系", type: "spiral", image: whirlpool,
    distance: "23 million ly", diameterLy: 60000, diameterLabel: "60,000 ly",
    fact: "Its perfect spiral arms are sculpted by a gravitational dance with the small companion galaxy tugging at its edge.",
    factZh: "完美的旋臂由旁边小星系的引力之舞雕刻而成。",
  },
  {
    id: "m87", name: "Messier 87", nameZh: "室女A星系", type: "elliptical", image: m87,
    distance: "53 million ly", diameterLy: 240000, diameterLabel: "240,000 ly",
    fact: "Home of the first black hole ever photographed — a monster of 6.5 billion solar masses firing a jet of plasma 5,000 light-years long.",
    factZh: "人类拍到的第一个黑洞就在这里，质量是太阳的65亿倍。",
  },
  {
    id: "m49", name: "Messier 49", nameZh: "M49 椭圆星系", type: "elliptical", image: m49,
    distance: "56 million ly", diameterLy: 157000, diameterLabel: "157,000 ly",
    fact: "The brightest galaxy in the Virgo Cluster. Almost no new stars form here — it glows with the amber light of ancient suns.",
    factZh: "室女座星系团中最亮的星系，几乎不再诞生新恒星。",
  },
  {
    id: "lmc", name: "Large Magellanic Cloud", nameZh: "大麦哲伦云", type: "irregular", image: lmc,
    distance: "160,000 ly", diameterLy: 14000, diameterLabel: "14,000 ly",
    fact: "A satellite galaxy of the Milky Way, visible from the southern hemisphere. It hosts the Tarantula Nebula — the most violent star factory nearby.",
    factZh: "银河系的卫星星系，南半球肉眼可见。",
  },
  {
    id: "cartwheel", name: "Cartwheel Galaxy", nameZh: "车轮星系", type: "irregular", image: cartwheel,
    distance: "500 million ly", diameterLy: 144000, diameterLabel: "144,000 ly",
    fact: "Its ring is a shockwave — a smaller galaxy punched straight through its center 200 million years ago, triggering a ripple of star birth.",
    factZh: "两亿年前一个小星系从中心穿过，激起一圈恒星诞生的涟漪。",
  },
  {
    id: "sombrero", name: "Sombrero · M104", nameZh: "草帽星系", type: "lenticular", image: sombrero,
    distance: "29 million ly", diameterLy: 50000, diameterLabel: "50,000 ly",
    fact: "Halfway between spiral and elliptical, with a brilliant bulge and a dramatic dust lane — and some 2,000 globular clusters swarming around it.",
    factZh: "介于旋涡与椭圆之间，明亮核球外缠绕着一条壮观尘埃带。",
  },
  {
    id: "spindle", name: "Spindle · NGC 5866", nameZh: "纺锤星系", type: "lenticular", image: spindle,
    distance: "50 million ly", diameterLy: 60000, diameterLabel: "60,000 ly",
    fact: "Seen perfectly edge-on, its razor-thin dust lane slices the lens of stars in two — a galaxy viewed like a coin on its side.",
    factZh: "完美的侧视角度，纤细尘埃带将星盘一分为二。",
  },
];
