import request from '@/app/service/request'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'

interface Props {
  like: boolean
  className?: string
  id: string
}

const Heart: React.FC<Props> = ({ id, like: _like, className }) => {
  const [like, setLike] = useState(_like)
  const session = useSession()


  const toggleLikeStatus = async (id: string) => {
    if (session.status !== 'authenticated') {
      return toast.error('请先登录！')
    }

    const res = await request.post<{ success: boolean }>('api/user/like', {
      id,
      type: like ? 2 : 1,
    })
    if (res?.success) {
      toast.success(like ? '取消成功！' : '收藏成功！')
      setLike((like) => !like)
    }
  }

  return (
    <button
      className={clsx(className, 'active:scale-95')}
      onClick={() => toggleLikeStatus(id)}
    >
      {like ? (
        <FcLike className="text-lg lg:text-3xl" />
      ) : (
        <FcLikePlaceholder className="text-lg lg:text-3xl" />
      )}
    </button>
  )
}

export default Heart
