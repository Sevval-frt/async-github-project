class Storage
{
   static getFromStorage()
    {
        let users;

        if(localStorage.getItem("searched")===null)
        {
           users=[];
        }
        else
        {
           users=JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    };
   static addFromStorage(userName)
    {
        let data=this.getFromStorage();

        if(data.indexOf(userName)===-1)
        {
            data.push(userName); 
        }

        localStorage.setItem("searched",JSON.stringify(data));
    };
    static clearAllFromStorage()
    {
        localStorage.removeItem("searched");
    };
}