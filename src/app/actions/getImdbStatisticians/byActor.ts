import client from "@/app/libs/prismadb";

const getMostPopularActor = async () => {
    try{
        return await client.actor.findMany({
            select : {
                name : true,
                nameCn : true,
                _count : {
                    select : {
                        movies : true
                    }
                }
            },
            orderBy : {
                movies : {
                    _count : 'desc'
                }
            },
            take : 5
        })
    }catch(e){
        console.log(e);
        
        return null
    }
}

export default getMostPopularActor