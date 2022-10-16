const getTodaysDate = () => {
  const date = new Date();
  console.log(date.now);
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return dateStr;
};

export default getTodaysDate;
