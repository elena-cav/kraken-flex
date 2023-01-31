export type Outage = {
  id: string;
  begin: string;
  end: string;
  name?: string;
};
export type Device = { id: string; name: string };
export type SiteInfo = {
  id: string;
  name: string;
  devices: Device[];
};
