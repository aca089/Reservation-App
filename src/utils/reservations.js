const fs = require('fs')


const addReservation = (newReservation, callback)=>{
  getReservations((parsedJSON)=>{
      const allReservations = parsedJSON
      const maximumReservationId = allReservations.length
      allReservations.push({
        id: maximumReservationId+1,
        user:{name:newReservation.user,company:"Collabralink Technologies"},
        location:{seat:newReservation.location,building:"HQ"},
        startDateTime:newReservation.startDateTime,
        endDateTime:newReservation.endDateTime
      })
      saveReservations(allReservations)
  })
}


const getReservations =(callback) => {
  fs.readFile("././reservations.json", function (err, data) {
    if (err) throw err;
    const dataJSON = data.toString()
    const parsedJSON = JSON.parse(dataJSON)
    return callback(parsedJSON)
  });
}

const saveReservations =(allReservations) => {
  const dataJSON = JSON.stringify(allReservations)
  fs.writeFileSync('././reservations.json',dataJSON)
}

module.exports = {
  getReservations: getReservations,
  addReservation:addReservation

}
