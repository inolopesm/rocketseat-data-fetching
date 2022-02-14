import { useFetch } from './hooks/useFetch'

type Repository = {
  full_name: string
  description: string
}

export default function App() {
  const {
    data: repositories,
    isFetching: isFetchingRepositories,
    error: repositoriesFetchError
  } = useFetch<Repository[]>('/users/inolopesm/repos')

  return (
    <div>
      <h1>Hello World!</h1>

      {isFetchingRepositories && <p>Carregando...</p>}

      <ul>
        {repositories?.map((repository) => (
          <li key={repository.full_name}>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
