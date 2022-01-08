const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const address = document.querySelector('input').value
    const msg = document.querySelector('#message')

    fetch('http://localhost:3000/weather?address='+address)
    .then((resp)=>resp.json())
    .then((data)=>{
        if(data.error){
            msg.textContent = data.error
        }else{
            msg.textContent = `location is : ${data.location}. Address is : ${data.address}. ${data.forecast}`
        }
    }).catch((error)=>{
        msg.textContent = error.error
    })
    
})