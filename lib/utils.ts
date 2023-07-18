export function getQSParamFromURL(
  key: string,
  url: string | undefined
): string | null {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
export function isBase64DataURL(str: string) {
  const base64DataURLRegex = /^data:[a-z]+\/[a-z]+;base64,/i;
  return base64DataURLRegex.test(str);
}