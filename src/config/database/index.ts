import baseList from './json/base.json'
import keyBagList from './json/keyBag.json'

export const SpliceDatabase = () => {
  return [...baseList, ...keyBagList]
}

export const poolMsg = {
  host: '127.0.0.1',
  user: 'root',
  database: 'knd_feature_set',
  password: 'nmdzz000',
}
