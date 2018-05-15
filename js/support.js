document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        supImageUrl = "";
        serverMessages = [];
        supportChat = document.getElementsByClassName("online-support")[0];
        supportClicked = document.getElementsByClassName("online-support-clicked")[0];
        mainContainer = document.getElementsByClassName("main-online-support")[0];
        intervalTime = 2000;
    }
  };

(function() {
    function reqListener() {
        var data = JSON.parse(this.responseText);
        if(data.success !== true){
            window.alert('پشتیبان غیرفعال است');
            supportChat.style.display = "none";
            supportClicked.style.display = "none";
        }
        else{
            fetchInterval = setInterval(fetch, intervalTime);
            function reqListenerSup() {
                var data = JSON.parse(this.responseText);
                var supportName = document.getElementsByClassName("support-name")[0];
                var supportImage = document.getElementsByClassName("support-image")[0];
                supportName.innerHTML = data.support.first + " " + data.support.last;
                supImageUrl = data.support.picture;
                supportImage.setAttribute("src", supImageUrl);
            }
            function reqErrorSup(err) {
                console.log('Get Support Detail Error: ', err);
            }
            var xhr = new XMLHttpRequest();
            xhr.onload = reqListenerSup;
            xhr.onerror = reqErrorSup;
            xhr.open('get', 'https://test-chat.fandogh.org/support', true);
            xhr.send();
        }
    }
    function reqError(err) {
        console.log('Error Get Start: ', err);
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = reqListener;
    xhr.onerror = reqError;
    xhr.open('get', 'https://test-chat.fandogh.org/start', true);
    xhr.send();
})();
function supportShow(){
    supportClicked.style.display = "block";
    supportChat.style.display = "none";
}
function supportHide(){
    supportClicked.style.display = "none";
    supportChat.style.display = "block";
}
function sendMessage(){
    var inputObj = document.getElementsByClassName("input-support")[0];
    var inputText = inputObj.value;
    function reqListener() {
        var data = JSON.parse(this.responseText);
        if(data.success === true){
            var myMessageContainer = document.createElement("div");
            myMessageContainer.className = "message-container my-message-container";
            
            mainContainer.appendChild(myMessageContainer);

            var myMessage = document.createElement("p");
            myMessage.className = "message my-message";
            myMessage.innerHTML = inputText;
            
            myMessageContainer.appendChild(myMessage);

            var myProfile = document.createElement("img");
            myProfile.className = "profile my-profile";
            myProfile.setAttribute("src", "images/support-online.png");
            
            myMessageContainer.appendChild(myProfile);

            var myDate = document.createElement("p");
            myDate.className = "message-date my-date";
            var date = new Date();
            myDate.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();

            myMessageContainer.appendChild(myDate);
        }
    }
    function reqError(err) {
        console.log('Send Message Error: ', err);
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = reqListener;
    xhr.onerror = reqError;
    xhr.open('post', 'https://test-chat.fandogh.org/send', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("message=" + inputText);
}
function fetch(){
    function reqListener() {
        var data = JSON.parse(this.responseText);

        for(i = 0; i < data.responses.length; i++){
            serverMessages.push(data.responses[i]);
            var supportMessageContainer = document.createElement("div");
            supportMessageContainer.className = "message-container support-message-container";
            mainContainer.appendChild(supportMessageContainer);

            var supportProfile = document.createElement("img");
            supportProfile.className = "profile support-profile";
            supportProfile.setAttribute("src", supImageUrl);
            
            supportMessageContainer.appendChild(supportProfile);
    
            var supportMessage = document.createElement("p");
            supportMessage.className = "message support-message";
            supportMessage.innerHTML = data.responses[i].message;
    
            supportMessageContainer.appendChild(supportMessage);

            var supportDate = document.createElement("p");
            supportDate.className = "message-date support-date";
            var date = new Date(data.responses[i].date);
            supportDate.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
    
            supportMessageContainer.appendChild(supportDate);
        }
    }
    function reqError(err) {
        console.log('Error Fetch: ', err);
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = reqListener;
    xhr.onerror = reqError;
    xhr.open('get', 'https://test-chat.fandogh.org/fetch', true);
    xhr.send();
}