export interface FujisanResult {
  count?: number;
  fujiCount?: number | null;
  year: number;
  teams?: string[];
  times?: string[];
  canceled?: boolean;
  text?: string;
}

export const fujisanResults: FujisanResult[] = [
  {count:19, fujiCount:12, year:2024, teams:['立命館大学','大東文化大学','日本体育大学'], times:['2:21:09','2:23:47','2:24:02']},
  {count:18, fujiCount:11, year:2023, teams:['名城大学','日本体育大学','大東文化大学'], times:['2:22:42','2:24:04','2:24:24']},
  {count:17, fujiCount:10, year:2022, teams:['名城大学','大坂学院大学','日本体育大学'], times:['2:21:56','2:25:07','2:25:21']},
  {count:16, fujiCount:9,  year:2021, teams:['名城大学','大東文化大学','日本体育大学'], times:['2:22:24','2:25:22','2:25:59']},
  {count:15, fujiCount:8,  year:2020, teams:['名城大学','大東文化大学','立命館大学'], times:['2:21:38','2:24:16','2:27:00']},
  {count:14, fujiCount:7,  year:2019, teams:['名城大学','大東文化大学','全日本選抜'], times:['2:23:09','2:24:25','2:25:22']},
  {count:13, fujiCount:6,  year:2018, teams:['名城大学','大東文化大学','立命館大学'], times:['2:22:50','2:24:19','2:25:22']},
  {count:12, fujiCount:5,  year:2017, teams:['立命館大学','東京農業大学','名城大学'], times:['2:23:46','2:25:30','2:25:38']},
  {count:11, fujiCount:4,  year:2016, teams:['立命館大学','名城大学','松山大学'], times:['2:25:43','2:27:21','2:27:57']},
  {count:10, fujiCount:3,  year:2015, teams:['立命館大学','名城大学','松山大学'], times:['2:21:50','2:25:04','2:25:16']},
  {count:9, fujiCount:2,   year:2014, teams:['立命館大学','大阪学院大学','大東文化大学'], times:['2:22:20','2:24:04','2:24:32']},
  {count:8, fujiCount:1,   year:2013, teams:['立命館大学','鹿屋体育大学','大東文化大学'], times:['2:21:48','2:23:58','2:24:44']},
  {count:7, fujiCount:null, year:2009, teams:['佛教大学','立命館大学','名城大学'], times:['1:37:35','1:38:35','1:41:16']},
  {count:6, fujiCount:null, year:2008, teams:['立命館大学','佛教大学','名城大学'], times:['1:38:33','1:38:36','1:39:33']},
  {count:5, fujiCount:null, year:2007, teams:['立命館大学','佛教大学','名城大学'], times:['1:39:33','1:40:12','1:40:52']},
  {count:4, fujiCount:null, year:2006, teams:['立命館大学','名城大学','関西選抜'], times:['1:40:17','1:41:18','1:41:43']},
  {count:3, fujiCount:null, year:2005, teams:['立命館大学','城西大学','大阪体育大学'], times:['1:38:07','1:39:52','1:39:55']},
  {count:2, fujiCount:null, year:2004, teams:['立命館大学','城西大学','名城大学'], times:['1:40:39','1:40:57','1:41:02']},
  {count:1, fujiCount:null, year:2003, teams:['立命館大学','名城大学','京都産業大学'], times:['1:41:43','1:42:10','1:42:29']}
];

export function getFujisanResultByYear(year: number): FujisanResult | null {
  return fujisanResults.find(result => result.year === year) || null;
}

export function getAllFujisanYears(): number[] {
  return fujisanResults.map(result => result.year);
}

