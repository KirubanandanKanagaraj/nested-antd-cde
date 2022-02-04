export type Employee = {
  id: string
  name: string
  email: string
  title: string
  department_id: string
}

export type Department = {
  id: string
  name: string
  company_id: string
}

export type Company = {
  id: string
  name: string
}

export type DepartmentWithEmployees = Department & {
  children: Employee[]
}

export type CompanyTree = (Company & {
  children: DepartmentWithEmployees[]
})[]
