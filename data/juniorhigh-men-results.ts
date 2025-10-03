export interface JuniorHighMenResult {
  count?: number;
  year: number;
  teams?: Array<{
    school: string;
    prefecture: string;
  }>;
  times?: string[];
  canceled?: boolean;
  text?: string;
}

export const juniorHighMenResults: JuniorHighMenResult[] = [
  {count: 32, year: 2024, teams: [{school: '藤中', prefecture: '埼玉'}, {school: '我孫子中', prefecture: '千葉'}, {school: '細江中', prefecture: '静岡'}], times: ['0:57:17', '0:57:51', '0:57:57']},
  {count: 31, year: 2023, teams: [{school: '京山', prefecture: '岡山'}, {school: '国府', prefecture: '山口'}, {school: '中能登', prefecture: '石川'}], times: ['0:58:03', '0:58:04', '0:58:24']},
  {count: 30, year: 2022, teams: [{school: '酒井根', prefecture: '千葉'}, {school: '湯川', prefecture: '福岡'}, {school: '桂', prefecture: '京都'}], times: ['0:58:37', '0:58:45', '0:58:46']},
  {count: 29, year: 2021, teams: [{school: '桂', prefecture: '京都'}, {school: '高田', prefecture: '福島'}, {school: '中能登', prefecture: '石川'}], times: ['0:57:37', '0:58:06', '0:58:14']},
  {year: 2020, count: 28, canceled: true, text: '新型コロナウイルスの影響で中止'},
  {count: 27, year: 2019, teams: [{school: '市貝', prefecture: '栃木'}, {school: '我孫子', prefecture: '千葉'}, {school: '桂', prefecture: '京都'}], times: ['0:57:23', '0:57:32', '0:58:02']},
  {count: 26, year: 2018, teams: [{school: '桂', prefecture: '京都'}, {school: '中之条', prefecture: '群馬'}, {school: '曽根', prefecture: '福岡'}], times: ['0:56:33', '0:56:40', '0:57:01']},
  {count: 25, year: 2017, teams: [{school: '白山', prefecture: '千葉'}, {school: '高屋', prefecture: '広島'}, {school: '曽根', prefecture: '福岡'}], times: ['0:57:03', '0:57:32', '0:57:41']},
  {count: 24, year: 2016, teams: [{school: '平野', prefecture: '兵庫'}, {school: '領家', prefecture: '神奈川'}, {school: '西', prefecture: '愛媛'}], times: ['0:57:31', '0:57:35', '0:57:38']},
  {count: 23, year: 2015, teams: [{school: '富士見', prefecture: '群馬'}, {school: '大田原', prefecture: '栃木'}, {school: '第五', prefecture: '千葉'}], times: ['0:56:37', '0:56:52', '0:57:25']},
  {count: 22, year: 2014, teams: [{school: '三島', prefecture: '栃木'}, {school: '小千谷', prefecture: '新潟'}, {school: '富士見', prefecture: '群馬'}], times: ['0:57:15', '0:57:48', '0:57:53']},
  {count: 21, year: 2013, teams: [{school: '山手', prefecture: '兵庫'}, {school: '吉備', prefecture: '岡山'}, {school: '城南', prefecture: '福岡'}], times: ['0:56:55', '0:57:29', '0:57:33']},
  {count: 20, year: 2012, teams: [{school: '山手', prefecture: '兵庫'}, {school: '栄進', prefecture: '埼玉'}, {school: '塩谷', prefecture: '栃木'}], times: ['0:56:51', '0:56:51', '0:57:02']},
  {count: 19, year: 2011, teams: [{school: '櫛形', prefecture: '山梨'}, {school: '萩東', prefecture: '山口'}, {school: '時津', prefecture: '長崎'}], times: ['0:56:59', '0:57:06', '0:57:07']},
  {count: 18, year: 2010, teams: [{school: '田奈', prefecture: '神奈川'}, {school: '西条', prefecture: '広島'}, {school: '北島', prefecture: '徳島'}], times: ['0:56:45', '0:56:56', '0:57:09']},
  {count: 17, year: 2009, teams: [{school: '吉岡', prefecture: '群馬'}, {school: '河東', prefecture: '福岡'}, {school: '佐野北', prefecture: '栃木'}], times: ['0:57:25', '0:57:31', '0:57:32']},
  {count: 16, year: 2008, teams: [{school: '河東', prefecture: '福岡'}, {school: '吉岡', prefecture: '群馬'}, {school: '六ツ美北', prefecture: '愛知'}], times: ['0:56:37', '0:56:57', '0:57:40']},
  {count: 15, year: 2007, teams: [{school: '八田', prefecture: '山梨'}, {school: '八本松', prefecture: '広島'}, {school: '逆井', prefecture: '千葉'}], times: ['0:56:35', '0:57:21', '0:57:45']},
  {count: 14, year: 2006, teams: [{school: '八本松', prefecture: '広島'}, {school: '芳賀', prefecture: '栃木'}, {school: '八田', prefecture: '山梨'}], times: ['0:57:04', '0:57:37', '0:57:38']},
  {count: 13, year: 2005, teams: [{school: '逆井', prefecture: '千葉'}, {school: '八本松', prefecture: '広島'}, {school: '綾部', prefecture: '京都'}], times: ['0:57:53', '0:58:03', '0:58:18']},
  {count: 12, year: 2004, teams: [{school: '日の里', prefecture: '福岡'}, {school: '山田', prefecture: '千葉'}, {school: '十王', prefecture: '茨城'}], times: ['0:55:46', '0:56:05', '0:56:17']},
  {count: 11, year: 2003, teams: [{school: '住吉', prefecture: '埼玉'}, {school: '小川', prefecture: '熊本'}, {school: '古ヶ崎', prefecture: '千葉'}], times: ['0:56:51', '0:57:07', '0:57:17']},
  {count: 10, year: 2002, teams: [{school: '元岡', prefecture: '福岡'}, {school: '逆井', prefecture: '千葉'}, {school: '市貝', prefecture: '栃木'}], times: ['0:56:47', '0:57:33', '0:57:40']},
  {count: 9, year: 2001, teams: [{school: '香芝', prefecture: '奈良'}, {school: '富士見台', prefecture: '埼玉'}, {school: '加古川中部', prefecture: '兵庫'}], times: ['0:56:40', '0:56:45', '0:56:46']},
  {count: 8, year: 2000, teams: [{school: '中之条', prefecture: '群馬'}, {school: '小見川', prefecture: '千葉'}, {school: '熊毛', prefecture: '山口'}], times: ['0:57:16', '0:57:26', '0:57:45']},
  {count: 7, year: 1999, teams: [{school: '小見川', prefecture: '千葉'}, {school: '熊毛', prefecture: '山口'}, {school: '仁多', prefecture: '島根'}], times: ['0:56:29', '0:57:32', '0:57:33']},
  {count: 6, year: 1998, teams: [{school: '中之条', prefecture: '群馬'}, {school: '芳賀', prefecture: '栃木'}, {school: '詳徳', prefecture: '京都'}], times: ['0:57:18', '0:57:24', '0:57:28']},
  {count: 5, year: 1997, teams: [{school: '友泉', prefecture: '福岡'}, {school: '水口', prefecture: '滋賀'}, {school: '小川', prefecture: '熊本'}], times: ['0:58:21', '0:58:39', '0:58:52']},
  {count: 4, year: 1996, teams: [{school: '曽根', prefecture: '福岡'}, {school: '小川', prefecture: '熊本'}, {school: '中之条', prefecture: '群馬'}], times: ['0:56:02', '0:56:24', '0:56:51']},
  {count: 3, year: 1995, teams: [{school: '曽根', prefecture: '福岡'}, {school: '大津ヶ丘', prefecture: '千葉'}, {school: '一宮南', prefecture: '兵庫'}], times: ['0:55:59', '0:56:40', '0:56:48']},
  {count: 2, year: 1994, teams: [{school: '陵南', prefecture: '兵庫'}, {school: '小川', prefecture: '熊本'}, {school: '石川', prefecture: '福島'}], times: ['0:57:03', '0:57:04', '0:57:24']},
  {count: 1, year: 1993, teams: [{school: '陵南', prefecture: '兵庫'}, {school: '白山', prefecture: '千葉'}, {school: '御殿場西', prefecture: '静岡'}], times: ['0:56:57', '0:57:02', '0:57:16']}
];

export function getJuniorHighMenResultByYear(year: number): JuniorHighMenResult | null {
  return juniorHighMenResults.find(result => result.year === year) || null;
}

export function getAllJuniorHighMenYears(): number[] {
  return juniorHighMenResults.map(result => result.year);
}

