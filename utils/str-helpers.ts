export function strCapitalize(text: string) {
  const strSplit = text.split(" ");
  const wordsCapitals = strSplit.map(
    (word: string) => word.at(0)?.toUpperCase() + word.slice(1),
  );

  return wordsCapitals.join(" ");
}
