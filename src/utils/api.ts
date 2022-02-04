import axios from 'axios'

export const EmployeeList = async () => {
  try {
    const list = await axios.get('/api/v1/employees')
    return list.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
  }
}

export const DepartmentList = async () => {
  try {
    const list = await axios.get('/api/v1/departments')
    return list.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
  }
}

export const CompanyList = async () => {
  try {
    const list = await axios.get('/api/v1/companies')
    return list.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
  }
}
