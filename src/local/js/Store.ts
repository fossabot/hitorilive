// tslint:disable-next-line:no-implicit-dependencies
import { IpcRenderer } from 'electron';
import { action, observable } from 'mobx';
import { Settings } from '../../SettingsRepo';

export default class Store {
  @observable rtmpPort?: number;
  @observable httpPort?: number;
  @observable latestError?: string;

  constructor(settings: Settings, private ipcRenderer: IpcRenderer) {
    this.rtmpPort = settings.rtmpPort;
    this.httpPort = settings.httpPort;

    ipcRenderer.on('setSettings', action((_: any, value: Settings) => {
      this.rtmpPort = value.rtmpPort;
      this.httpPort = value.httpPort;
    }));

    ipcRenderer.on('error', action((_: any, value: string) => {
      this.latestError = value;
    }));
  }

  setRTMPPort(value: number) {
    this.ipcRenderer.send('setRTMPPort', value);
  }

  setHTTPPort(value: number) {
    this.ipcRenderer.send('setHTTPPort', value);
  }

  @action clearError() {
    this.latestError = undefined;
  }
}
