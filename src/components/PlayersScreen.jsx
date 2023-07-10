export const PlayersScreen = ({ seconds, idFocus, participants }) => {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return (
    <div className='flex flex-col justify-center items-center  gap-y-4'>
      <p>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </p>
      <div
        ref={idFocus}
        className='h-96 w-96 overflow-y-auto text-[32px] border-dark border-2 border-solid text-center px-8'
      >
        {[...new Set(participants)].map((player, index) => (
          <p key={index} className=''>
            {player}
          </p>
        ))}
      </div>
    </div>
  )
}
