
/**
 * 计算给定时间戳与当前时间的相对时间
 * @param {number} timestamp 给定的时间戳 
 */

const hour = 3600

export function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = (now - timestamp) / 1000;

  if (diff < hour) {
    return '刚刚';
  } else if (diff < 7 * 24 * hour) {
    return `${Math.floor(diff / (24 * hour))} 天前`;
  } else if (diff < 30 * 24 * hour) {
    return new Date(timestamp).toLocaleDateString('zh', { month: 'long' });
  } else if (diff < 12 * 30 * 24 * 3600) {
    return `${Math.round(diff / (30 * 24 * 3600))}个月前`;
  } else {
    return `${Math.round(diff / (365 * 24 * 3600))}年前`;
  }
}
