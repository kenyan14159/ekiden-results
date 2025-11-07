export interface MiyakoojiMenResult {
  count?: number;
  year: number;
  team?: {
    name: string;
    prefecture: string;
  };
  teams?: Array<{
    name: string;
    prefecture: string;
  }>;
  times?: string[];
  time?: string;
  canceled?: boolean;
  text?: string;
}

export const miyakoojiMenResults: MiyakoojiMenResult[] = [
  {count: 75, year: 2024, team: { name: '佐久長聖', prefecture: '長野' }, time: '2:01:33'},
  {count: 74, year: 2023, team: { name: '佐久長聖', prefecture: '長野' }, time: '2:01:00'},
  {count: 73, year: 2022, team: { name: '倉敷', prefecture: '岡山' }, time: '2:01:10'},
  {count: 72, year: 2021, team: { name: '世羅', prefecture: '広島' }, time: '2:01:21'},
  {count: 71, year: 2020, team: { name: '世羅', prefecture: '広島' }, time: '2:01:31'},
  {count: 70, year: 2019, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:01:32'},
  {count: 69, year: 2018, team: { name: '倉敷', prefecture: '岡山' }, time: '2:02:09'},
  {count: 68, year: 2017, team: { name: '佐久長聖', prefecture: '長野' }, time: '2:02:44'},
  {count: 67, year: 2016, team: { name: '倉敷', prefecture: '岡山' }, time: '2:02:34'},
  {count: 66, year: 2015, team: { name: '世羅', prefecture: '広島' }, time: '2:01:18'},
  {count: 65, year: 2014, team: { name: '世羅', prefecture: '広島' }, time: '2:02:39'},
  {count: 64, year: 2013, team: { name: '山梨学院大附', prefecture: '山梨' }, time: '2:03:53'},
  {count: 63, year: 2012, team: { name: '豊川', prefecture: '愛知' }, time: '2:02:55'},
  {count: 62, year: 2011, team: { name: '世羅', prefecture: '広島' }, time: '2:03:50'},
  {count: 61, year: 2010, team: { name: '鹿児島実', prefecture: '鹿児島' }, time: '2:03:59'},
  {count: 60, year: 2009, team: { name: '世羅', prefecture: '広島' }, time: '2:04:09'},
  {count: 59, year: 2008, team: { name: '佐久長聖', prefecture: '長野' }, time: '2:02:18'},
  {count: 58, year: 2007, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:03:55'},
  {count: 57, year: 2006, team: { name: '世羅', prefecture: '広島' }, time: '2:03:18'},
  {count: 56, year: 2005, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:05:04'},
  {count: 55, year: 2004, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:01:32'},
  {count: 54, year: 2003, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:02:07'},
  {count: 53, year: 2002, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:04:03'},
  {count: 52, year: 2001, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:03:46'},
  {count: 51, year: 2000, team: { name: '大牟田', prefecture: '福岡' }, time: '2:04:48'},
  {count: 50, year: 1999, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:05:04'},
  {count: 49, year: 1998, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:03:32'},
  {count: 48, year: 1997, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:03:18'},
  {count: 47, year: 1996, team: { name: '報徳', prefecture: '兵庫' }, time: '2:05:08'},
  {count: 46, year: 1995, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:05:20'},
  {count: 45, year: 1994, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:03:21'},
  {count: 44, year: 1993, team: { name: '仙台育英', prefecture: '宮城' }, time: '2:05:25'},
  {count: 43, year: 1992, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:05:12'},
  {count: 42, year: 1991, team: { name: '大牟田', prefecture: '福岡' }, time: '2:06:47'},
  {count: 41, year: 1990, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:05:44'},
  {count: 40, year: 1989, team: { name: '報徳', prefecture: '兵庫' }, time: '2:04:49'},
  {count: 39, year: 1988, team: { name: '大牟田', prefecture: '福岡' }, time: '2:05:53'},
  {count: 38, year: 1987, team: { name: '埼玉栄', prefecture: '埼玉' }, time: '2:05:57'},
  {count: 37, year: 1986, team: { name: '市立船橋', prefecture: '千葉' }, time: '2:06:30'},
  {count: 36, year: 1985, team: { name: '報徳', prefecture: '兵庫' }, time: '2:06:43'},
  {count: 35, year: 1984, team: { name: '報徳', prefecture: '兵庫' }, time: '2:08:05'},
  {count: 34, year: 1983, team: { name: '報徳', prefecture: '兵庫' }, time: '2:07:04'},
  {count: 33, year: 1982, team: { name: '西脇工業', prefecture: '兵庫' }, time: '2:10:23'},
  {count: 32, year: 1981, team: { name: '報徳', prefecture: '兵庫' }, time: '2:10:23'},
  {count: 31, year: 1980, team: { name: '中京商業', prefecture: '岐阜' }, time: '2:10:07'},
  {count: 30, year: 1979, team: { name: '中京商業', prefecture: '岐阜' }, time: '2:10:55'},
  {count: 29, year: 1978, team: { name: '小林', prefecture: '宮崎' }, time: '2:10:57'},
  {count: 28, year: 1977, team: { name: '小林', prefecture: '宮崎' }, time: '2:10:43'},
  {count: 27, year: 1976, team: { name: '大牟田', prefecture: '福岡' }, time: '2:09:57'},
  {count: 26, year: 1975, team: { name: '大牟田', prefecture: '福岡' }, time: '2:09:11'},
  {count: 25, year: 1974, team: { name: '世羅', prefecture: '広島' }, time: '2:08:40'},
  {count: 24, year: 1973, team: { name: '小林', prefecture: '宮崎' }, time: '2:11:56'},
  {count: 23, year: 1972, team: { name: '世羅', prefecture: '広島' }, time: '2:12:59'},
  {count: 22, year: 1971, team: { name: '中津商業', prefecture: '大分' }, time: '2:11:47'},
  {count: 21, year: 1970, team: { name: '相原', prefecture: '神奈川' }, time: '2:11:36'},
  {count: 20, year: 1969, team: { name: '福大大濠', prefecture: '福岡' }, time: '2:10:08'},
  {count: 19, year: 1968, team: { name: '小林', prefecture: '宮崎' }, time: '2:11:00'},
  {count: 18, year: 1967, team: { name: '中京', prefecture: '愛知' }, time: '2:11:09'},
  {count: 17, year: 1966, team: { name: '中京商業', prefecture: '愛知' }, time: '2:09:28'},
  {count: 16, year: 1965, team: { name: '福大大濠', prefecture: '福岡' }, time: '2:10:45'},
  {count: 15, year: 1964, team: { name: '盈進', prefecture: '広島' }, time: '2:10:10'},
  {count: 14, year: 1963, team: { name: '中京商業', prefecture: '愛知' }, time: '2:12:47'},
  {count: 13, year: 1962, team: { name: '福大大濠', prefecture: '福岡' }, time: '2:13:57'},
  {count: 12, year: 1961, team: { name: '小林', prefecture: '宮崎' }, time: '2:13:40'},
  {count: 11, year: 1960, team: { name: '小林', prefecture: '宮崎' }, time: '2:13:17'},
  {count: 10, year: 1959, team: { name: '西条農業', prefecture: '鹿児島' }, time: '2:14:27'},
  {count: 9, year: 1958, team: { name: '常磐', prefecture: '福岡' }, time: '2:14:07'},
  {count: 8, year: 1957, team: { name: '小林', prefecture: '宮崎' }, time: '2:14:10'},
  {count: 7, year: 1956, team: { name: '常磐', prefecture: '福岡' }, time: '2:16:57'},
  {count: 6, year: 1955, team: { name: '飾磨工業', prefecture: '兵庫' }, time: '2:17:52'},
  {count: 5, year: 1954, team: { name: '筑紫野', prefecture: '福岡' }, time: '2:18:40'},
  {count: 4, year: 1953, team: { name: '筑紫野', prefecture: '福岡' }, time: '2:15:37'},
  {count: 3, year: 1952, team: { name: '玉名', prefecture: '熊本' }, time: '2:18:42'},
  {count: 2, year: 1951, team: { name: '世羅', prefecture: '広島' }, time: '1:44:31'},
  {count: 1, year: 1950, team: { name: '世羅', prefecture: '広島' }, time: '1:46:57'}
];

export function getMiyakoojiMenResultByYear(year: number): MiyakoojiMenResult | null {
  return miyakoojiMenResults.find(result => result.year === year) || null;
}

export function getAllMiyakoojiMenYears(): number[] {
  return miyakoojiMenResults.map(result => result.year);
}

