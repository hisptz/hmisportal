export interface PortalMenu {
  id: string;
  name: string;
  type?: string;
  has_submenu?: boolean;
  submenu?: PortalMenu[];
  submenus?: PortalMenu[];
  submenusId?: string[];
}
