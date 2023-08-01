import clsx from 'clsx'

interface MaskProps {
  show: boolean | undefined
  onClick: () => void
}

const Mask = ({ onClick, show }: MaskProps) => {
  return (
    <div
      className={clsx(
        `
            fixed
            top-0
            z-10
            h-full
            w-full
            bg-black
            opacity-0
            transition
            `,
        show ? 'visible opacity-30' : 'invisible'
      )}
      onClick={onClick}
    ></div>
  )
}

export default Mask
