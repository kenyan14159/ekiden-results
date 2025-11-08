import { promises as fs } from "fs";
import path from "path";

export interface RaceConfig {
  type: string;
  term: { singular: string; plural: string };
  sections: number;
  hasHalfway: boolean;
  showGrade: boolean;
  specialTeams: string[];
}

export interface Runner {
  section: number;
  dist: string;
  time: string;
  name: string;
  grade?: number;
  rank: number | string;
  isSectionRecord?: boolean;
  isNewRecord?: boolean;
}

export interface Team {
  rank: number | string;
  name: string;
  federation?: string;
  totalTime: string;
  outboundTime?: string;
  inboundTime?: string;
  runners: Runner[];
}

export interface RaceData {
  config: RaceConfig;
  eventName: string;
  year: number;
  teams: Team[];
  rankProgression?: { name: string; ranks: number[] }[];
}

// 駅伝IDからデータディレクトリへのマッピング
const raceDataPaths: Record<string, string> = {
  "new-year": "corporate/newyear",
  "queens": "corporate/queens",
  "hakone": "university/hakone",
  "zenjitsu": "university/all-japan",
  "izumo": "university/izumo",
  "morinomiyako": "university/morinomiyako",
  "fujisan": "university/fujisan",
  "miyakooji-men": "highschool/boys",
  "miyakooji-women": "highschool/girls",
  "junior-high-men": "junior-high/boys",
  "junior-high-women": "junior-high/girls",
  "hiroshima": "prefectures/boys",
  "prefecture-women": "prefectures/girls",
};

/**
 * 指定された駅伝の利用可能な年度一覧を取得
 */
export async function getAvailableYears(raceId: string): Promise<number[]> {
  const dataPath = raceDataPaths[raceId];
  if (!dataPath) {
    return [];
  }

  try {
    const dirPath = path.join(process.cwd(), "data", dataPath);
    const files = await fs.readdir(dirPath);
    
    const years = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => parseInt(file.replace(".json", ""), 10))
      .filter((year) => !isNaN(year))
      .sort((a, b) => b - a); // 降順（新しい年が先）

    return years;
  } catch (error) {
    // エラーの種類に応じた詳細なログ出力
    if (error instanceof Error) {
      // Node.jsのファイルシステムエラー型チェック
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === 'ENOENT') {
        console.warn(`データディレクトリが見つかりません: ${dataPath} (raceId: ${raceId})`);
      } else {
        console.error(`年度一覧の取得エラー (raceId: ${raceId}):`, error.message);
      }
    } else {
      console.error(`年度一覧の取得エラー (raceId: ${raceId}):`, error);
    }
    return [];
  }
}

/**
 * 指定された駅伝の特定年度のデータを取得
 */
export async function getRaceData(
  raceId: string,
  year: number
): Promise<RaceData | null> {
  const dataPath = raceDataPaths[raceId];
  if (!dataPath) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), "data", dataPath, `${year}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const data: RaceData = JSON.parse(fileContents);
    
    // データの基本的な検証
    if (!data.teams || !Array.isArray(data.teams)) {
      console.warn(`無効なデータ形式: ${raceId} ${year} - teams配列が見つかりません`);
      return null;
    }
    
    return data;
  } catch (error) {
    // エラーの種類に応じた詳細なログ出力
    if (error instanceof Error) {
      // Node.jsのファイルシステムエラー型チェック
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === 'ENOENT') {
        // ファイルが存在しない場合（開発環境でのみ警告）
        if (process.env.NODE_ENV === 'development') {
          console.warn(`データファイルが見つかりません: ${raceId} ${year}`);
        }
      } else if (error instanceof SyntaxError) {
        console.error(`JSON解析エラー (${raceId} ${year}):`, error.message);
      } else {
        console.error(`データ読み込みエラー (${raceId} ${year}):`, error.message);
      }
    } else {
      console.error(`データ読み込みエラー (${raceId} ${year}):`, error);
    }
    return null;
  }
}

/**
 * 指定された駅伝の最新年度のデータを取得
 */
export async function getLatestRaceData(
  raceId: string
): Promise<RaceData | null> {
  const years = await getAvailableYears(raceId);
  if (years.length === 0) {
    return null;
  }

  return getRaceData(raceId, years[0]);
}

/**
 * 時間文字列をフォーマット（例: 4:47:32 → 4時間47分32秒）
 */
export function formatTime(time: string): string {
  if (!time) return "-";
  
  const parts = time.split(":");
  if (parts.length === 2) {
    return `${parseInt(parts[0])}分${parts[1]}秒`;
  } else if (parts.length === 3) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    if (hours > 0) {
      return `${hours}時間${minutes}分${parts[2]}秒`;
    } else {
      return `${minutes}分${parts[2]}秒`;
    }
  }
  return time;
}

/**
 * 順位を装飾（1位: 🥇, 2位: 🥈, 3位: 🥉）
 */
export function formatRank(rank: number | string): string {
  if (typeof rank === "string") return rank;
  
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `${rank}位`;
  }
}

