'use client'
import Image from 'next/image'
import { ImdbItemTypes } from '../../types'
import { showBigImage } from '@/app/context/BigImageContext'
import Box from '../../components/Box'
import RateCircle from '../../components/RateCircle'
import { useContext } from 'react'
import { LocaleContext } from './List'
import TextPopover from '../../components/TextPopover'
import Heart from './Heart'
import Transition from '@/app/components/Transition'

type IProps = ImdbItemTypes

const Item: React.FC<IProps> = ({
  image,
  fullTitle,
  year,
  title: _title,
  titleCn,
  id,
  like,
  imDbRating,
}) => {
  const { t } = useContext(LocaleContext) || {}

  let douban, title
  if (t?.lang === 'en') {
    douban = t.douban
    title = _title
  }

  if (t?.lang === 'zh') {
    douban = t.douban
    title = titleCn
  }

  return (
    <Transition>
      <Box
        className="
          w-[140px]
          md:w-[180px]
          lg:w-[240px]
        "
      >
        <div
          className="
          relative 
          mx-auto
          h-[180px]
          md:h-[240px]
          lg:h-[320px]
        "
        >
          <div className="flex h-full w-full justify-center">
            <Image
              className="h-auto w-auto object-cover"
              onClick={() =>
                showBigImage({
                  src: image,
                  alt: fullTitle,
                  show: true,
                })
              }
              src={image}
              alt={fullTitle}
              placeholder="blur"
              blurDataURL={
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwePSwuJDJJQExLR0BGRVBac2JQVW1WRUZkiGVtd3uBgoFOYI2XjH2Wc36BfP/bAEMBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAagCBgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIFBAP/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOCA6MgACoooACgIKqKAqKKKigKioKACgCqAgoACooAAACKAAAAAgAAIACIqAiKgiIqAlSqlBmpVqUGalWpVRms1qs0GazWqzVRmsVusVUZqLUVQBFAAdQBWQAUVAFABQEFAFVUAVUAVUVBRFFUAFEVBRFAVAFAAARQAAABAABAEVAEVARFQREVARKqUGalWpQZqValVGazWqzQZrNarNVGaxWqzVRmotRVAEUAB01QVFEUAAFEVBRFBRFFURQUBBVQBVRRRUUBUEFABQAFQRVAAEAVAAAAQAEAEBAEEEEEBEqpQSpVrNBKzWqzVRKzWqzQZrNarNVGKzWqzVRmotQUAFAEHTAaQAAVAFVBBVQFVUAVUVAVFBRFFURQUBBQAURQFQFUBAAAAABAAAEABAAQARFQREVARBASotSgzUq1miJWa1WaozWa1WaqM1it1iqiVFqCgCKAA6QDSCoAoioKIoCoooqKCiKgoiiqACqggqoCqqAKIoKIIKIoAAAAAICoACAAgAIIAioCIqCIggFZq1KCVmrUoM1KtZqolZq1mgzWa1WKqIAAAiggDpANIKgCgAoiiqIoKIqCiKKqoAqoIKqAqqgCgAoioCoAogCgAAgKIAqAAgAIICoIAggCKzRBBAKzVSglZq1KCVmrWaIlZrVYqjNZrVZqogIigCAADogNoogCgCqIoKIqCiKKqsqCqgiqqAKqAKqAKrKoKICqqAKIAogCiAKgCAggAgAgoICAgiggggggJUq1mgVmrWaCVKtZoiVmrWaDNZrVZqiAIAAAAOgA2CoAoigoigoioqiKCiKiqrKgqsqCqyoqqyqCiKAqAKIoAAAAACAIAAgioACCAAgCCAIIAgghUolUSpSpQSpSpQSs1azRGaytQAAAAAAHvEGxRFBRAFVBFVUAVUEVoQBoRRVEUFEEGhAFVAVRAFVBBRAFEBFEABAFQABAAQEEEAEAGVQERUBEolEKzVrNArNWs0ErNWs0EqKioAAAAAA9qoNiiAKrKoqqyoKrKiqrKoKqAqqggqoAqoCqrKgoggqoAogCiAKIAogAICKIACICoACCCAgAggCCAlSqzRCs1azQKzVrNQSs1aiiAKgAAAAAD2CDQogK0IAqoCtCCDQgK0IINCArQgDQgg0ICqrKgogCiAKICKJoCiAKiAKggioACCAqCCCCAqDIKiIAlpUtQKzSpQKzSpQSgjSAAgAAAAAD1CDSqrKgogDQgitCArSsqgqsqKqsqCqyqKoigogCqgCiAKIIKIAogCiAgIKKggKggioICogAgggloiAgmgVKWsoFSlqVRKgKggKgAAAAAAAD0CDSqrKgogK0IIrSsqCqyqKqsqCqyqKqsqCqyA0IIqqyoKIAogCmoCLogCoICiAAgIqIAGoCCCaC6mogLqaazaIupampqBUtEUEEUEVFZAAAAAAAAAAfYQaVRNBWhBBoQ0VpWVRVVlQVWVRVVlQVWVFVWVQUQBoZUFEAUQBdNTTQUQAEBFEQFEBARAVBNBU1NNENTTU0DUpqagIazqouoIoAioACAAAAAAAAAANiDStDKiqrKorQyorQgg0rJorSsqgqsqKqsqgqsgNCAqqyA0IAogIogCjICiAKiAioICoJoi6moAIaiBqCKgggAIqAIqAAgAAAAAAAAAAACqgqqIAqoCqqCNKqArQgg0rIK0rKoKrKiqIA0IIKrKgogCiAKIAqCKiiAAgCogICAGpoggIAIIqAIIAioACAAAAAAAAAAAAAAAAKIAqoCqqA0oCKoiiqIoqqyqCqyoqiANCCCqyoKIAogCiCioIIogACACAgIAIIIqCKAIMgIqAAgAAAAAAAAAAAAAAAAAAAAqAKqCKqoDSgCqIqKKgKqsqKoigogCqgCiAKIAogIogAAAgAIAggAIAiAKggDIgKgAAAAAAAAAAAAAAAAAAAAAAAAqAKqCKqoDSiKKKgiqAKoigogCgAogCiKAIAogoACCKgCKiAioIIqKgCCCKioACAAAAAAAAAAAAAAAAAAAAAAAAAACoAqsqKoio0oiiioCqIoKIoCoAoigAAAAAAACCAAioAioIIqAIAggKyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoiiqIotUQFUAVQAURQAAUAAAAAQAARUAABAEREVAQVBEAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFUAAFQFqqgLVVAKqoAoAKIoAAAAAAACAigIigiIqAiKIiIqKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKoAAAKAACooKIoVRFCqAKKigAICgAACCgIACCoiIKgIigMioCCoAAAAAAAAAAAAAAAAAAAAAAAAAAACqAAACgAAAqKAAqKIKigKiiioqAAKoAAAACAigIACCogiVUERFEERRVQAAAAAAAAAAAAAAAAAAAAAAAABQUAAFAAABQBRAAFAEFAAARVQFUAFARQAAAABARUARQERUQSoqAgqIIAqgAAAAAAAAAAAAAAAAAAAAAAKoAAAKAAACoKigAoAAigCCooAAKAKoCAAAAKAIAAIACIqIIigiIqIoioqgAAAAAAAAAAAAAAAAAAAAACgoAAAKAAACoKACgAAIoAigAAAoAKAKAIAAACKAAgAIgIggAiAiiAqgAAAAAAAAAAAAAAAP//Z'
              }
              width={240}
              height={320}
            />
          </div>

          <Heart
            className="
            absolute
            right-2
            top-2
            cursor-pointer
            lg:right-4
            lg:top-4
          "
            id={id}
            like={like}
          />
          <div
            className="
            absolute
            bottom-1
            left-1
            lg:bottom-2
            lg:left-2
          "
          >
            <RateCircle
              className="h-6 w-6 lg:h-12 lg:w-12"
              rate={Number(imDbRating)}
            />
          </div>
        </div>
        <TextPopover>
          <div className="truncate text-center text-xs leading-10 lg:text-lg">
            {title}({year})
          </div>
        </TextPopover>
        <a
          className="block w-full text-center text-xs text-[#50d71e] lg:text-lg"
          href={
            title
              ? `https://www.douban.com/search?q=${title.replace(' ', '+')}`
              : 'https://www.douban.com'
          }
          target="_blank"
        >
          {douban}
        </a>
      </Box>
    </Transition>
  )
}

export default Item
