




export default async(url)=>{
    try {
        let response = await fetch('https://api.jsonbin.io/b/5fd10ec7bef8b7699e577379');
        let json = await response.json();
        return json;
    } catch (error) {
        
    }
    
    
}