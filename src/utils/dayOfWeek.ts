const days: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDayOfWeek(index: number) {
  if (days[index]) {
    return days[index];
  } else {
    return false;
  }
}

export default getDayOfWeek;