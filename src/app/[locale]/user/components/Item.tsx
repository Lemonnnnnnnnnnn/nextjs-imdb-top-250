'use client'
import { ImdbItem } from '@prisma/client'
import request from '@/app/service/request'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Box from '@/app/components/Box'
import Image from 'next/image'
import RateCircle from '@/app/components/RateCircle'
import { FcCloseUpMode, FcDislike, FcLike } from 'react-icons/fc'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { LocaleType } from '@/app/types'

const Item: React.FC<ImdbItem & LocaleType> = ({
  id,
  fullTitle,
  image,
  imDbRating,
  title: _title,
  titleCn,
  plot: _plot,
  plotCn,
  imDbRatingCount,
  rank,
  year,
  t,
}) => {
  const router = useRouter()
  const cancel = async () => {
    const res = await request.post<{ success: boolean }>('/api/user/like', {
      id,
      type: 2,
    })
    if (res.success) {
      toast.success('取消成功')
      router.refresh()
    }
  }

  let plot, title

  if ((t.lang === 'en')) {
    plot = _plot
    title = _title
  }
  if ((t.lang === 'zh')) {
    plot = plotCn
    title = titleCn
  }

  return (
    <Box
      className="
      relative
      flex
      h-28
      gap-3 
      overflow-hidden 
      bg-white 
      !p-0 
      ring-1 
      ring-slate-200
      lg:h-44
      lg:gap-6
      items-center
    "
      key={id}
    >
      <div className="w-24 lg:w-32">
        <Image
          className="w-full object-contain"
          src={image}
          alt={fullTitle}
          placeholder="blur"
          blurDataURL={
            'data:image/jpeg;base64,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'
          }
          width={240}
          height={320}
        />
      </div>

      <div className="flex-1 py-1 lg:py-2.5">
        <div className="flex gap-2 lg:gap-4 items-center">
          <RateCircle className="h-10 w-10 lg:h-12 lg:w-12" rate={Number(imDbRating)} />
          <div>
            <div className="text-base font-bold lg:text-xl">{title}</div>
            <div className="hidden text-gray-500 lg:flex lg:gap-4">
              <div>rank：{rank}</div>
              <div>year：{year}</div>
              <div>ratingCount：{imDbRatingCount}</div>
            </div>
          </div>
        </div>

        <p className="my-1 line-clamp-2 text-xs lg:my-3 lg:text-base">{plot}</p>

        <div className="hidden align-middle lg:flex lg:gap-3 ">
          <div
            className="
            flex 
            cursor-default 
            justify-center  
            gap-2 
            rounded-lg 
            bg-slate-100 
            px-2
            py-1
            transition
            hover:bg-slate-200 
          "
          >
            <FcCloseUpMode size={24} />
            <div className=" text-sm leading-6 text-gray-500 ">
              kksk(=^-ω-^=)
            </div>
          </div>

          <div
            onClick={cancel}
            className="
            flex 
            cursor-pointer 
            justify-center  
            gap-2 
            rounded-lg
            bg-slate-100
            px-2
            py-1 
            transition 
            hover:bg-slate-200
          "
          >
            <AiOutlineCloseCircle size={24} color="rgb(107 114 128)" />
            <div className="text-sm leading-6 text-gray-500 ">
              remove(ꐦ°᷄д°᷅)
            </div>
          </div>
        </div>

        <FcDislike size={24} className="absolute right-3 top-3 lg:hidden" />
      </div>
    </Box>
  )
}

export default Item
