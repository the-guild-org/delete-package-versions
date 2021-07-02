
import {Observable} from 'rxjs'
import {PackageType} from './package-type'
import {OwnerType} from './owner-type'
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'

export interface PackagesClientParams {
  token: string
  packageOwner: string
  packageOwnerType?: OwnerType
  packageName: string
  packageType: PackageType
}

export interface DeleteVersionParams extends PackagesClientParams {
  versionId: number
}

export interface PackagesClient {
  deleteVersion(params: DeleteVersionParams): Observable<RestEndpointMethodTypes["users"]["getByUsername"]["response"]>
}

// import {getOctokit} from '@actions/github'
// import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
//
// export async function getOwnerType(): Promise<RestEndpointMethodTypes["users"]["getByUsername"]["response"]> {
//
//   const octokit = getOctokit('')
//
//   return octokit.rest.users.getByUsername({
//     username: 'trent-j'
//   })
// }
