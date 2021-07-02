
import {getOwnerType} from '../src/packages-client'

describe('packages client', () => {



  test('get owner type', async () => {
    const response = await getOwnerType()
    console.log(response)
  })
})
