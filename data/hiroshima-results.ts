export interface HiroshimaResult {
  count?: number;
  year: number;
  teams?: string[];
  times?: string[];
  canceled?: boolean;
  text?: string;
}

export const hiroshimaResults: HiroshimaResult[] = [
  {count:30, year:2025, teams:['長野','千葉','福島'], times:['2:16:55','2:17:39','2:18:02']},
  {count:29, year:2024, teams:['長野','埼玉','千葉'], times:['2:17:00','2:19:11','2:19:32']},
  {count:28, year:2023, teams:['長野','埼玉','東京'], times:['2:17:10','2:17:35','2:18:20']},
  {year: 2022, count: 27, canceled: true, text: '新型コロナウイルスの影響で中止'},
  {year: 2021, count: 26, canceled: true, text: '新型コロナウイルスの影響で中止'},
  {count:25, year:2020, teams:['長野','兵庫','埼玉'], times:['2:17:11','2:17:28','2:17:34']},
  {count:24, year:2019, teams:['福島','群馬','長野'], times:['2:19:43','2:20:18','2:20:22']},
  {count:23, year:2018, teams:['埼玉','長野','千葉'], times:['2:19:10','2:19:56','2:20:34']},
  {count:22, year:2017, teams:['京都','静岡','群馬'], times:['2:20:37','2:20:51','2:21:03']},
  {count:21, year:2016, teams:['愛知','広島','埼玉'], times:['2:20:12','2:20:43','2:20:59']},
  {count:20, year:2015, teams:['埼玉','宮城','東京'], times:['2:19:14','2:19:38','2:20:19']},
  {count:19, year:2014, teams:['長野','埼玉','群馬'], times:['2:19:20','2:19:55','2:19:56']},
  {count:18, year:2013, teams:['兵庫','東京','愛知'], times:['2:19:51','2:19:56','2:20:35']},
  {count:17, year:2012, teams:['兵庫','東京','熊本'], times:['2:20:19','2:20:41','2:20:50']},
  {count:16, year:2011, teams:['栃木','長野','広島'], times:['2:19:31','2:20:02','2:20:37']},
  {count:15, year:2010, teams:['兵庫','福島','埼玉'], times:['2:20:02','2:20:05','2:20:20']},
  {count:14, year:2009, teams:['長野','兵庫','宮﨑'], times:['2:18:43','2:20:03','2:20:07']},
  {count:13, year:2008, teams:['長野','愛知','兵庫'], times:['2:21:06','2:21:19','2:21:34']},
  {count:12, year:2007, teams:['兵庫','長野','佐賀'], times:['2:19:40','2:21:13','2:21:31']},
  {count:11, year:2006, teams:['長野','兵庫','愛知'], times:['2:20:23','2:21:11','2:21:52']},
  {count:10, year:2005, teams:['長野','兵庫','宮城'], times:['2:20:02','2:20:04','2:21:03']},
  {count:9, year:2004, teams:['長野','兵庫','福岡'], times:['2:20:08','2:20:13','2:20:21']},
  {count:8, year:2003, teams:['福岡','佐賀','京都'], times:['2:19:06','2:20:46','2:20:47']},
  {count:7, year:2002, teams:['福岡','熊本','長崎'], times:['2:19:54','2:20:44','2:20:53']},
  {count:6, year:2001, teams:['愛知','兵庫','埼玉'], times:['2:20:07','2:21:00','2:21:18']},
  {count:5, year:2000, teams:['鹿児島','広島','佐賀'], times:['2:19:52','2:20:49','2:21:09']},
  {count:4, year:1999, teams:['兵庫','福島','長野'], times:['2:16:50','2:17:14','2:17:46']},
  {count:3, year:1998, teams:['福岡','広島','埼玉'], times:['2:18:15','2:19:06','2:19:16']},
  {count:2, year:1997, teams:['京都','福岡','福島'], times:['2:16:36','2:17:11','2:17:54']},
  {count:1, year:1996, teams:['広島','福岡','静岡'], times:['2:17:34','2:17:40','2:17:50']}
];

export function getHiroshimaResultByYear(year: number): HiroshimaResult | null {
  return hiroshimaResults.find(result => result.year === year) || null;
}

export function getAllHiroshimaYears(): number[] {
  return hiroshimaResults.map(result => result.year);
}

