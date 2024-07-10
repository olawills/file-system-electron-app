let $ = require('jquery')  // jQuery now loaded and assigned to $
let fs = require('fs')
let filename = 'contacts'
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()
   let password = $('#Password').val()

   fs.appendFile('contacts', name + ',' + email + password + '\n')

   addEntry(name, email)
})

function addEntry(name, email, password) {
   if(name && email && password) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>' + password + '</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email, password ] = contact.split(',')
         addEntry(name, email, password)
      })
      console.log('Heyy')
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()