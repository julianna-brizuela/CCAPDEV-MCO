const saveBtn = document.getElementById('save-button');


saveBtn?.addEventListener('click', async(e) => {
    //add this restaurant into the list of saved restaurants of a user
    console.log('click')
    let data = {}
    data['restaurant_name'] = document.getElementById('name').innerText;
    const jstring = JSON.stringify(data); 
    console.log(jstring)

    try {
        const save = await fetch('/:restaurant', {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (save.status == 200) {
            location.reload(); // refresh the page
        } else {
            const message = `An error has occured. Status code: ${save.status}`;
            alert(message);
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }

});