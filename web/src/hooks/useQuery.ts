import { useLocation } from 'react-router'

import { parseUrlParam } from '../utils/parseUrlParam'

export const useQuery = <T>(): T => {
  const location = useLocation()
  return parseUrlParam(location.search) ?? {}
}
