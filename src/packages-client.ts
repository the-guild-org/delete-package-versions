
import {Observable} from 'rxjs'

export interface PackagesClient {
  deleteVersion(packageOwner: string, packageName: string, packageType: string, id: number): Observable<boolean>
}

// import {getOctokit} from '@actions/github'
// import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
//
// export async function getOwnerType(): Promise<RestEndpointMethodTypes["users"]["getByUsername"]["response"]> {
//
//   const octokit = getOctokit('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')
//
//   return octokit.rest.users.getByUsername({
//     username: 'trent-j'
//   })
// }