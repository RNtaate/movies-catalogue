const convertToGenreNames = (genreIdArray, genreObjectArray) => {
  let genreNames = [];

  for (let i = 0; i < genreIdArray.length; i += 1) {
    const myArray = genreObjectArray.filter((el) => el.id === genreIdArray[i]);
    genreNames = genreNames.concat(myArray[0].name);
  }

  genreNames = genreNames.join(', ');
  return genreNames;
};

export default convertToGenreNames;
