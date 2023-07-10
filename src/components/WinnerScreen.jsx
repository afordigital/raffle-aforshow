import { Button } from './common/button'

export const WinnerScreen = ({ winner, getWinner, backToInit }) => {
  return (
    <>
      <div className='border-2 border-solid border-[#CD7EC5] px-20 rounded-lg'>
        <p className='text-[32px]'>{winner.toUpperCase()}</p>
      </div>
      <div className='flex gap-x-4'>
        <Button onClick={getWinner} style='Primary'>
          Reroll
        </Button>
        <Button onClick={backToInit} style='Secondary'>
          Init
        </Button>
      </div>
    </>
  )
}
