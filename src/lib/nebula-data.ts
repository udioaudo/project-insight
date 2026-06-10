import orion from "@/assets/nebula-orion.jpg";
import pillars from "@/assets/nebula-pillars.jpg";
import horsehead from "@/assets/nebula-horsehead.jpg";
import witchhead from "@/assets/nebula-witchhead.jpg";
import ring from "@/assets/nebula-ring.jpg";
import helix from "@/assets/nebula-helix.jpg";
import crab from "@/assets/nebula-crab.jpg";
import veil from "@/assets/nebula-veil.jpg";

export type NebulaType = "emission" | "reflection" | "dark" | "planetary" | "supernova";

export const NEBULA_TYPES: { id: NebulaType; en: string; zh: string }[] = [
  { id: "emission", en: "Emission", zh: "发射星云" },
  { id: "reflection", en: "Reflection", zh: "反射星云" },
  { id: "dark", en: "Dark", zh: "暗星云" },
  { id: "planetary", en: "Planetary", zh: "行星状星云" },
  { id: "supernova", en: "Supernova Remnant", zh: "超新星遗迹" },
];

export interface Nebula {
  id: string;
  name: string;
  nameZh: string;
  type: NebulaType;
  image: string;
  w: number;
  h: number;
  distance: string;
  story: string;
  storyZh: string;
}

export const COLOR_CODE = [
  { color: "#C1440E", el: "Hydrogen", elZh: "氢", note: "red — ionized H-alpha" },
  { color: "#4DA167", el: "Oxygen", elZh: "氧", note: "green — doubly ionized O III" },
  { color: "#4A90B8", el: "Dust / O III", elZh: "尘埃", note: "blue — reflected starlight" },
  { color: "#C9A84C", el: "Sulfur", elZh: "硫", note: "amber — ionized S II" },
];

export const NEBULAE: Nebula[] = [
  {
    id: "orion", name: "Orion Nebula · M42", nameZh: "猎户座大星云", type: "emission", image: orion, w: 768, h: 960,
    distance: "1,344 ly",
    story: "This is a stellar nursery in full labor. Inside these glowing clouds, gravity is collapsing gas into hundreds of newborn stars; their fierce ultraviolet light makes the surrounding hydrogen blaze red. In a few million years, the winds of these young stars will blow the nebula apart.",
    storyZh: "这是一座正在分娩的恒星育婴室，数百颗新生恒星的紫外线让氢云燃烧成红色。",
  },
  {
    id: "pillars", name: "Pillars of Creation", nameZh: "创生之柱", type: "emission", image: pillars, w: 768, h: 1152,
    distance: "6,500 ly",
    story: "Towers of cold gas five light-years tall, being eroded from outside by the radiation of nearby giant stars. Inside their fingertips, new stars are condensing — birth and destruction in the same image.",
    storyZh: "五光年高的冷气体之柱，外部被侵蚀，指尖内却有新恒星正在凝结。",
  },
  {
    id: "horsehead", name: "Horsehead Nebula", nameZh: "马头星云", type: "dark", image: horsehead, w: 960, h: 768,
    distance: "1,375 ly",
    story: "A cloud so dense and cold that it swallows the light behind it. The horse's silhouette is dust that will, over millions of years, be eroded away by radiation — or collapse into stars of its own.",
    storyZh: "稠密寒冷的尘埃云吞噬了身后的光，剪影如马首昂立。",
  },
  {
    id: "witchhead", name: "Witch Head Nebula", nameZh: "女巫头星云", type: "reflection", image: witchhead, w: 768, h: 896,
    distance: "900 ly",
    story: "This nebula makes no light of its own. Its fine dust grains scatter the blue light of the brilliant star Rigel — the same physics that makes Earth's sky blue, painted across nine light-years.",
    storyZh: "它自己不发光，只是把参宿七的蓝光散射开来——和地球天空变蓝是同一种物理。",
  },
  {
    id: "ring", name: "Ring Nebula · M57", nameZh: "环状星云", type: "planetary", image: ring, w: 768, h: 768,
    distance: "2,283 ly",
    story: "A sun-like star is dying gently here. Having exhausted its fuel, it has shrugged off its outer layers into a glowing ring; the tiny white dot at the center is the exposed core — a white dwarf that will cool for eternity. Our Sun will do this in about 5 billion years.",
    storyZh: "一颗类太阳恒星正温柔地死去，中心白点是它裸露的核心。50亿年后，太阳也会如此。",
  },
  {
    id: "helix", name: "Helix Nebula", nameZh: "螺旋星云", type: "planetary", image: helix, w: 960, h: 832,
    distance: "655 ly",
    story: "The closest planetary nebula to Earth — sometimes called the Eye of God. The shells of gas span 2.5 light-years; the central white dwarf is destined to fade into a cold, dark cinder.",
    storyZh: "离地球最近的行星状星云，被称为「上帝之眼」。",
  },
  {
    id: "crab", name: "Crab Nebula · M1", nameZh: "蟹状星云", type: "supernova", image: crab, w: 768, h: 1024,
    distance: "6,500 ly",
    story: "In the year 1054, Chinese astronomers recorded a 'guest star' bright enough to see in daylight. This is its corpse: a shredded star expanding at 1,500 km/s, with a pulsar at its heart spinning 30 times per second.",
    storyZh: "公元1054年，中国天文学家记录了一颗白昼可见的「客星」——这就是它的遗骸。",
  },
  {
    id: "veil", name: "Veil Nebula", nameZh: "面纱星云", type: "supernova", image: veil, w: 960, h: 704,
    distance: "2,400 ly",
    story: "Ten thousand years ago a star twenty times the Sun's mass tore itself apart. These delicate ribbons are the shockwave still racing through interstellar gas — heavy elements scattering, one day to seed new worlds.",
    storyZh: "一万年前一颗大质量恒星粉碎了自己，这些丝带正把重元素撒向未来的世界。",
  },
];
