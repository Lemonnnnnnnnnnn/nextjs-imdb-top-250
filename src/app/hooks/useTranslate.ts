const locales = {
  en: () =>
    import('../public/locales/en/translation.json').then(
      (module) => module.default
    ),
  zh: () =>
    import('../public/locales/zh/translation.json').then(
      (module) => module.default
    ),
}

type SupportLangs = keyof typeof locales

export const useTranslate = async (_locale: string) => {
    const supportLangs = Object.keys(locales)
    let locale : SupportLangs

    if(supportLangs.some(lang => lang === _locale)){
      locale = _locale as SupportLangs
    }else{ 
      locale = 'en'
    }
    
    return locales[locale]()
    
}
