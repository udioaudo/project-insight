export interface ZodiacStar {
  x: number;
  y: number;
  name?: string;
  dist?: string; // light years
}

export interface ZodiacSign {
  id: string;
  en: string;
  zh: string;
  symbol: string;
  dates: string;
  mainStar: string;
  distance: string;
  season: string;
  seasonZh: string;
  bestMonths: number[]; // 1-12, months when visible in evening sky
  ra: string;
  dec: string;
  stars: ZodiacStar[];
  lines: [number, number][];
  myth: string[];
  mythZh: string;
}

export const ZODIAC: ZodiacSign[] = [
  {
    id: "aries", en: "Aries", zh: "白羊座", symbol: "♈", dates: "Mar 21 – Apr 19",
    mainStar: "Hamal", distance: "65.8 ly", season: "Autumn / Winter", seasonZh: "秋冬", bestMonths: [10, 11, 12, 1],
    ra: "02h 38m", dec: "+20° 48′",
    stars: [
      { x: 70, y: 38, name: "Hamal", dist: "65.8 ly" },
      { x: 58, y: 48, name: "Sheratan", dist: "59.6 ly" },
      { x: 52, y: 56, name: "Mesarthim", dist: "164 ly" },
      { x: 30, y: 52, name: "41 Ari", dist: "166 ly" },
    ],
    lines: [[0, 1], [1, 2], [0, 3]],
    myth: [
      "The golden ram of Greek myth carried Phrixus across the sea to Colchis, saving him from sacrifice. In gratitude, the ram offered its own golden fleece — the very fleece Jason and the Argonauts would later pursue across the known world.",
      "Zeus placed the ram among the stars. Its dim stars belie its importance: for two thousand years Aries held the vernal equinox, the point where the Sun crosses into the northern sky and spring begins.",
    ],
    mythZh: "金色公羊驮着佛里克索斯渡海逃生，献出金羊毛，宙斯将其升上星空。",
  },
  {
    id: "taurus", en: "Taurus", zh: "金牛座", symbol: "♉", dates: "Apr 20 – May 20",
    mainStar: "Aldebaran", distance: "65.3 ly", season: "Winter", seasonZh: "冬季", bestMonths: [11, 12, 1, 2],
    ra: "04h 36m", dec: "+16° 31′",
    stars: [
      { x: 48, y: 50, name: "Aldebaran", dist: "65.3 ly" },
      { x: 56, y: 44 }, { x: 60, y: 56 },
      { x: 78, y: 30, name: "Elnath", dist: "134 ly" },
      { x: 80, y: 66, name: "Zeta Tau", dist: "440 ly" },
      { x: 36, y: 46 }, { x: 30, y: 40, name: "Pleiades", dist: "444 ly" },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [5, 6]],
    myth: [
      "Zeus took the form of a magnificent white bull to carry the princess Europa across the sea to Crete. The continent of Europe still bears her name; the bull still swims through the winter sky.",
      "The constellation holds two of the closest star clusters to Earth — the Hyades forming the bull's face, and the Pleiades, the Seven Sisters, riding on its shoulder.",
    ],
    mythZh: "宙斯化身白色公牛，驮着欧罗巴公主渡海至克里特岛。",
  },
  {
    id: "gemini", en: "Gemini", zh: "双子座", symbol: "♊", dates: "May 21 – Jun 21",
    mainStar: "Pollux", distance: "33.8 ly", season: "Winter / Spring", seasonZh: "冬春", bestMonths: [12, 1, 2, 3],
    ra: "07h 04m", dec: "+22° 30′",
    stars: [
      { x: 30, y: 62, name: "Pollux", dist: "33.8 ly" },
      { x: 36, y: 70, name: "Castor", dist: "50.9 ly" },
      { x: 44, y: 48, name: "Wasat", dist: "60.5 ly" },
      { x: 56, y: 30, name: "Alzirr", dist: "58.7 ly" },
      { x: 62, y: 38, name: "Alhena", dist: "109.3 ly" },
      { x: 64, y: 46, name: "Mekbuda", dist: "1376 ly" },
      { x: 66, y: 54, name: "Mebsuta", dist: "845 ly" },
      { x: 48, y: 66 },
      { x: 38, y: 78, name: "Jishui", dist: "166.3 ly" },
    ],
    lines: [[0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1], [1, 8], [0, 1]],
    myth: [
      "Castor and Pollux were twin brothers — one mortal, one divine. When Castor fell in battle, Pollux begged Zeus to share his immortality, refusing eternity without his brother.",
      "Zeus granted them alternating days among the gods and in the underworld, then set them together in the sky — two bright stars side by side, never separated again. Sailors saw them as protectors, the calm lights after a storm.",
    ],
    mythZh: "双子卡斯托与波吕克斯，一人不死一人凡身，宙斯让他们永不分离地并立星空。",
  },
  {
    id: "cancer", en: "Cancer", zh: "巨蟹座", symbol: "♋", dates: "Jun 22 – Jul 22",
    mainStar: "Tarf", distance: "290 ly", season: "Spring", seasonZh: "春季", bestMonths: [1, 2, 3, 4],
    ra: "08h 38m", dec: "+19° 48′",
    stars: [
      { x: 40, y: 70, name: "Tarf", dist: "290 ly" },
      { x: 50, y: 52, name: "Asellus Australis", dist: "131 ly" },
      { x: 52, y: 42, name: "Asellus Borealis", dist: "181 ly" },
      { x: 64, y: 34, name: "Iota Cnc", dist: "330 ly" },
      { x: 62, y: 58, name: "Acubens", dist: "164 ly" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4]],
    myth: [
      "During Heracles' battle with the Hydra, Hera sent a crab to distract the hero. It was crushed underfoot — but Hera, honoring its loyalty, gave it a place in the heavens.",
      "Faint as it is, Cancer hides a treasure: the Beehive Cluster, a swarm of a thousand stars visible to the naked eye on dark nights, known to astronomers since antiquity.",
    ],
    mythZh: "赫拉派巨蟹助九头蛇作战，虽被踩碎，仍被升上天空以表忠诚。",
  },
  {
    id: "leo", en: "Leo", zh: "狮子座", symbol: "♌", dates: "Jul 23 – Aug 22",
    mainStar: "Regulus", distance: "79.3 ly", season: "Spring", seasonZh: "春季", bestMonths: [2, 3, 4, 5],
    ra: "10h 39m", dec: "+13° 11′",
    stars: [
      { x: 62, y: 66, name: "Regulus", dist: "79.3 ly" },
      { x: 60, y: 52 }, { x: 66, y: 42, name: "Algieba", dist: "130 ly" },
      { x: 60, y: 32 }, { x: 50, y: 30, name: "Rasalas", dist: "124 ly" },
      { x: 44, y: 38 },
      { x: 36, y: 56, name: "Zosma", dist: "58.4 ly" },
      { x: 22, y: 60, name: "Denebola", dist: "35.9 ly" },
      { x: 40, y: 68, name: "Chertan", dist: "165 ly" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [1, 6], [6, 7], [7, 8], [8, 0]],
    myth: [
      "The Nemean Lion had a hide no weapon could pierce. Heracles strangled it with his bare hands as the first of his twelve labors, and wore its pelt ever after.",
      "Zeus set the lion among the stars. Its heart is Regulus — 'the little king' — one of the four ancient Royal Stars that marked the seasons for Persian astronomers four thousand years ago.",
    ],
    mythZh: "刀枪不入的涅墨亚狮子被赫拉克勒斯徒手降服，成为其十二伟业之首。",
  },
  {
    id: "virgo", en: "Virgo", zh: "处女座", symbol: "♍", dates: "Aug 23 – Sep 22",
    mainStar: "Spica", distance: "250 ly", season: "Spring / Summer", seasonZh: "春夏", bestMonths: [3, 4, 5, 6],
    ra: "13h 24m", dec: "−11° 10′",
    stars: [
      { x: 64, y: 74, name: "Spica", dist: "250 ly" },
      { x: 56, y: 58 }, { x: 46, y: 50, name: "Porrima", dist: "38.1 ly" },
      { x: 34, y: 44, name: "Zaniah", dist: "265 ly" },
      { x: 24, y: 48, name: "Zavijava", dist: "35.7 ly" },
      { x: 50, y: 36, name: "Vindemiatrix", dist: "110 ly" },
      { x: 70, y: 52, name: "Heze", dist: "74 ly" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [1, 6]],
    myth: [
      "Virgo is Demeter's daughter Persephone — or Astraea, goddess of justice, the last immortal to leave Earth when the Golden Age ended. She carries an ear of wheat: the star Spica.",
      "When Persephone descends to the underworld each year, Demeter mourns and the fields go barren. When Virgo returns to the evening sky, spring returns with her.",
    ],
    mythZh: "正义女神阿斯特赖亚手持麦穗，是黄金时代最后离开人间的神。",
  },
  {
    id: "libra", en: "Libra", zh: "天秤座", symbol: "♎", dates: "Sep 23 – Oct 23",
    mainStar: "Zubeneschamali", distance: "185 ly", season: "Summer", seasonZh: "夏季", bestMonths: [4, 5, 6, 7],
    ra: "15h 11m", dec: "−15° 14′",
    stars: [
      { x: 50, y: 32, name: "Zubeneschamali", dist: "185 ly" },
      { x: 36, y: 50, name: "Zubenelgenubi", dist: "75.8 ly" },
      { x: 60, y: 54, name: "Brachium", dist: "288 ly" },
      { x: 52, y: 70, name: "Upsilon Lib", dist: "195 ly" },
    ],
    lines: [[0, 1], [0, 2], [1, 2], [2, 3]],
    myth: [
      "The only zodiac constellation that is an object, not a creature — the scales of justice held by Astraea, weighing the fates of mortals.",
      "Its two brightest stars still carry Arabic names meaning 'the northern claw' and 'the southern claw': to the Babylonians and early Greeks, these stars belonged to the great Scorpion next door.",
    ],
    mythZh: "黄道十二宫唯一的器物——正义女神手中衡量命运的天平。",
  },
  {
    id: "scorpio", en: "Scorpius", zh: "天蝎座", symbol: "♏", dates: "Oct 24 – Nov 21",
    mainStar: "Antares", distance: "550 ly", season: "Summer", seasonZh: "夏季", bestMonths: [5, 6, 7, 8],
    ra: "16h 53m", dec: "−30° 44′",
    stars: [
      { x: 44, y: 38, name: "Antares", dist: "550 ly" },
      { x: 38, y: 28, name: "Acrab", dist: "400 ly" },
      { x: 32, y: 34, name: "Dschubba", dist: "400 ly" },
      { x: 50, y: 48 }, { x: 52, y: 60 },
      { x: 48, y: 72 }, { x: 56, y: 80 },
      { x: 68, y: 78, name: "Shaula", dist: "570 ly" },
      { x: 72, y: 70, name: "Lesath", dist: "580 ly" },
    ],
    lines: [[1, 2], [2, 0], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
    myth: [
      "The scorpion that killed Orion. Gaia sent it when the great hunter boasted he would slay every animal on Earth. Zeus placed both in the sky — on opposite sides, so Orion sets as Scorpius rises, fleeing forever.",
      "At its heart burns Antares, 'rival of Mars' — a red supergiant so vast that if placed where our Sun is, it would swallow the orbit of Mars itself.",
    ],
    mythZh: "杀死猎户俄里翁的天蝎，与猎户座永远分居天空两端。",
  },
  {
    id: "sagittarius", en: "Sagittarius", zh: "射手座", symbol: "♐", dates: "Nov 22 – Dec 21",
    mainStar: "Kaus Australis", distance: "143 ly", season: "Summer / Autumn", seasonZh: "夏秋", bestMonths: [6, 7, 8, 9],
    ra: "19h 06m", dec: "−27° 32′",
    stars: [
      { x: 36, y: 56, name: "Kaus Australis", dist: "143 ly" },
      { x: 42, y: 44, name: "Kaus Media", dist: "348 ly" },
      { x: 46, y: 32, name: "Kaus Borealis", dist: "78.2 ly" },
      { x: 56, y: 40, name: "Phi Sgr", dist: "239 ly" },
      { x: 66, y: 38, name: "Nunki", dist: "228 ly" },
      { x: 72, y: 48, name: "Ascella", dist: "88 ly" },
      { x: 58, y: 54, name: "Tau Sgr", dist: "122 ly" },
      { x: 28, y: 44, name: "Alnasl", dist: "97 ly" },
    ],
    lines: [[0, 1], [1, 2], [1, 7], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    myth: [
      "The archer is Chiron — wisest of the centaurs, tutor of heroes. Unlike his wild kin, he chose knowledge over chaos, teaching medicine, music, and the names of stars.",
      "His arrow points at the heart of Scorpius — and beyond it, toward the very center of the Milky Way, where a supermassive black hole of four million suns lies hidden behind veils of stardust.",
    ],
    mythZh: "智慧的半人马喀戎，箭头指向银河系的中心。",
  },
  {
    id: "capricorn", en: "Capricornus", zh: "摩羯座", symbol: "♑", dates: "Dec 22 – Jan 19",
    mainStar: "Deneb Algedi", distance: "38.7 ly", season: "Autumn", seasonZh: "秋季", bestMonths: [7, 8, 9, 10],
    ra: "21h 02m", dec: "−18° 02′",
    stars: [
      { x: 28, y: 44, name: "Algedi", dist: "106 ly" },
      { x: 32, y: 52, name: "Dabih", dist: "328 ly" },
      { x: 48, y: 66, name: "Omega Cap", dist: "1000 ly" },
      { x: 64, y: 60, name: "Nashira", dist: "157 ly" },
      { x: 72, y: 50, name: "Deneb Algedi", dist: "38.7 ly" },
      { x: 52, y: 46, name: "Theta Cap", dist: "162 ly" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    myth: [
      "When the monster Typhon stormed Olympus, the god Pan leapt into the Nile mid-transformation — goat above the water, fish below. The sea-goat has swum the sky ever since.",
      "To the Babylonians this was the goat-fish of Ea, god of deep waters and wisdom, rising at the winter solstice when the Sun begins its long climb back toward spring.",
    ],
    mythZh: "潘神跳入尼罗河，上半身为羊、下半身为鱼，化作海山羊。",
  },
  {
    id: "aquarius", en: "Aquarius", zh: "水瓶座", symbol: "♒", dates: "Jan 20 – Feb 18",
    mainStar: "Sadalsuud", distance: "540 ly", season: "Autumn", seasonZh: "秋季", bestMonths: [8, 9, 10, 11],
    ra: "22h 17m", dec: "−10° 47′",
    stars: [
      { x: 30, y: 40, name: "Sadalsuud", dist: "540 ly" },
      { x: 44, y: 36, name: "Sadalmelik", dist: "520 ly" },
      { x: 52, y: 42, name: "Sadachbia", dist: "164 ly" },
      { x: 58, y: 38 }, { x: 62, y: 46 },
      { x: 56, y: 58, name: "Skat", dist: "113 ly" },
      { x: 48, y: 72 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6]],
    myth: [
      "Ganymede, the most beautiful of mortals, was carried to Olympus by Zeus's eagle to be cupbearer to the gods, pouring nectar from a golden vessel.",
      "The 'water' he pours is a stream of faint stars flowing toward the Southern Fish. This entire region of sky was the Babylonian 'Sea' — home of fish, whales, and rivers of stars.",
    ],
    mythZh: "美少年伽倪墨得斯为众神斟酒，瓶中流出星星之水。",
  },
  {
    id: "pisces", en: "Pisces", zh: "双鱼座", symbol: "♓", dates: "Feb 19 – Mar 20",
    mainStar: "Eta Piscium", distance: "350 ly", season: "Autumn / Winter", seasonZh: "秋冬", bestMonths: [9, 10, 11, 12],
    ra: "00h 28m", dec: "+13° 41′",
    stars: [
      { x: 70, y: 70, name: "Alrescha", dist: "139 ly" },
      { x: 60, y: 58 }, { x: 48, y: 50, name: "Eta Psc", dist: "350 ly" },
      { x: 38, y: 40 }, { x: 30, y: 30 },
      { x: 76, y: 58 }, { x: 82, y: 48, name: "Fum al Samakah", dist: "492 ly" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6]],
    myth: [
      "Aphrodite and her son Eros, fleeing the monster Typhon, transformed into fish and dove into the Euphrates — tied together by a cord so they would never be parted.",
      "The knot of that cord is the star Alrescha. Today the vernal equinox lies in Pisces: every spring begins, invisibly, among these faint stars.",
    ],
    mythZh: "爱神母子化作双鱼跳入河中，用丝带相连，永不分离。",
  },
];

/** Is this constellation reasonably visible in tonight's evening sky? */
export function visibleTonight(sign: ZodiacSign, date = new Date()): boolean {
  return sign.bestMonths.includes(date.getMonth() + 1);
}

/** The zodiac sign for the current date (sun sign month). */
export function currentSignIndex(date = new Date()): number {
  const m = date.getMonth(); // 0-11
  const d = date.getDate();
  // day each month when the sign changes (Jan..Dec)
  const cutoff = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
  // sign index that BEGINS at that month's cutoff (Jan 20 → Aquarius=10, ...)
  const signAtCutoff = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return d >= cutoff[m] ? signAtCutoff[m] : signAtCutoff[(m + 11) % 12];
}
