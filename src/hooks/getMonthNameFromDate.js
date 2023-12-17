export const useGetMonthName = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDate = (date) => {
    const d = new Date(date);

    return { month: monthNames[d.getMonth()], year: d.getFullYear() };
  };

  return { getDate };

  //   console.log(monthNames[d.getMonth()]);
};
