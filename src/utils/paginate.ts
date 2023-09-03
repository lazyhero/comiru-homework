/**
 * 数组分页
 * @param {Array} array 要分页的数组
 * @param {number} page 当前页码
 * @param {number} pageSize 每页大小
 * @returns {Object} 分页结果 
 */

interface PaginatedResult<T> {
  total: number;
  data: T[];
}

export function paginate<T>(array: T[], page = 1, pageSize = 10): PaginatedResult<T> {

  const totalPage = Math.ceil(array.length / pageSize);

  const offset = (page - 1) * pageSize;
  const data = array.slice(offset, offset + pageSize);

  return {
    total: totalPage,
    data
  };
}

