import { faker } from '@faker-js/faker';

export const tagList = [...new Array(200).fill('').map(() => {
  return faker.string.alpha({ length: { min: 3, max: 8 } })
}), 'Japan']


export function createRandomNews(): News {

  const kw = faker.helpers.arrayElement(tagList);
  const kwTest = faker.helpers.arrayElement(['Japan', 'comiru']);
  const c1 = faker.lorem.lines({ min: 1, max: 3 });
  const c2 = faker.lorem.lines({ min: 2, max: 5 });;
  const content = `${c1} ${kw} ${kwTest} ${c2}`;
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(),
    cover_image: faker.image.urlLoremFlickr({ width: 300, height: 300 }),
    content,
    // mock 开关
    video: faker.helpers.arrayElement([true, false]),
    // mock 开关
    music: faker.helpers.arrayElement([true, false]),
    create_date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).getTime()
  };
}

export const mockNewsList: News[] = faker.helpers.multiple(createRandomNews, {
  count: 25,
})