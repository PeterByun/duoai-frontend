import { useSearchParams } from 'react-router-dom'

const SummonerSearch = () => {
  const [searchParams] = useSearchParams()

  return (
    <div>
      소환사 검색은 준비중입니다.
      {searchParams.get('summoner-name')}
    </div>
  )
}

export default SummonerSearch
