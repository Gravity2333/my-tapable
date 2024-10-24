export function fillArgs(arr: string[], maxLength: number) {
    if (arr.length < maxLength) {
      arr = arr.concat(new Array(maxLength - arr.length).fill(undefined));
    }
    return arr;
  }