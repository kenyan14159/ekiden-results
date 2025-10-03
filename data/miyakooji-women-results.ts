export interface MiyakoojiWomenResult {
  count?: number;
  year: number;
  time?: string;
  school?: string;
  prefecture?: string;
  canceled?: boolean;
  text?: string;
}

export const miyakoojiWomenResults: MiyakoojiWomenResult[] = [
  {count:36,year:2024,time:'1:07:27',school:'長野東',prefecture:'長野'},
  {count:35,year:2023,time:'1:07:28',school:'神村学園',prefecture:'鹿児島'},
  {count:34,year:2022,time:'1:07:37',school:'長野東',prefecture:'長野'},
  {count:33,year:2021,time:'1:07:16',school:'仙台育英',prefecture:'宮城'},
  {count:32,year:2020,time:'1:07:13',school:'世羅',prefecture:'広島'},
  {count:31,year:2019,time:'1:07:00',school:'仙台育英',prefecture:'宮城'},
  {count:30,year:2018,time:'1:07:25',school:'神村学園',prefecture:'鹿児島'},
  {count:29,year:2017,time:'1:06:35',school:'仙台育英',prefecture:'宮城'},
  {count:28,year:2016,time:'1:07:24',school:'薫英女学院',prefecture:'大阪'},
  {count:27,year:2015,time:'1:07:37',school:'世羅',prefecture:'広島'},
  {count:26,year:2014,time:'1:07:26',school:'薫英女学院',prefecture:'大阪'},
  {count:25,year:2013,time:'1:06:54',school:'豊川',prefecture:'愛知'},
  {count:24,year:2012,time:'1:07:22',school:'立命館宇治',prefecture:'京都'},
  {count:23,year:2011,time:'1:07:29',school:'豊川',prefecture:'愛知'},
  {count:22,year:2010,time:'1:07:50',school:'興譲館',prefecture:'岡山'},
  {count:21,year:2009,time:'1:08:27',school:'豊川',prefecture:'愛知'},
  {count:20,year:2008,time:'1:07:37',school:'豊川',prefecture:'愛知'},
  {count:19,year:2007,time:'1:07:06',school:'立命館宇治',prefecture:'京都'},
  {count:18,year:2006,time:'1:07:34',school:'須磨学園',prefecture:'兵庫'},
  {count:17,year:2005,time:'1:06:54',school:'興譲館',prefecture:'岡山'},
  {count:16,year:2004,time:'1:07:33',school:'諫早',prefecture:'長崎'},
  {count:15,year:2003,time:'1:07:46',school:'須磨学園',prefecture:'兵庫'},
  {count:14,year:2002,time:'1:08:24',school:'筑紫女学園',prefecture:'福岡'},
  {count:13,year:2001,time:'1:08:10',school:'諫早',prefecture:'長崎'},
  {count:12,year:2000,time:'1:08:05',school:'立命館宇治',prefecture:'京都'},
  {count:11,year:1999,time:'1:07:59',school:'筑紫女学園',prefecture:'福岡'},
  {count:10,year:1998,time:'1:07:56',school:'田村',prefecture:'福島'},
  {count:9,year:1997,time:'1:07:00',school:'埼玉栄',prefecture:'埼玉'},
  {count:8,year:1996,time:'1:06:26',school:'埼玉栄',prefecture:'埼玉'},
  {count:7,year:1995,time:'1:08:13',school:'埼玉栄',prefecture:'埼玉'},
  {count:6,year:1994,time:'1:07:54',school:'仙台育英',prefecture:'宮城'},
  {count:5,year:1993,time:'1:07:32',school:'仙台育英',prefecture:'宮城'},
  {count:4,year:1992,time:'1:08:26',school:'市船橋',prefecture:'千葉'},
  {count:3,year:1991,time:'1:08:28',school:'筑紫女学園',prefecture:'福岡'},
  {count:2,year:1990,time:'1:08:51',school:'健大高崎',prefecture:'群馬'},
  {count:1,year:1989,time:'1:09:48',school:'市船橋',prefecture:'千葉'}
];

export function getMiyakoojiWomenResultByYear(year: number): MiyakoojiWomenResult | null {
  return miyakoojiWomenResults.find(result => result.year === year) || null;
}

export function getAllMiyakoojiWomenYears(): number[] {
  return miyakoojiWomenResults.map(result => result.year);
}

