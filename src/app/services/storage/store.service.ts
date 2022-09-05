import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  async setKey(keyIn: string, val: string){
    await Preferences.set({
      key:keyIn,
      value: val
    });
  }

  async getKey(keyIn: string){
    return (await Preferences.get({key:keyIn})).value;
  }

  async deleteKey(keyIn: string){
    return (await Preferences.remove({key:keyIn}));
  }
}
