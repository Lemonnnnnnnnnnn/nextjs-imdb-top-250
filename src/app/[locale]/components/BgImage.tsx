import Image from 'next/image'
import Bg from '@/app/public/bg_4k.jpg'

const BigImage = () => {
  return (
    <div
      className="
        relative
        h-48
        w-full
        md:h-60
        lg:h-96
      "
    >
      <Image
        className="z-10 object-cover"
        priority
        placeholder="blur"
        src={Bg}
        alt="背景图片"
        fill
      />
    </div>
  )
}

export default BigImage
