import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { getUsers } from "../services/user"

const { Column } = Table

const User = () => {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserList = async () => {
    setIsLoading(true)
    try {
      await getUsers().then((response) => {
        setIsLoading(false)
        setUsers(response.data)
      })
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <div className="about-page">
      <Table
        dataSource={users}
        pagination={false}
        rowKey={(obj) => obj.id}
        // onChange={onTableChange}
        loading={isLoading}
      >
        <Column
          title="ID"
          key="id"
          dataIndex="id"
          render={(id) => <p>{id}</p>}
        />
        <Column
          title={'Username'}
          key="username"
          dataIndex="username"
          sorter={(a, b) => a.username.localeCompare(b.username)}
          render={(username) => <p>{username}</p>}
        />
        <Column
          title={'Email'}
          key="email"
          dataIndex="email"
          sorter={(a, b) => a.email.localeCompare(b.email)}
          render={(email) => <p>{email}</p>}
        />
        <Column
          title={'Role'}
          key="role"
          dataIndex="role"
          sorter={(a, b) => a.role.localeCompare(b.role)}
          render={(role) => <p>{role}</p>}
        />
      </Table>
    </div>
  )
}

export default User
