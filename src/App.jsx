import { useEffect, useState, useRef } from 'react'
import JSConfetti from 'js-confetti'
import { sceneStatus } from './consts/utils'
import './App.css'
import Tmi from 'tmi.js'
import { StartingScreen } from './components/startingScreen'
import { PlayersScreen } from './components/PlayersScreen'
import { WinnerScreen } from './components/WinnerScreen'

function App () {
  const [participants, setParticipants] = useState([])
  const [status, setStatus] = useState(sceneStatus.STARTING)
  const [winner, setWinner] = useState(null)
  const [seconds, setSeconds] = useState(30)
  const [isFinished, setIsFinished] = useState(false)

  const idFocus = useRef()

  const jsConfetti = new JSConfetti()

  useEffect(() => {
    const client = new Tmi.Client({
      options: { debug: false },
      channels: ['afor_digital']
    })

    client.connect()

    client.on('message', async (channel, tags, message, self) => {
      if (self) return
      if (status !== sceneStatus.PLAYERS) return

      const { username, ['display-name']: displayName } = tags

      if (
        message.toLowerCase().startsWith('!sorteo') &&
        status === sceneStatus.PLAYERS
      ) {
        setParticipants(prev =>
          !prev.includes(username)
            ? tags.subscriber
              ? [...prev, username, username]
              : [...prev, username]
            : prev
        )
      }
    })

    if (sceneStatus.PLAYERS) {
      return () => client.disconnect()
    }
  }, [status])

  useEffect(() => {
    scrollToBottom()
  }, [participants])

  const startRaffle = () => {
    setStatus(sceneStatus.PLAYERS)
    timer()
  }

  const getWinner = () => {
    const random = Math.floor(Math.random() * participants.length)
    setWinner(participants[random])
    setStatus(sceneStatus.WINNER)

    jsConfetti.addConfetti({
      emojis: ['🐹', '🐀', '🐁', '🐭'],
      confettiNumber: 200
    })
  }

  function scrollToBottom () {
    if (idFocus.current) {
      idFocus.current.scrollTop = idFocus.current.scrollHeight
    }
  }

  const backToInit = () => {
    setStatus(sceneStatus.STARTING)
    setWinner(null)
    setParticipants([])
    setSeconds(20)
    setIsFinished(false)
  }

  useEffect(() => {
    if (isFinished) {
      getWinner()
    }
  }, [isFinished])

  const timer = () => {
    let secondsTime = seconds
    const timer = setInterval(() => {
      if (secondsTime > 0) {
        secondsTime--
        setSeconds(secondsTime)
      } else if (secondsTime === 0) {
        setIsFinished(true)
        clearInterval(timer)
      }
    }, 1000)
  }

  return (
    <div className='w-full h-screen flex flex-col gap-y-10 justify-center items-center text-white'>
      <img src='/imgs/aforshow.webp' width={'600px'}></img>
      {status === sceneStatus.STARTING && (
        <StartingScreen onStart={startRaffle} />
      )}
      {status === sceneStatus.PLAYERS && (
        <PlayersScreen
          seconds={seconds}
          idFocus={idFocus}
          participants={participants}
        />
      )}
      {status === sceneStatus.WINNER && (
        <WinnerScreen
          winner={winner}
          getWinner={getWinner}
          backToInit={backToInit}
        />
      )}
    </div>
  )
}

export default App
