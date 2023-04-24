import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Table } from 'antd'
import React, { useState } from 'react'
import '../App.scss'
import Employees from './employees'

interface Emp {
  name: string
  email: string
  title: string
}

interface Props {
  depColumns: Array<{ title: string; dataIndex: string; key: string }>
  newDepData: Array<{ key: number; name: string; childData: Emp }>
  updateCompData: (
    newUpdatedData: Array<{
      key: number
      name: string
      childData: Emp
    }>
  ) => void
}

const Department: React.FC<Props> = ({
  depColumns,
  newDepData,
  updateCompData,
}) => {
  const [data, setData] = useState(newDepData)
  const [, setSearchText] = useState('')
  const [, setSearchedColumn] = useState('')

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     //setTimeout(() => this.searchInput.select(), 100)
    //   }
    // },
    render: (text) => text,
  })

  const expandedRowRender = (record) => {
    const empObj = record.childData

    const empColumns = [
      {
        title: 'Employee Name',
        dataIndex: 'empName',
        key: 'empName',
        editable: true,
        ...getColumnSearchProps('empName'),
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
