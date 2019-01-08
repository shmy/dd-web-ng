import Base from 'lowdb/adapters/Base';
import * as LocalForage from 'localforage';

export class LocalforageAdapter extends Base {
  read() {
    // @ts-ignore
    return LocalForage.getItem(this.source).then(data => {
      if (data === null) {
        // @ts-ignore
        this.write(this.defaultValue);
        // @ts-ignore
        return this.defaultValue;
      }
      return data;
    }).catch(err => {
      throw err;
    });
  }

  write(data) {
    // @ts-ignore
    return LocalForage.setItem(this.source, data);
  }
}
