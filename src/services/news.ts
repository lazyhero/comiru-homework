import { mockNewsList } from "@/data"
import { paginate } from '@/utils/paginate'

export function getNewsList(page = 1, pageSize = 10): News[] {
  return paginate(mockNewsList, page, pageSize)
}

export function getNewsListByTag(tag: string) {
  return mockNewsList.filter((item: News) => {
    return item.content.includes(tag)
  })
}