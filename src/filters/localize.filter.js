import store from '../store'
import ru from '../ru'
import en from '../en'
const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter (key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[localize error] key ${key} was not found`
}
