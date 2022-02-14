import { useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { Repository } from './Repos'

export function Repo() {
  const { pathname } = useLocation()
  const repoFullName = pathname.substring(1)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  async function handleClick() {
    // await queryClient.invalidateQueries(['repos'])
    const repos = queryClient.getQueryData<Repository[]>('repos')
    if (!repos) throw new Error('repos is falsy')
    const i = repos.findIndex((repo) => repo.full_name === repoFullName)
    if (i === -1) throw new Error('i === -1')
    repos[i].description = 'testando'
    queryClient.setQueryData('repos', repos)
    navigate('/')
  }

  return (
    <div>
      <h1>{pathname}</h1>
      <button onClick={handleClick}>Alterar</button>
    </div>
  )
}
