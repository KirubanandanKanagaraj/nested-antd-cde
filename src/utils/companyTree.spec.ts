import { buildCompanyTree } from './companyTree'
import { MOCKED_COMPANIES, MOCKED_DEPARTMENTS, MOCKED_EMPLOYEES } from './mocks'

describe('companyTree', () => {
  test('Should convert entities into a tree', () => {
    expect(
      buildCompanyTree({
        employeesFromApi: MOCKED_EMPLOYEES,
        departmentsFromApi: MOCKED_DEPARTMENTS,
        companiesFromApi: MOCKED_COMPANIES,
      })
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "department_id": "test-dep-1",
                  "email": "j@google.com",
                  "id": "1",
                  "name": "John Smith",
                  "title": "TEST TITLE",
                },
                Object {
                  "department_id": "test-dep-1",
                  "email": "j@google.com",
                  "id": "2",
                  "name": "John Wane",
                  "title": "TEST TITLE",
                },
                Object {
                  "department_id": "test-dep-1",
                  "email": "j@google.com",
                  "id": "3",
                  "name": "John Wolf",
                  "title": "TEST TITLE",
                },
              ],
              "company_id": "test-company-1",
              "id": "test-dep-1",
              "name": "TEST DEPARTMENT 1",
            },
          ],
          "id": "test-company-1",
          "name": "TEST COMPANY 1",
        },
        Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "department_id": "test-dep-2",
                  "email": "j@google.com",
                  "id": "4",
                  "name": "Matt Wolf",
                  "title": "TEST TITLE",
                },
                Object {
                  "department_id": "test-dep-2",
                  "email": "j@google.com",
                  "id": "5",
                  "name": "James Fox",
                  "title": "TEST TITLE",
                },
              ],
              "company_id": "test-company-2",
              "id": "test-dep-2",
              "name": "TEST DEPARTMENT 2",
            },
          ],
          "id": "test-company-2",
          "name": "TEST COMPANY 2",
        },
      ]
    `)
  })

  test('should convert empty companies to a tree', () => {
    expect(
      buildCompanyTree({
        employeesFromApi: [],
        departmentsFromApi: [],
        companiesFromApi: MOCKED_COMPANIES,
      })
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [],
          "id": "test-company-1",
          "name": "TEST COMPANY 1",
        },
        Object {
          "children": Array [],
          "id": "test-company-2",
          "name": "TEST COMPANY 2",
        },
      ]
    `)
  })
})
