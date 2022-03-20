import type { Company, CompanyTree, Department, Employee } from 'types'
import { CompanyList, DepartmentList, EmployeeList } from './api'

export type BuildCompanyTreeParams = {
  employeesFromApi: Employee[]
  departmentsFromApi: Department[]
  companiesFromApi: Company[]
}

const constructDepartmentObj = (empObj, depObj) => {
  for (let dep = 0; dep < depObj.length; dep++) {
    depObj[dep].children = empObj.filter((item) => {
      if (item.department_id === depObj[dep].id) {
        return item
      }
    })
  }
  return depObj
}

const constructCompanyObj = (compObj, depObj) => {
  for (let comp = 0; comp < compObj.length; comp++) {
    compObj[comp].children = depObj.filter((item) => {
      if (item.company_id === compObj[comp].id) {
        return item
      }
    })
  }
  return compObj
}

export const buildCompanyTree = ({
  employeesFromApi,
  departmentsFromApi,
  companiesFromApi,
}: BuildCompanyTreeParams): CompanyTree => {
  // code here and change the return afterwards
  const newDepObj = constructDepartmentObj(employeesFromApi, departmentsFromApi)
  const newCompanyObj = constructCompanyObj(companiesFromApi, newDepObj)
  return newCompanyObj
}

export const fetchData = async () => {
  const employeesFromApi = await EmployeeList()
  const departmentsFromApi = await DepartmentList()
  const companiesFromApi = await CompanyList()
  return buildCompanyTree({
    employeesFromApi,
    departmentsFromApi,
    companiesFromApi,
  })
}
