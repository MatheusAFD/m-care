import { getEmployees } from '../../services/get-employees'
import { EmployeeList } from '../employee-list'

export const EmployeeContainer = async () => {
  const [error, response] = await getEmployees({
    limit: 20,
    page: 1
  })

  if (error) {
    console.error(JSON.stringify(error))
  }

  return (
    <div>
      <EmployeeList initialData={response} />
    </div>
  )
}
