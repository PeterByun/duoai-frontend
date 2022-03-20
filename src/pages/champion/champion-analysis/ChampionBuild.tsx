import { css } from '@emotion/react'
import { useSelectedChampions } from './ChampionAnalysis'

const championNameCss = css`
  border: 2px solid gold;
  border-radius: 2px;
  padding: 1rem;

  h3 {
    margin: 0px;
  }
`

const laneSpanCss = css`
  border-radius: 2px 0 0 2px;
  background: #3c7cf1;
  color: white;
  width: 6rem;
  height: 2rem;
  display: inline-block;
  text-align: center;
  line-height: 2rem;
`

const laneSpanCss2 = css`
  border-radius: 0 2px 2px 0;
  background: #4b4b4b;
  color: white;
  width: 3rem;
  height: 2rem;
  display: inline-block;
  text-align: center;
  line-height: 2rem;
`

const ChampionInfoSummary = ({
  selectedChampion,
  title,
}: {
  selectedChampion: string
  title: string
}) => {
  return (
    <section>
      <h1>{title}</h1>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid gray',
          borderRadius: '3px',
        }}
      >
        <div css={championNameCss}>
          <h3>{selectedChampion}</h3>
          <img
            width="40px"
            height="40px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
        </div>

        <div>
          <h3>티어</h3>
          <div>1티어</div>
        </div>

        <div>
          <h3>주요 라인</h3>
          <div>
            <span css={laneSpanCss}>탑</span>
            <span css={laneSpanCss2}>미드</span>
          </div>
        </div>

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(1rem, 5rem))',
            width: '15rem',
          }}
        >
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
          <img
            width="20px"
            height="20px"
            src="/src/assets/images/champions/Alistar.png"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

const ChampionBuild = () => {
  const { selectedChampion, counterChampion } = useSelectedChampions()

  return (
    <>
      <ChampionInfoSummary
        title="선택된 챔피언"
        selectedChampion={selectedChampion}
      />
      <ChampionInfoSummary
        title="상대 챔피언"
        selectedChampion={selectedChampion}
      />
    </>
  )
}

export default ChampionBuild
