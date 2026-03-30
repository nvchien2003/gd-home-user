import type { AbstractInterface } from "../../common/interface/abstracts.interface";


export interface MediasInterface extends AbstractInterface {
  name: string;
  url: string;
  type: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
}
