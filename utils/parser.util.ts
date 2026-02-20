export function hideEmail(email: string): string {
  const firstPart = email.slice(0, email.indexOf("@"));
  const lastPart = email.slice(email.indexOf("@"));
  const firstPartArr = firstPart.split("");

  let encrypted = "";
  for (let i = 0; i < firstPartArr.length; i++) {
    if (i < 2 || i === firstPartArr.length - 1) encrypted += firstPartArr[i];
    else encrypted += "*";
  }

  return encrypted + lastPart;
}

export function parseDate(input: string): Date {
  const [datePart, timePart] = input.split(" ");
  const [day, month, year] = datePart.split(".").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute);
}
