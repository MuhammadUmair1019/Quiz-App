import styled from 'styled-components'

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

// score bar
const ScoreBarConainer = styled.div`
    display: flex ;
    justify-content: space-between;
    align-items: center;

`

export {QuizContainer, QuizProgBar, QuizButtons, InformAnswer, Button, NextQuestion, ScoreBarConainer}