export const getParams = (params: string) => {
  const str = params[0] === '?' ? params.slice(1) : params;
  const sliceStr = str.split('&');
  const res = {} as Record<string, string>;
  sliceStr.forEach((el) => {
    const param = el.split('=');
    res[param[0]] = param[1];
  });

  return res;
};

export const ls = {
  getVal(key: string): Record<string, any> | string | null {
    return JSON.parse(window.localStorage.getItem(key) ?? '');
  },

  remove(key: string): void {
    window.localStorage.removeItem(key);
  },

  has(key: string): boolean {
    return !!window.localStorage.getItem(key);
  },

  setVal(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
