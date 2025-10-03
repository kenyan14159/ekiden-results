export interface JuniorHighWomenResult {
  count?: number;
  year: number;
  venue?: string;
  teams?: Array<{
    school: string;
    prefecture: string;
  }>;
  times?: string[];
  canceled?: boolean;
  text?: string;
}

export const juniorHighWomenResults: JuniorHighWomenResult[] = [
  {count:32,year:2024,venue:'滋賀',teams:[{school:'京山中',prefecture:'岡山'},{school:'大沢野中',prefecture:'富山'},{school:'神村学園',prefecture:'鹿児島'}],times:['0:41:18','0:42:05','0:42:51']},
  {count:31,year:2023,venue:'滋賀',teams:[{school:'京山',prefecture:'岡山'},{school:'大沢野',prefecture:'富山'},{school:'神村学園',prefecture:'鹿児島'}],times:['0:42:16','0:43:05','0:43:23']},
  {count:30,year:2022,venue:'滋賀',teams:[{school:'稲美',prefecture:'兵庫'},{school:'桂',prefecture:'京都'},{school:'神村学園',prefecture:'鹿児島'}],times:['0:43:27','0:43:35','0:43:44']},
  {count:29,year:2021,venue:'滋賀',teams:[{school:'稲美',prefecture:'兵庫'},{school:'山鹿',prefecture:'熊本'},{school:'桂',prefecture:'京都'}],times:['0:43:36','0:44:02','0:44:03']},
  {count:28,year:2020,canceled:true,text:'新型コロナウイルスの影響で中止'},
  {count:27,year:2019,venue:'滋賀',teams:[{school:'立六ツ美',prefecture:'愛知'},{school:'七尾',prefecture:'石川'},{school:'浅川',prefecture:'福岡'}],times:['0:41:43','0:42:08','0:42:10']},
  {count:26,year:2018,venue:'滋賀',teams:[{school:'桂',prefecture:'京都'},{school:'東',prefecture:'静岡'},{school:'七尾',prefecture:'石川'}],times:['0:41:34','0:41:37','0:41:42']},
  {count:25,year:2017,venue:'滋賀',teams:[{school:'桂',prefecture:'京都'},{school:'大田原',prefecture:'栃木'},{school:'東',prefecture:'静岡'}],times:['0:41:21','0:41:50','0:41:51']},
  {count:24,year:2016,venue:'滋賀',teams:[{school:'桂',prefecture:'京都'},{school:'荒井',prefecture:'兵庫'},{school:'大野東',prefecture:'広島'}],times:['0:41:01','0:41:57','0:42:10']},
  {count:23,year:2015,venue:'山口',teams:[{school:'桂',prefecture:'京都'},{school:'津幡南',prefecture:'石川'},{school:'富士見',prefecture:'群馬'}],times:['0:40:08','0:40:46','0:40:58']},
  {count:22,year:2014,venue:'山口',teams:[{school:'桂',prefecture:'京都'},{school:'川中島',prefecture:'長野'},{school:'小野',prefecture:'兵庫'}],times:['0:41:05','0:41:12','0:41:20']},
  {count:21,year:2013,venue:'山口',teams:[{school:'富士岡',prefecture:'静岡'},{school:'樫原',prefecture:'京都'},{school:'第六',prefecture:'千葉'}],times:['0:40:10','0:41:16','0:41:35']},
  {count:20,year:2012,venue:'山口',teams:[{school:'冨士岡',prefecture:'静岡'},{school:'大久保',prefecture:'兵庫'},{school:'新居浜東',prefecture:'愛媛'}],times:['0:40:20','0:40:45','0:40:51']},
  {count:19,year:2011,venue:'山口',teams:[{school:'新居浜東',prefecture:'愛媛'},{school:'富士岡',prefecture:'静岡'},{school:'朝霞第三',prefecture:'埼玉'}],times:['0:40:22','0:40:45','0:40:56']},
  {count:18,year:2010,venue:'山口',teams:[{school:'富士岡',prefecture:'静岡'},{school:'浅江',prefecture:'開催地'},{school:'三島',prefecture:'栃木'}],times:['0:40:30','0:40:33','0:40:52']},
  {count:17,year:2009,venue:'山口',teams:[{school:'稲美北',prefecture:'兵庫'},{school:'大和',prefecture:'山口'},{school:'浅江',prefecture:'開催地'}],times:['0:40:50','0:41:12','0:41:15']},
  {count:16,year:2008,venue:'山口',teams:[{school:'大和',prefecture:'山口'},{school:'稲美北',prefecture:'兵庫'},{school:'綾部',prefecture:'京都'}],times:['0:40:32','0:40:48','0:40:48']},
  {count:15,year:2007,venue:'山口',teams:[{school:'冨士岡',prefecture:'静岡'},{school:'大久保',prefecture:'兵庫'},{school:'蜂ヶ丘',prefecture:'京都'}],times:['0:40:40','0:40:58','0:41:17']},
  {count:14,year:2006,venue:'山口',teams:[{school:'伴',prefecture:'広島'},{school:'富士岡',prefecture:'静岡'},{school:'住吉',prefecture:'埼玉'}],times:['0:40:58','0:41:02','0:41:05']},
  {count:13,year:2005,venue:'千葉',teams:[{school:'武蔵ヶ丘',prefecture:'熊本'},{school:'芳賀',prefecture:'群馬'},{school:'旭丘',prefecture:'兵庫'}],times:['0:41:46','0:41:47','0:41:51']},
  {count:12,year:2004,venue:'千葉',teams:[{school:'松橋',prefecture:'熊本'},{school:'菅生',prefecture:'福岡'},{school:'津幡南',prefecture:'石川'}],times:['0:39:57','0:40:26','0:40:36']},
  {count:11,year:2003,venue:'千葉',teams:[{school:'中之条',prefecture:'群馬'},{school:'松橋',prefecture:'熊本'},{school:'高屋',prefecture:'広島'}],times:['0:40:44','0:40:46','0:41:05']},
  {count:10,year:2002,venue:'山口',teams:[{school:'中之条',prefecture:'群馬'},{school:'下益城城南',prefecture:'熊本'},{school:'高屋',prefecture:'広島'}],times:['0:41:11','0:41:34','0:41:39']},
  {count:9,year:2001,venue:'山口',teams:[{school:'平生',prefecture:'山口'},{school:'水谷',prefecture:'埼玉'},{school:'中之条',prefecture:'群馬'}],times:['0:40:40','0:41:49','0:41:50']},
  {count:8,year:2000,venue:'山口',teams:[{school:'誠之',prefecture:'広島'},{school:'御殿場',prefecture:'静岡'},{school:'島田',prefecture:'山口'}],times:['0:40:35','0:41:17','0:41:24']},
  {count:7,year:1999,venue:'滋賀',teams:[{school:'御殿場',prefecture:'静岡'},{school:'夜須',prefecture:'福岡'},{school:'平生',prefecture:'山口'}],times:['0:40:35','0:42:13','0:42:17']},
  {count:6,year:1998,venue:'滋賀',teams:[{school:'御殿場',prefecture:'静岡'},{school:'曽根',prefecture:'福岡'},{school:'加茂川',prefecture:'京都'}],times:['0:41:02','0:41:13','0:41:39']},
  {count:5,year:1997,venue:'滋賀',teams:[{school:'御殿場',prefecture:'静岡'},{school:'志摩',prefecture:'福岡'},{school:'東輝',prefecture:'京都'}],times:['0:41:34','0:42:01','0:42:33']},
  {count:4,year:1996,venue:'熊本',teams:[{school:'早良',prefecture:'福岡'},{school:'御殿場',prefecture:'静岡'},{school:'小見川',prefecture:'千葉'}],times:['0:40:49','0:41:07','0:41:15']},
  {count:3,year:1995,venue:'熊本',teams:[{school:'菅生',prefecture:'福岡'},{school:'東輝',prefecture:'京都'},{school:'白子',prefecture:'三重'}],times:['0:40:38','0:41:04','0:41:17']},
  {count:2,year:1994,venue:'熊本',teams:[{school:'一宮南',prefecture:'兵庫'},{school:'浅江',prefecture:'山口'},{school:'菅生',prefecture:'福岡'}],times:['0:40:36','0:40:37','0:41:08']},
  {count:1,year:1993,venue:'熊本',teams:[{school:'浅江',prefecture:'山口'},{school:'白山',prefecture:'千葉'},{school:'一宮南',prefecture:'兵庫'}],times:['0:40:55','0:41:04','0:41:17']}
];

export function getJuniorHighWomenResultByYear(year: number): JuniorHighWomenResult | null {
  return juniorHighWomenResults.find(result => result.year === year) || null;
}

export function getAllJuniorHighWomenYears(): number[] {
  return juniorHighWomenResults.map(result => result.year);
}

