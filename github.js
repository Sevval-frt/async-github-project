class Github
{
    constructor()
    {
        this.endpoint="https://api.github.com/users/";
    };

    async get(name)
    {
         const responseUser= await fetch(this.endpoint+name);//Response Objesi
         const responseRepo= await fetch(this.endpoint+name+"/repos"); 
         
         const userData = await responseUser.json();
         const userRepos= await responseRepo.json();

         return { //Gelen verileri obje olarak döndürüyor.
            user:userData, 
            repo:userRepos
        }
    }
}