const currentYear = new Date().getFullYear();

// レースページ
const raceUrls = 20;

// 情報ページ
const infoUrls = 5;

// 年度別ページ
let yearUrls = 0;

// 箱根駅伝（1920年から、1944-1946年は中止）
for (let year = 1920; year <= currentYear; year++) {
  if (![1944, 1945, 1946].includes(year)) {
    yearUrls++;
  }
}

// ニューイヤー駅伝（1951年から）
for (let year = 1951; year <= currentYear + 1; year++) {
  yearUrls++;
}

// 全日本大学駅伝（1970年から）
for (let year = 1970; year <= currentYear; year++) {
  yearUrls++;
}

// クイーンズ駅伝（1981年から）
for (let year = 1981; year <= currentYear; year++) {
  yearUrls++;
}

// 出雲駅伝（1989年から）
for (let year = 1989; year <= currentYear; year++) {
  yearUrls++;
}

// 富士山女子駅伝（2006年から）
for (let year = 2006; year <= currentYear; year++) {
  yearUrls++;
}

// 杜の都駅伝（1983年から）
for (let year = 1983; year <= currentYear; year++) {
  yearUrls++;
}

// 都大路 男子（1950年から）
for (let year = 1950; year <= currentYear; year++) {
  yearUrls++;
}

// 都大路 女子（1989年から）
for (let year = 1989; year <= currentYear; year++) {
  yearUrls++;
}

// ひろしま駅伝（1996年から）
for (let year = 1996; year <= currentYear + 1; year++) {
  yearUrls++;
}

// 都道府県対抗女子駅伝（1983年から）
for (let year = 1983; year <= currentYear + 1; year++) {
  yearUrls++;
}

// 全中男子駅伝（1993年から）
for (let year = 1993; year <= currentYear; year++) {
  yearUrls++;
}

// 全中女子駅伝（1993年から）
for (let year = 1993; year <= currentYear; year++) {
  yearUrls++;
}

const homeUrl = 1;
const total = homeUrl + raceUrls + infoUrls + yearUrls;

console.log('=== サイトマップ ページ数集計 ===');
console.log('ホームページ:', homeUrl);
console.log('レースページ:', raceUrls);
console.log('情報ページ:', infoUrls);
console.log('年度別ページ:', yearUrls);
console.log('------------------------');
console.log('合計:', total, 'ページ');

// 各大会別の詳細
console.log('\n=== 各大会の年度別ページ数 ===');
const races = [
  { name: '箱根駅伝', start: 1920, end: currentYear, excluded: [1944, 1945, 1946] },
  { name: 'ニューイヤー駅伝', start: 1951, end: currentYear + 1 },
  { name: '全日本大学駅伝', start: 1970, end: currentYear },
  { name: 'クイーンズ駅伝', start: 1981, end: currentYear },
  { name: '出雲駅伝', start: 1989, end: currentYear },
  { name: '富士山女子駅伝', start: 2006, end: currentYear },
  { name: '杜の都駅伝', start: 1983, end: currentYear },
  { name: '都大路 男子', start: 1950, end: currentYear },
  { name: '都大路 女子', start: 1989, end: currentYear },
  { name: 'ひろしま駅伝', start: 1996, end: currentYear + 1 },
  { name: '都道府県対抗女子駅伝', start: 1983, end: currentYear + 1 },
  { name: '全中男子駅伝', start: 1993, end: currentYear },
  { name: '全中女子駅伝', start: 1993, end: currentYear },
];

races.forEach(race => {
  let count = 0;
  for (let year = race.start; year <= race.end; year++) {
    if (!race.excluded || !race.excluded.includes(year)) {
      count++;
    }
  }
  console.log(`${race.name}: ${count}ページ (${race.start}年〜${race.end}年)`);
});
