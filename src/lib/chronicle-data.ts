export interface ChronicleEvent {
  id: string;
  yearsAgo: number; // years before present
  timeLabel: string;
  timeLabelZh: string;
  title: string;
  titleZh: string;
  desc: string;
  descZh: string;
}

const GY = 1e9;
const MY = 1e6;

export const AGE_OF_UNIVERSE = 13.8 * GY;

export const CHRONICLE: ChronicleEvent[] = [
  {
    id: "big-bang", yearsAgo: AGE_OF_UNIVERSE,
    timeLabel: "0 seconds", timeLabelZh: "0 秒",
    title: "The Big Bang", titleZh: "大爆炸",
    desc: "All of space, time, matter and energy erupts from a single point. The universe begins — hotter and denser than anything imaginable.",
    descZh: "空间、时间、物质与能量从一点喷涌而出，宇宙诞生。",
  },
  {
    id: "recombination", yearsAgo: AGE_OF_UNIVERSE - 380000,
    timeLabel: "380,000 years later", timeLabelZh: "38万年后",
    title: "The Universe Turns Transparent", titleZh: "宇宙变透明",
    desc: "The cosmos cools enough for atoms to form. Light travels freely for the first time — we still see this first light today as the cosmic microwave background.",
    descZh: "原子形成，光子第一次自由传播，成为今天的宇宙微波背景。",
  },
  {
    id: "first-stars", yearsAgo: AGE_OF_UNIVERSE - 150 * MY,
    timeLabel: "150 million years later", timeLabelZh: "1.5亿年后",
    title: "The First Stars Ignite", titleZh: "第一批恒星",
    desc: "The dark ages end. Primordial gas clouds collapse under gravity and ignite the first generation of stars, forging elements heavier than hydrogen and helium.",
    descZh: "黑暗时代终结，原始气体云在引力下坍缩，点燃第一代恒星。",
  },
  {
    id: "first-galaxies", yearsAgo: AGE_OF_UNIVERSE - 400 * MY,
    timeLabel: "400 million years later", timeLabelZh: "4亿年后",
    title: "The First Galaxies", titleZh: "第一批星系",
    desc: "Stars gather by the billions into the first galaxies — small, chaotic and furiously forming stars. The deepest telescope images show us their faint light.",
    descZh: "亿万恒星聚集成最早的星系，狂暴而明亮。",
  },
  {
    id: "milky-way", yearsAgo: 11 * GY,
    timeLabel: "11 billion years ago", timeLabelZh: "110亿年前",
    title: "The Milky Way Takes Shape", titleZh: "银河系成形",
    desc: "Our galaxy assembles from merging clouds and smaller galaxies, slowly settling into the spiral disk we live in today.",
    descZh: "我们的星系在合并与吞噬中渐渐长成旋涡。",
  },
  {
    id: "solar-system", yearsAgo: 4.6 * GY,
    timeLabel: "4.6 billion years ago", timeLabelZh: "45亿年前",
    title: "The Solar System Is Born", titleZh: "太阳系诞生",
    desc: "A cloud of gas and dust — seeded with the ashes of dead stars — collapses. The Sun ignites at the center; planets condense from the leftover disk.",
    descZh: "一团承载着死亡恒星灰烬的星云坍缩，太阳点燃，行星凝结。",
  },
  {
    id: "first-life", yearsAgo: 3.8 * GY,
    timeLabel: "3.8 billion years ago", timeLabelZh: "38亿年前",
    title: "Life Appears on Earth", titleZh: "生命出现",
    desc: "In the young oceans, the first single-celled organisms emerge. Every living thing today descends from them.",
    descZh: "年轻的海洋中出现第一批单细胞生命，万物自此一脉相承。",
  },
  {
    id: "oxygen", yearsAgo: 2.4 * GY,
    timeLabel: "2.4 billion years ago", timeLabelZh: "24亿年前",
    title: "The Great Oxidation", titleZh: "大氧化事件",
    desc: "Cyanobacteria flood the atmosphere with oxygen — a planetary catastrophe for ancient life, and the precondition for everything that breathes.",
    descZh: "蓝藻为大气注入氧气，为呼吸的生命铺平道路。",
  },
  {
    id: "multicellular", yearsAgo: 600 * MY,
    timeLabel: "600 million years ago", timeLabelZh: "6亿年前",
    title: "Complex Life", titleZh: "复杂生命",
    desc: "Cells learn to cooperate. Multicellular life blooms, and within a blink — the Cambrian explosion — the oceans fill with eyes, shells and spines.",
    descZh: "细胞学会合作，寒武纪大爆发让海洋充满眼睛与骨骼。",
  },
  {
    id: "dinosaurs", yearsAgo: 66 * MY,
    timeLabel: "66 million years ago", timeLabelZh: "6600万年前",
    title: "The Dinosaurs Fall", titleZh: "恐龙灭绝",
    desc: "A 10-kilometer asteroid strikes the Yucatán. Three quarters of all species vanish — and small mammals inherit an empty world.",
    descZh: "一颗小行星坠落尤卡坦，哺乳动物接管了空出的世界。",
  },
  {
    id: "humans", yearsAgo: 300000,
    timeLabel: "300,000 years ago", timeLabelZh: "30万年前",
    title: "Homo Sapiens", titleZh: "智人出现",
    desc: "In Africa, a species appears that will one day name the stars, measure the age of the universe, and wonder why it exists at all.",
    descZh: "在非洲，一个会为星星命名的物种出现了。",
  },
  {
    id: "civilization", yearsAgo: 10000,
    timeLabel: "10,000 years ago", timeLabelZh: "1万年前",
    title: "Civilization", titleZh: "文明曙光",
    desc: "Farming, cities, writing. Humans begin recording the sky — the same constellations you can explore on this site.",
    descZh: "农耕、城市、文字——人类开始记录星空。",
  },
  {
    id: "today", yearsAgo: 0,
    timeLabel: "Today", timeLabelZh: "今天",
    title: "You Are Reading This", titleZh: "你在读这句话",
    desc: "13.8 billion years of cosmic history led to this moment: starlight in your eyes, stardust in your bones.",
    descZh: "138亿年的历史通向此刻：你的眼中有星光，骨骼里有星尘。",
  },
];

/** Map an event to "cosmic clock" time — 13.8 Gyr compressed into 24 hours. */
export function cosmicClock(yearsAgo: number): string {
  const frac = 1 - yearsAgo / AGE_OF_UNIVERSE;
  const totalSec = Math.min(86399, Math.max(0, Math.round(frac * 86400)));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/** Track position 0..1 — blend of linear & log so late events stay distinguishable. */
export function trackPosition(yearsAgo: number): number {
  const linear = 1 - yearsAgo / AGE_OF_UNIVERSE;
  const log = 1 - Math.log10(yearsAgo + 1) / Math.log10(AGE_OF_UNIVERSE + 1);
  return 0.55 * linear + 0.45 * log;
}
