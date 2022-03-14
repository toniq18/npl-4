const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
const apiKey =  '327f1de0d98a45e7e5135b489cdbaa75'
// const apiKey =  process.env.API_KEY

const getuserInput = async (baseURL, apiKey) =>{
    let formText = document.getElementById('name').value
    //if works change concatenation
    const input = await fetch(`${baseURL}${apiKey}&url=${formText}`);
    //get rid once working
    console.log(input)
    try{
        const newData1 = await response.json();
        console.log(newData1);
        return(newData1);
    } catch (error){
        console.log("Error", error)
    }
}


function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)
    // console.log("::: Form Submitted :::")
    getuserInput(baseURL, apiKey)
        .then(function(update){
            console.log(update)
            ClientSidePost ('/postroute', {score_tag: update.score_tag, agreement: update.agreement, subjectivity: update.subjectivity, confidence: update.confidence, irony: update.irony})
            .then(updateUI());
            // document.getElementById('results').innerHTML = data.message
            return(getuserInput)
        })
    
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(data) {
    //     document.getElementById('results').innerHTML = data.message
    //     updateUI()
    // })
}


const ClientSidePost = async (url = "", data = {})=>{
    const response = await fetch (url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });


    try{
        const newData = await response.json();
        console.log(newData);
        return(newData);
    } catch (error){
        console.log("Error", error)
    }
};

const updateUI = async () => {
    const request = await fetch ('/snd');
    try{
        const updateAll = await request.json();
        document.getElementById('score_tag').innerHTML= updateAll.score_tag;
        document.getElementById('agreement').innerHTML= updateAll.agreement;
        document.getElementById('subjectivity').innerHTML= updateAll.subjectivity;
        document.getElementById('confidence').innerHTML= updateAll.confidence;
        document.getElementById('irony').innerHTML= updateAll.irony;
    }
    catch (error){
        console.log("ayo bruh there be an error", error);
}
}

// ClientSidePost('http://localhost:8081/api', {url: formText})


export {getuserInput}
export { handleSubmit }
export {updateUI}
export {ClientSidePost}
