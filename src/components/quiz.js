import { useState, useEffect } from 'react'
import { quizArray } from '../data/core'
import Rating from '@mui/material/Rating'
import ScoreBar from './ScoreBar'
import { QuizContainer, QuizProgBar, QuizButtons, InformAnswer, Button, NextQuestion } from "./index"

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

  // destructure quiz array
  const {category, difficulty, question, correct_answer, incorrect_answers} = quizArray[currentQuestion];

  // handle default behavoir of useEffect
  useEffect(() => {
    window.scroll(0, 0)
    if (currentQuestion < 20) {
      setOptions(
        quizArray &&
          handleOption([
            correct_answer,
            ...incorrect_answers
          ].sort(() => Math.random() - 0.5))
      )
    }
    if (difficulty === 'easy') {
      setRating(1)
    } else if (difficulty === 'medium') {
      setRating(2)
    } else if (difficulty === 'hard') {
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
    if (e.target.innerText === correct_answer) {
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
      <div>
        <p>{category}</p>
        <div>
          <h1> Question {currentQuestion + 1} of {quizArray.length}</h1>
          <div>
            <Rating
              name='read-only'
              size='small'
              value={rating}
              readOnly
            />
          </div>
        </div>
        <p> {question} </p>
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
      </div>
      <ScoreBar
        {...{ quizArray, score, maxScore, scoreBar }}
      />
    </QuizContainer>
  )
}
