import { Button, Form, Table } from 'antd'
import Department from 'components/department'
import React from 'react'
import { fetchData } from 'utils/companyTree'
import './App.scss'
import './components/department.scss'

const App: React.FC = () => {
  const [dataObj, setDataObj] = React.useState([])

  async function loadData() {
    const companyTree = await fetchData()
    return companyTree
  }

  React.useEffect(() => {
    loadData().then((res) => {
      setDataObj(res)
    })
  }, [])

  const expandedRowRender = (record) => {
    const deptObj = record.childData

    const depColumns = [{ title: 'Department', dataIndex: 'name', key: 'name' }]

    const newDepData = []
    for (let i = 0; i < deptObj.length; ++i) {
      newDepData.push({
        key: i,
        name: deptObj[i].name,
        childData: deptObj[i].children,
      })
    }

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

  const newCompanyData = []
  for (let i = 0; i < dataObj.length; ++i) {
    newCompanyData.push({
      key: i,
      companyName: dataObj[i].name,
      childData: dataObj[i].children,
    })
  }

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
