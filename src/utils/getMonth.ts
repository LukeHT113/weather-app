const months: string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function getMonth(index: number) {
  if (months[index]) {
    return months[index];
  } else {
    return false;
  }
}

export default getMonth;