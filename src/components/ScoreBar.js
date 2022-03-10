import { ScoreBarConainer } from "./index"

export default function ({ score, maxScore, scoreBar }) {
  return (
    <div>
      <div>
        <ScoreBarConainer>
          <div>
            Score {' '}
            {score}%
          </div>
          <div>
            Max Score {' '}
            {maxScore}%
          </div>
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
      </div>
    </div>
  )
}




