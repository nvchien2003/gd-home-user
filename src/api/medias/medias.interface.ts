import type { AbstractInterface } from "../../common/interface/abstracts.interface";


export interface MediasInterface extends AbstractInterface {
  name: string;
  url: string;
  type: number;
  status: number;
  attributes: Record<string, unknown> | null;
}
