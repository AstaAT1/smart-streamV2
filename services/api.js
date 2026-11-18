const errorMessage = document.querySelector('#errorMessage')
const loading = document.querySelector('#loading')
const bodyPage = document.querySelector('#bodyPage')

const url = 'https://6af2e6e842c6561ced399f46.mockapi.io/api/v1/channels'
export async function api() {
    try {
        
        const response = await fetch(url)
        console.log(response);
        if (!response.ok) {
            console.log(errorMessage)
            throw new Error(`HTTP Error: ${response.status}`)

        }
        const data = await response.json()
        console.log(data);
        return data
    }
    catch (error) {
        console.error(error.message)
        errorMessage.classList.remove('hidden')
        bodyPage.classList.add('hidden')
    }
    finally {
        setTimeout(() => {
            loading.classList.add('hidden')

        }, 1500);

    }
}

export function updateFavorite(channel){
   const response = fetch(`${url}/${channel.id}` , {
    method:"PUT",
    headers:{
        
        "Content-Type":"application/json"
    },
    body:JSON.stringify(channel)

    })
    console.log(channel.id)
    return response

}