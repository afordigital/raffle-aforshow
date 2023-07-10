export const Button = ({ onClick, children, style }) => {
  const variant = {
    Primary:
      'custom-rounded rounded-tl-xl bg-transparent rounded-br-xl flex items-center text-white text-[24px] p-4',
    Secondary:
      'custom-rounded rounded-tl-xl bg-transparent rounded-br-xl flex items-center text-blue text-[24px] p-4'
  }
  return (
    <button onClick={onClick} className={variant[style]}>
      {children}
    </button>
  )
}
