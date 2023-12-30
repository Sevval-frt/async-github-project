const form=document.querySelector("#github-form");
const formInput=document.querySelector("#githubname");
const clearButton=document.querySelector("#clear-last-users");
const lastUsers=document.querySelector("#last-users");

const git=new Github();
const ui=new UI();

allEventsListeners();

function allEventsListeners()
{
    form.addEventListener("submit",getUsers);
    clearButton.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
};

function getUsers(e)
{
    let userName=formInput.value.trim();

    if(userName==="")
    {
        alert("Lütfen ilgili alanı boş geçmeyiniz!")
    }
    else
    {

        git.get(userName).then(data=>
            {
                if(data.user.message==="Not Found")
                {
                    //hata mesajı
                    ui.showAlert("Kullanıcı bulunamadı");
                }
                else
                {
                                        
                    //localden çekip ui'de gösterme:
                    ui.showLastUserInfo(userName);

                    //local'e ekle:
                    Storage.addFromStorage(userName);

                    //ui:
                    ui.showUserInfo(data.user);
                    ui.showUserRepoInfo(data.repo);
                    
                }
            })
                .catch(err=>ui.showAlert(err));
    }
        ui.clearInput();
        e.preventDefault();
};

function getAllSearched()
{
    let localDatas=Storage.getFromStorage();
    localDatas.forEach(data => 
    {
    lastUsers.innerHTML+=`<li class="list-group-item">${data}</li>`;
    });
};


function clearAllSearched()
{
    if(confirm("Silmek istediğinize emin misiniz?"))
    {
        //local
        Storage.clearAllFromStorage();

        //ui
        ui.clearAllSearchedFromUI();

    }

};