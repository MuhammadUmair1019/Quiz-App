import styled from 'styled-components'

export default function ({ score, maxScore, scoreBar }) {
  return (
    <QuizScoreBar>
      <Conainer>
        <ScoreBarConainer>
          <Score>
            Score {' '}
            {score}%
          </Score>
          <MaxScore>
            Max Score {' '}
            {maxScore}%
          </MaxScore>
        </ScoreBarConainer>
        {/* using bootstrap progress bar classes */}
        <div className='border border-5 rounded-pill border-light'>
          <div className='progress rounded-pill'>
            <div
              className='progress-bar  rounded-end'
              role='progressbar'
              style={{
                width: `${scoreBar?.gray}%`,
                backgroundColor: 'gray'
              }}
              aria-valuenow='30'
              aria-valuemin='0'
              aria-valuemax='100'
            />
            <div
              className='progress-bar rounded-end'
              role='progressbar'
              style={{
                width: `${scoreBar?.black}%`,
                backgroundColor: 'black'
              }}
              aria-valuenow='30'
              aria-valuemin='0'
              aria-valuemax='100'
            />
            <div
              className='progress-bar rounded-end'
              role='progressbar'
              style={{
                width: `${scoreBar.lightgray}%`,
                backgroundColor: 'lightgray'
              }}
              aria-valuenow='30'
              aria-valuemin='0'
              aria-valuemax='100'
            />
          </div>
        </div>
      </Conainer>
    </QuizScoreBar>
  )
}

const QuizScoreBar = styled.div``

const ScoreBarConainer = styled.div`
    display: flex ;
    justify-content: space-between;
    align-items: center;

`
const Conainer = styled.div``

const Score = styled.div``

const MaxScore = styled.div``
