import './App.css'
import { useCallback, useState, useEffect } from 'react'

import { wordsList } from './data/data'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickedWordAndCatgeory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word by category
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }

  const startGame = () => {
    const {word, category} = pickedWordAndCatgeory()

    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)

    setGameStage(stages[1].name)
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      { gameStage === 'start' && <StartScreen startGame={startGame}/> }
      { gameStage === 'game' && <Game verifyLetter={verifyLetter}/> }
      { gameStage === 'end' && <GameOver retry={retry} /> }
    </div>
  )
}

export default App
