import {PortalMenu} from './menu';
export interface Portal {
  title: string;
  last_quarter?: string;
  last_year?: number;
  mainmenus?: PortalMenu[];
  mainmenusId?: string[];
}
