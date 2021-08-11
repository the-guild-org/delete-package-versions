import { context } from "@actions/github";
export interface InputParams {
	owner?: string;
	repo?: string;
	keepOnly?: number;
	token?: string;
}

const defaultParams = {
	owner: "",
	repo: "",
	keepOnly: 2,
	token: ""
};

export class Input {
	owner: string;
	repo: string;
	keepOnly: number;
	token: string;

	constructor(params?: InputParams) {
		const validatedParams: Required<InputParams> = {
			...defaultParams,
			...params
		};

		this.owner = validatedParams.owner;
		this.repo = validatedParams.repo;
		this.keepOnly = validatedParams.keepOnly;
		this.token = validatedParams.token;
	}

	hasOldestVersionQueryInfo(): boolean {
		return !!(this.owner && this.repo && this.keepOnly > 0 && this.token);
	}
}
