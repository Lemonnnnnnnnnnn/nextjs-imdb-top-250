'use client'
import { useTheme } from 'next-themes'
import { MdDarkMode } from 'react-icons/md'
import { BsFillSunFill } from 'react-icons/bs'

interface Props {
  className?: string
}

const DarkSwitch: React.FC<Props> = ({ className }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={className}>
      {theme === 'light' && <MdDarkMode onClick={() => setTheme('dark')} />}
      {theme === 'dark' && <BsFillSunFill onClick={() => setTheme('light')} />}
    </div>
  )
}

export default DarkSwitch
