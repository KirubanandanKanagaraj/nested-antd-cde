import { Button, Form, Table } from 'antd'
import Department from 'components/department'
import React from 'react'
import { fetchData } from 'utils/companyTree'
import './App.scss'
import './components/department.scss'

const App: React.FC = () => {
  const [dataObj, setDataObj] = React.useState([])

  React.useEffect(() => {
    fetchData().then((res) => {
      setDataObj(res)
    })
  }, [])

  const expandedRowRender = (record) => {
    const deptObj = record.childData
    const depColumns = [{ title: 'Department', dataIndex: 'name', key: 'name' }]
    const newDepData = deptObj.map((data, index) => {
      return { key: index, name: data.name, childData: data.children }
    })

    const updateCompData = (updatedCompData) => {
      const newUpdatedData = dataObj
      newUpdatedData[record.key].children = updatedCompData
      setDataObj(newUpdatedData)
    }

    return (
      <Department
        depColumns={depColumns}
        newDepData={newDepData}
        updateCompData={updateCompData}
      />
    )
  }

  const compColumns = [
    {
      title: 'Company',
      dataIndex: 'companyName',
      key: 'companyName',
      editable: true,
    },
  ]

  const newCompanyData = dataObj.map((data, index) => {
    return { key: index, companyName: data.name, childData: data.children }
  })

  const printFinalData = () => {
    // TODO: conversion to flat data model is pending
    console.log(dataObj)
  }

  return (
    <div className="container">
      <Form component={false}>
        <Table
          className="components-table-demo-nested"
          columns={compColumns}
          dataSource={newCompanyData}
          expandable={{ expandedRowRender }}
        />

        <Button type="primary" size="large" onClick={printFinalData}>
          See Final Data
        </Button>
      </Form>
    </div>
  )
}

export default App
