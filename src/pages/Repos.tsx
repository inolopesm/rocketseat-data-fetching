import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export type Repository = {
  full_name: string
  description: string
}

export function Repos() {
  const { data, isFetching, error } = useQuery<Repository[]>(
    'repos',
    async () => {
      const url = 'https://api.github.com/users/inolopesm/repos'
      const response = await axios.get(url)
      return response.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  return (
    <div>
      <h1>Hello World!</h1>

      {isFetching && <p>Carregando...</p>}
      {error && <p>{String(error)}</p>}

      <ul>
        {data?.map((repository) => (
          <li key={repository.full_name}>
            <Link to={`/${repository.full_name}`}>{repository.full_name}</Link>
            <p>{repository.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
