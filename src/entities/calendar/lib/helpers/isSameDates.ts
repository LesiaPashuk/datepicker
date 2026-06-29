export const isSameDates = (firstDate: Date, secondDate: Date): boolean => {
  if (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
    return true;

  return false;
};
