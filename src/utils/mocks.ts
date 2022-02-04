import type { Company, Department, Employee } from 'types'

export const MOCKED_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'j@google.com',
    title: 'TEST TITLE',
    department_id: 'test-dep-1',
  },
  {
    id: '2',
    name: 'John Wane',
    email: 'j@google.com',
    title: 'TEST TITLE',
    department_id: 'test-dep-1',
  },
  {
    id: '3',
    name: 'John Wolf',
    email: 'j@google.com',
    title: 'TEST TITLE',
    department_id: 'test-dep-1',
  },
  {
    id: '4',
    name: 'Matt Wolf',
    email: 'j@google.com',
    title: 'TEST TITLE',
    department_id: 'test-dep-2',
  },
  {
    id: '5',
    name: 'James Fox',
    email: 'j@google.com',
    title: 'TEST TITLE',
    department_id: 'test-dep-2',
  },
]

export const MOCKED_DEPARTMENTS: Department[] = [
  {
    id: 'test-dep-1',
    name: 'TEST DEPARTMENT 1',
    company_id: 'test-company-1',
  },
  {
    id: 'test-dep-2',
    name: 'TEST DEPARTMENT 2',
    company_id: 'test-company-2',
  },
]

export const MOCKED_COMPANIES: Company[] = [
  {
    id: 'test-company-1',
    name: 'TEST COMPANY 1',
  },
  {
    id: 'test-company-2',
    name: 'TEST COMPANY 2',
  },
]
