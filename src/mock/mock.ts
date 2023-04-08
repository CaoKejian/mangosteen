import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');

export const mockItemSummary: Mock = config => {
  return [200, {
    "groups": [
      { "happen_at": "2023-04-01T00:00:00.000+0800", "amount": 100 },
      { "happen_at": "2023-04-04T00:00:00.000+0800", "amount": 300 },
      { "happen_at": "2023-04-07T00:00:00.000+0800", "amount": 200 }
    ],
    "summary": 600
  }]
}
export const mockItemIndexBalance: Mock = (config) => {
  return [200, {
    expenses: 9900,
    income: 9900,
    balance: 0
  }]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (attrs?: any) =>
  ({
    id: createdId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createdId(),
      user_id: createdId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createdId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
    summary: {
      income: 9900,
      expenses: 9900,
      balance: 0
    }
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}

export const mockTagEdit: Mock = config => {
  const createTag = (attrs?: any) =>
  ({
    id: createdId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockTagShow: Mock = config => {
  const createTag = (attrs?: any) =>
  ({
    id: createdId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}
export const mockItemCreate: Mock = (config) => {
  // return [422, {
  //   errors: {
  //     tags_id: ["必须选择标签"],
  //     amount: ['金额不能为零']
  //   }
  // }]
  return [200, {
    resource: {
      "id": 469,
      "user_id": 254,
      "amount": 9900,
      "note": null,
      "tags_id": [
        370,
      ],
      "happen_at": "2020-10-29T16:00:00.000Z",
      "created_at": "2022-06-16T16:17:48.559Z",
      "updated_at": "2022-06-16T16:17:48.559Z",
      "kind": "expenses"
    }
  }]
}
export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }]
}
let id = 0
const createdId = () => {
  id += 1
  return id
}
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPager = (page = 1) => ({
    page, per_page, count
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createdId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n), pager: createPager(page)
  })
  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(24)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(24)]
  } else {
    return [200, createBody(1)]
  }
}