import { EventHandler } from 'react';

class DomHelper {
  reListener(type: IDom['type'], cb: IDom['cb']) {
    document.removeEventListener(type, cb);
  }

  addListener(type: IDom['type'], cb: IDom['cb']) {
    document.addEventListener(type, cb);
  }
}

interface IDom {
  type: keyof DocumentEventMap;
  cb: EventHandler<any>;
}

const dh = new DomHelper();
export default dh;
