export function tuncate(text: string) {
  if (text.length > 30) {
    text = text.substring(0, 30) + '...';
  }
  return text
}
