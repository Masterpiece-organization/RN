import {useState} from 'react';

const useCalculateAge = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const calculateAge = (date: Date) => {
    const birthDate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setSelectedDate(date);

    return age.toString();
  };

  return {selectedDate, calculateAge};
};

export default useCalculateAge;
