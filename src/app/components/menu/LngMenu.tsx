"use client"
import {BaseMenu } from './BaseMenu'
import { useRouter } from 'next/navigation'

const LngMenu = ({className} : {className ?: string} ) => {
    const router = useRouter()

    const list = [
        {
            key : "en",
            label : "English",
            onClick : ()=> router.replace(getRedirectRoute('en'))
        },
        {
            key : "zh",
            label : "简体中文",
            onClick : ()=> router.replace(getRedirectRoute('zh'))
        },
    ]

    return (
        <BaseMenu list={list} className={className} />
    )
}

const getRedirectRoute = (lng : string) => {
    const pathName = window.location.pathname 
    const arr = pathName.split('/')
    arr[1] = lng
    return arr.join('/')
}

export default LngMenu
