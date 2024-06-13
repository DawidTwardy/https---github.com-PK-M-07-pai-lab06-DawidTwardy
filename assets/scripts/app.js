const postTemplate = document.getElementById('single-post');
const fetchButton  = document.querySelector('#available-posts');
const listElement = document.querySelector('.posts');
const formNewPost = document.querySelector('#new-post');
postList = document.querySelector('ul');



fetchButton.addEventListener('click',fetchPosts);
formNewPost.addEventListener('submit',eventAdd =>{
    eventAdd.preventDefault();
    const enteredTitle = eventAdd.currentTarget.querySelector('#title').value;
    const enteredContent = eventAdd.currentTarget.querySelector('#content').value;
    createPost(enteredTitle,enteredContent);
})

function sendHttpRequest(method,url,data){
    return fetch(url,{
        method:method,
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response =>{
        if(response.status>=200&&response.status<300){
            return response.json();
        }
        else{
            return response.json().then(errData =>{
                console.log(errData);
                throw new Error("something went wrong code:"+response.status);
            })
        }
    });

}

async function createPost(newTitle,content){
    const newUserId = Math.ceil(Math.random()*1000);
    const post = {
        title:newTitle,
        body:content,
        userId:newUserId
    };
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',post);
    console.log(response);
}

async function fetchPosts(){
    try{
        const responseData = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const listOfPosts = responseData.data;
        for(const post of listOfPosts)
            {
                const postElement = document.importNode(postTemplate.content,true);
                postElement.querySelector('h2').textContent = post.title.toUpperCase();
                postElement.querySelector('p').textContent = post.body;
                postElement.querySelector('li').id = post.id;
                listElement.append(postElement);
            }
    
    }   
    catch(error)
    {
        alert(error.message);
    }
    
}
postList.addEventListener('click',newEvent =>{
    if(newEvent.target.tagName === 'BUTTON'){
        const postId = newEvent.target.closest('li').id;
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
        
})

