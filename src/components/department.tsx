import { Form, Table } from 'antd'
import React, { useState } from 'react'
import '../App.css'
import Employees from './employees'

interface Emp {
  name: string
  email: string
  title: string
}

interface Props {
  depColumns: Array<{ title: string; dataIndex: string; key: string }>
  newDepData: Array<{ key: number; name: string; childData: Emp }>
  updateCompData: any
}

const Department: React.FC<Props> = ({
  depColumns,
  newDepData,
  updateCompData,
}) => {
  const [data, setData] = useState(newDepData)

  const expandedRowRender = (record) => {
    const empObj = record.childData

    const empColumns = [
      {
        title: 'Employee Name',
        dataIndex: 'empName',
        key: 'empName',
        editable: true,
      },
      { title: 'Email', dataIndex: 'email', key: 'email', editable: true },
      { title: 'Designation', dataIndex: 'role', key: 'role', editable: true },
    ]

    const newEmpData = []
    for (let i = 0; i < empObj.length; ++i) {
      newEmpData.push({
        key: i,
        empName: empObj[i].name,
        email: empObj[i].email,
        role: empObj[i].title,
      })
    }

    const updateEmpData = (updatedEmpData) => {
      const newUpdatedData = data
      newUpdatedData[record.key].childData = updatedEmpData
      setData(newUpdatedData)
      updateCompData(newUpdatedData)
    }

    return (
      <div>
        <Employees
          empColumns={empColumns}
          newEmpData={newEmpData}
          updateEmpData={updateEmpData}
        />
      </div>
    )
  }

  return (
    <Form>
      <Table
        columns={depColumns}
        dataSource={data}
        pagination={false}
        expandable={{ expandedRowRender }}
      />
    </Form>
  )
}

export default Department
