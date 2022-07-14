
    const socket = io('http://127.0.0.1:8000');

    const form=document.getElementById('send-container');
    const messageInput=document.getElementById('messageInp');
    const messageContainer=document.querySelector('.container');
    var audio=new Audio('ting.mp3');

    let username;
    do{
        username=prompt("Enter your name");
    }while(!username);
    
    const append=(message,position)=>{
        const messageElement=document.createElement('div');
        messageElement.innerText=message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        if(position=='left')
        audio.play();
    }

    form.addEventListener('submit',(e)=>{
        e.preventDefault();//stop reloading of page
        const message=messageInput.value;
        append("You:" +message, 'right');
        socket.emit('send',message);
        messageInput.value='';
    })
    
    socket.emit("new-user",username);

    

    socket.on('user-joined', username =>{
        append(username+' joined the chat','left')
    })

    socket.on('receive', data =>{
        append(data.user+ ":"+data.message,'left');
    })

    socket.on('left',username =>{
        append(username+" has left the chat..",'left');
    })