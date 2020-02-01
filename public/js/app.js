
const reservationForm = document.querySelector('form')



reservationForm.addEventListener('submit',(e)=>{
  // e.preventDefault()
  console.log(document.getElementById("userName").value)
  fetch('http://localhost:3100/addReservation',{
    method:'post',
    body:JSON.stringify({
      user:document.getElementById("userName").value,
      location:document.getElementById("location").value,
      startDateTime:document.getElementById("reservationStartDate").value,
      endDateTime:document.getElementById("reservationEndDate").value
    }
    )
  })
})
