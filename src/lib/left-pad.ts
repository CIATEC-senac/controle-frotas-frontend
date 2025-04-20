export const leftPad = (str: string, length: number, complete: string) => {
  let padded = str;

  while (padded.length < length) {
    padded = complete + padded;
  }

  return padded;
};
