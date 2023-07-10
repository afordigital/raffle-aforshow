import { ArrowRightToLine } from 'lucide-react'

export const StartingScreen = ({ onStart }) => {
  return (
    <div className='flex flex-col items-center'>
      <p className='text-[28px]'>Escribe !sorteo para participar</p>
      <button
        onClick={onStart}
        className='custom-rounded rounded-tl-xl bg-transparent rounded-br-xl flex  items-center text-white text-[24px] p-4'
      >
        <span className='px-8'>Empezar</span>
        <ArrowRightToLine color='white' size={24} />
      </button>
    </div>
  )
}
