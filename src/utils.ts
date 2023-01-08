const getCountryCode = (country: string) => {
  switch (country) {
    case 'UK':
      return '826';
    case 'Australia':
      return '036';
    case 'Bulgaria':
      return '100';
    case 'US':
      return '840';
    case 'Switzerland':
      return '756';
    case 'Germany':
      return '276';
    case 'Romania':
      return '642';
    case 'USSR':
      return '643';
    case 'Italy':
      return '380';
    case 'Japan':
      return '392';
    case 'Sweden':
      return '752';
    default:
      return;
  }
};

export { getCountryCode };
