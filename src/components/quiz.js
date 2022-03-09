import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { quizArray } from '../data/core'
import Rating from '@mui/material/Rating'
import ScoreBar from './score-bar'

export default function Quiz () {
  // useState variables
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [rating, setRating] = useState(0)
  const [options, setOptions] = useState('')
  const [loadProgress, setLoadProgress] = useState(0)
  const [disableOption, setDiableOption] = useState(false)
  const [answerResponse, setAnswerResponse] = useState(null)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [result, setResult] = useState(false)
  const [answer, setAnswer] = useState({
    correct: 0,
    wrong: 0
  })
  const [scoreBar, setScoreBar] = useState({
    gray: 0,
    black: 0,
    lightgray: 0
  })

  useEffect(() => {
    window.scroll(0, 0)
    if (currentQuestion < 20) {
      setOptions(
        quizArray &&
          handleOption([
            quizArray[currentQuestion].correct_answer,
            ...quizArray[currentQuestion].incorrect_answers
          ].sort(() => Math.random() - 0.5))
      )
    }
    if (quizArray[currentQuestion].difficulty === 'easy') {
      setRating(1)
    } else if (quizArray[currentQuestion].difficulty === 'medium') {
      setRating(2)
    } else if (quizArray[currentQuestion].difficulty === 'hard') {
      setRating(3)
    } else {
      setRating(0)
    }
  }, [currentQuestion])

  // sort answers
  const handleOption = (option) => {
    return (
      option.sort(() => Math.random - 0.5)
    )
  }

  // handle answers
  const handleSelectedAnswer = (e) => {
    if (currentQuestion === 19) {
      setResult(true)
    }
    setDiableOption(true)
    if (e.target.innerText === quizArray[currentQuestion].correct_answer) {
      setAnswer((answer) => ({ ...answer, correct: answer.correct + 1 }))
      setAnswerResponse('Correct')
      setScoreBar({ ...scoreBar, gray: gray(), lightgray: lightgray() })
    } else {
      setAnswer((answer) => ({ ...answer, wrong: answer.wrong + 1 }))
      setAnswerResponse('Wrong')
      setScoreBar({ ...scoreBar, black: black(), lightgray: lightgray() })
    }
    setScore(Math.ceil(((answer?.correct + 1) / (currentQuestion + 1)) * 100))
    setMaxScore(
      (((quizArray.length - (answer.correct + 1)) / (quizArray.length)) * 100).toFixed(0))
  }

  // handle new question
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setLoadProgress((loadProgress) => loadProgress + 5)
    setDiableOption(false)
    setAnswerResponse(null)
  }

  // handling result
  const handleResult = () => {
    window.location.reload()
  }

  // handling score bar
  const gray = () => ((answer?.correct / quizArray.length) * 100)

  const black = () => ((answer?.wrong / quizArray.length) * 100)

  const lightgray = () => (((currentQuestion + 1) / quizArray.length) * 100 - scoreBar.gray - scoreBar.black)

  return (
    <QuizContainer>
      <QuizProgBar style={{ width: `${loadProgress}%` }} />
      <QuizQuestionContainer>
        <QuestionCategory>{quizArray[currentQuestion].category}</QuestionCategory>
        <QuestionNumber>
          <QuestionNo> Question {currentQuestion + 1} of {quizArray.length}</QuestionNo>
          <QuestionDifficulty>
            <Rating
              name='read-only'
              size='small'
              value={rating}
              readOnly
            />
          </QuestionDifficulty>
        </QuestionNumber>
        <Question> {quizArray[currentQuestion].question} </Question>
        <QuizButtons>
          {options &&
            options.map((option, i) =>
              <Button
                key={i}
                onClick={handleSelectedAnswer}
                disabled={disableOption}
              >
                {option}
              </Button>
            )}
        </QuizButtons>
        {answerResponse && <InformAnswer> {answerResponse}</InformAnswer>}
        <NextQuestion>
          {!result
            ? (disableOption &&
              <Button
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>)
            : (
                ''
              )}
          {result && <Button onClick={handleResult}> Try again ! </Button>}
        </NextQuestion>
      </QuizQuestionContainer>
      <ScoreBar
        {...{ quizArray, score, maxScore, scoreBar }}
      />
    </QuizContainer>
  )
}

const QuizContainer = styled.div`
  max-width: 60rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
  position: relative;
  padding: 4rem;
`

const QuizProgBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 1rem;
  background-color: black;
  width: 0%;
`
const QuizQuestionContainer = styled.div``

const QuestionCategory = styled.p``

const QuestionNumber = styled.div``

const QuestionNo = styled.h1``

const QuestionDifficulty = styled.div``

const Question = styled.p``

const QuizButtons = styled.div`
    display: flex;
    justify: space-between;    
    flex-wrap: wrap;
   

`

const InformAnswer = styled.h2`
    text-align: center;
    color: black;
`

const Button = styled.button`
    cursor: pointer;
    width: 40%;
    padding: 0.5rem 1rem;
    margin: auto;
    margin: 1rem;
    @media (max-width: 600px) {
          display: block;
          width:100% ;
          margin-bottom: 1rem;
    }
`

const NextQuestion = styled.div`
    display: flex;
    justify-content: center;

`
