import { NextApiRequest, NextApiResponse } from 'next'
import getBlogIndex from '../../../lib/notion/getBlogIndex'
import { setHeaders, handleData, handleError } from '../../../lib/notion/utils'

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (setHeaders(req, res)) return
  try {
    handleData(res, await getBlogIndex())
  } catch (error) {
    handleError(res, error)
  }
}
