import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
  Icon: IconType
  onClick: () => any
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
                flex
                w-full
                justify-center
                rounded-md
                bg-white
                dark:bg-slate-800
                px-4
                py-2
                text-gray-500
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                dark:ring-gray-900
                hover:bg-gray-50
                focus:outline-offset-0
            "
    >
      <Icon />
    </button>
  )
}

export default AuthSocialButton
